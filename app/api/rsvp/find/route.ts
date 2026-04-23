import { NextResponse } from "next/server";
import { getGuestRows } from "@/lib/googleSheets";

// 🔥 normalize (removes spaces + lowercase)
function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "").trim();
}

// ⚡ simple in-memory cache
let cachedRows: string[][] | null = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawName = body.fullName || "";
    const fullName = normalize(rawName);

    // ✅ VALIDATION
    if (!fullName) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }

    // ⚡ LOAD + CACHE SHEET
    if (!cachedRows) {
      const rows = await getGuestRows();

      if (!rows || rows.length < 2) {
        return NextResponse.json(
          { ok: false, error: "Guest list is empty." },
          { status: 500 }
        );
      }

      cachedRows = rows;
      console.log("📦 Guest list loaded & cached");
    }

    const rows = cachedRows!;
    const headers = rows[0].map((h) => String(h).trim());
    const dataRows = rows.slice(1);

    // ✅ ROBUST HEADER MATCHING
    const getIndex = (name: string) =>
      headers.findIndex((h) => normalize(h) === normalize(name));

    const primaryNameIndex = getIndex("primary_name");
    const secondaryNameIndex = getIndex("secondary_name");
    const partyNameIndex = getIndex("party_name");
    const invitedToCeremonyIndex = getIndex("invited_to_ceremony");
    const invitedToReceptionIndex = getIndex("invited_to_reception");
    const plusOneAllowedIndex = getIndex("plus_one_allowed");

    // 🚨 REQUIRED COLUMNS CHECK
    if (
      primaryNameIndex === -1 ||
      secondaryNameIndex === -1 ||
      partyNameIndex === -1
    ) {
      console.error("❌ Missing columns", {
        headers,
        primaryNameIndex,
        secondaryNameIndex,
        partyNameIndex,
      });

      return NextResponse.json(
        { ok: false, error: "Missing required columns in sheet." },
        { status: 500 }
      );
    }

    let matchedRow: string[] | null = null;
    let matchedName = "";
    let matchedRowIndex = -1;

    // ✅ LOOP
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];

      const primary = normalize(String(row[primaryNameIndex] || ""));
      const secondary = normalize(String(row[secondaryNameIndex] || ""));
      const party = normalize(String(row[partyNameIndex] || ""));

      console.log("🔎 Checking:", {
        input: fullName,
        primary,
        secondary,
        party,
      });

      if (
        primary === fullName ||
        secondary === fullName ||
        party.split("&").some(name => normalize(name) === fullName)
      ) {
        matchedRow = row;
        matchedRowIndex = i + 2;

        // ✅ 🔥 FIX: return EXACT matched person
        if (primary === fullName) {
          matchedName = String(row[primaryNameIndex] || "");
        } else if (secondary === fullName) {
          matchedName = String(row[secondaryNameIndex] || "");
        } else {
          matchedName = String(row[partyNameIndex] || "");
        }

        console.log("✅ MATCH FOUND:", {
          matchedName,
          rowIndex: matchedRowIndex,
        });

        break;
      }
    }

    // ❌ NOT FOUND
    if (!matchedRow || matchedRowIndex === -1) {
      console.warn("❌ No match for:", rawName);

      return NextResponse.json(
        { ok: false, error: "Invitation not found." },
        { status: 404 }
      );
    }

    // ✅ SUCCESS RESPONSE
    return NextResponse.json({
      ok: true,
      guest: {
        matchedName: matchedName.trim(),
        partyName: String(matchedRow[partyNameIndex] || "").trim(),
        primaryName: String(matchedRow[primaryNameIndex] || "").trim(),
        secondaryName: String(matchedRow[secondaryNameIndex] || "").trim(),

        invitedToCeremony:
          invitedToCeremonyIndex !== -1
            ? String(matchedRow[invitedToCeremonyIndex] || "").trim()
            : "",

        invitedToReception:
          invitedToReceptionIndex !== -1
            ? String(matchedRow[invitedToReceptionIndex] || "").trim()
            : "",

        plusOneAllowed:
          plusOneAllowedIndex !== -1
            ? String(matchedRow[plusOneAllowedIndex] || "").trim()
            : "",

        rowIndex: matchedRowIndex,
      },
    });
  } catch (error: any) {
    console.error("❌ [api/rsvp/find] error:", error?.message || error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to search guest list.",
        details: error?.message || null,
      },
      { status: 500 }
    );
  }
}