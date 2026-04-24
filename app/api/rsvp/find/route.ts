import { NextResponse } from "next/server";
import { getGuestRows } from "@/lib/googleSheets";

// 🔥 normalize (lowercase + remove spaces + trim)
function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "").trim();
}

// 🔥 split party names safely
function splitNames(value: string) {
  return value
    .toLowerCase()
    .replace(/and/g, "&")
    .split("&")
    .map((n) => normalize(n))
    .filter(Boolean);
}

// ⚡ in-memory cache (per server instance)
let cachedRows: string[][] | null = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ accept BOTH formats (important fix)
    const rawName = body?.query || body?.fullName || "";
    const fullName = normalize(rawName);

    // ✅ VALIDATION
    if (!fullName) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }

    // ⚡ LOAD + CACHE
    if (!cachedRows) {
      const rows = await getGuestRows();

      if (!rows || rows.length < 2) {
        return NextResponse.json(
          { ok: false, error: "Guest list is empty." },
          { status: 500 }
        );
      }

      cachedRows = rows;
      console.log("📦 Guest list cached");
    }

    const rows = cachedRows;
    const headers = rows[0].map((h) => String(h || "").trim());
    const dataRows = rows.slice(1);

    // 🔍 helper
    const getIndex = (name: string) =>
      headers.findIndex((h) => normalize(h) === normalize(name));

    const primaryIdx = getIndex("primary_name");
    const secondaryIdx = getIndex("secondary_name");
    const partyIdx = getIndex("party_name");
    const ceremonyIdx = getIndex("invited_to_ceremony");
    const receptionIdx = getIndex("invited_to_reception");
    const plusOneIdx = getIndex("plus_one_allowed");

    // 🚨 REQUIRED columns
    if (primaryIdx === -1 || secondaryIdx === -1 || partyIdx === -1) {
      console.error("❌ Missing required columns", { headers });

      return NextResponse.json(
        { ok: false, error: "Sheet is misconfigured." },
        { status: 500 }
      );
    }

    let matchedRow: string[] | null = null;
    let matchedName = "";
    let matchedRowIndex = -1;

    // 🔎 MATCH LOOP
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i] || [];

      const primary = normalize(String(row[primaryIdx] || ""));
      const secondary = normalize(String(row[secondaryIdx] || ""));
      const partyRaw = String(row[partyIdx] || "");
      const partyNames = splitNames(partyRaw);

      if (
        primary === fullName ||
        secondary === fullName ||
        partyNames.includes(fullName)
      ) {
        matchedRow = row;
        matchedRowIndex = i + 2;

        if (primary === fullName) {
          matchedName = row[primaryIdx] || "";
        } else if (secondary === fullName) {
          matchedName = row[secondaryIdx] || "";
        } else {
          matchedName = partyRaw;
        }

        console.log("✅ MATCH:", matchedName);
        break;
      }
    }

    // ❌ NOT FOUND
    if (!matchedRow) {
      return NextResponse.json(
        { ok: false, error: "Invitation not found." },
        { status: 404 }
      );
    }

    // ✅ BUILD RESPONSE
    const response = NextResponse.json({
      ok: true,
      guest: {
        matchedName: String(matchedName).trim(),
        partyName: String(matchedRow[partyIdx] || "").trim(),
        primaryName: String(matchedRow[primaryIdx] || "").trim(),
        secondaryName: String(matchedRow[secondaryIdx] || "").trim(),

        invitedToCeremony:
          ceremonyIdx !== -1
            ? String(matchedRow[ceremonyIdx] || "").trim()
            : "",

        invitedToReception:
          receptionIdx !== -1
            ? String(matchedRow[receptionIdx] || "").trim()
            : "",

        plusOneAllowed:
          plusOneIdx !== -1
            ? String(matchedRow[plusOneIdx] || "").trim()
            : "",

        rowIndex: matchedRowIndex,
      },
    });

    // 🔐 AUTH COOKIE
    response.cookies.set("guest-auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (error: any) {
    console.error("❌ API ERROR:", error?.message || error);

    return NextResponse.json(
      {
        ok: false,
        error: "Server error.",
      },
      { status: 500 }
    );
  }
}