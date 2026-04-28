export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getGuestRows } from "@/lib/googleSheets";

function normalize(value: string) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}

function splitNames(value: string) {
  return String(value || "")
    .toLowerCase()
    .replace(/and/g, "&")
    .split("&")
    .map((n) => normalize(n))
    .filter(Boolean);
}

function getFirstName(value: string) {
  return String(value || "").trim().split(/\s+/)[0] || "";
}

export async function POST(req: Request) {
  try {
    let body: any = {};

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const rawName = body?.query || body?.fullName || "";
    const fullName = normalize(rawName);

    if (!fullName) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }

    // ✅ Always fetch latest Google Sheet data
    const rows = await getGuestRows();

    if (!rows || rows.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Guest list is empty." },
        { status: 500 }
      );
    }

    const headers = rows[0].map((h) => String(h || "").trim());
    const dataRows = rows.slice(1);

    const getIndex = (name: string) =>
      headers.findIndex((h) => normalize(h) === normalize(name));

    const primaryIdx = getIndex("primary_name");
    const secondaryIdx = getIndex("secondary_name");
    const partyIdx = getIndex("party_name");
    const ceremonyIdx = getIndex("invited_to_ceremony");
    const receptionIdx = getIndex("invited_to_reception");
    const plusOneIdx = getIndex("plus_one_allowed");

    if (primaryIdx === -1 || secondaryIdx === -1 || partyIdx === -1) {
      return NextResponse.json(
        { ok: false, error: "Sheet is misconfigured." },
        { status: 500 }
      );
    }

    let matchedRow: string[] | null = null;
    let matchedName = "";
    let displayFirstName = "";
    let matchedRowIndex = -1;

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i] || [];

      const primaryRaw = String(row[primaryIdx] || "").trim();
      const secondaryRaw = String(row[secondaryIdx] || "").trim();
      const partyRaw = String(row[partyIdx] || "").trim();

      const primary = normalize(primaryRaw);
      const secondary = normalize(secondaryRaw);
      const partyNames = splitNames(partyRaw);

      if (
        primary === fullName ||
        secondary === fullName ||
        partyNames.includes(fullName)
      ) {
        matchedRow = row;
        matchedRowIndex = i + 2;

        if (primary === fullName) {
          matchedName = primaryRaw;
          displayFirstName = getFirstName(primaryRaw);
        } else if (secondary === fullName) {
          matchedName = secondaryRaw;
          displayFirstName = getFirstName(secondaryRaw);
        } else {
          matchedName = primaryRaw || partyRaw;
          displayFirstName = getFirstName(primaryRaw || partyRaw);
        }

        break;
      }
    }

    if (!matchedRow) {
      return NextResponse.json(
        { ok: false, error: "Invitation not found." },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      guest: {
        matchedName: String(matchedName || "").trim(),
        firstName: String(displayFirstName || "").trim(),
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

    response.cookies.set("guest-auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    console.error("❌ API ERROR FULL:", error);

    return NextResponse.json(
      { ok: false, error: error?.message || "Server error." },
      { status: 500 }
    );
  }
}