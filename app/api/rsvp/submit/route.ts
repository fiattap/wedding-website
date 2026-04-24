import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      rowIndex,
      primaryDinnerAttendance,
      secondaryDinnerAttendance,
      primaryMorningAttendance,
      secondaryMorningAttendance,
      primaryDietaryRestrictions,
      secondaryDietaryRestrictions,
    } = body;

    if (typeof rowIndex !== "number") {
      return NextResponse.json(
        { ok: false, error: "Missing rowIndex" },
        { status: 400 }
      );
    }

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // ✅ RSVP STATUS PER PERSON
    const primary_rsvp_status =
      primaryMorningAttendance === "yes" ||
      primaryDinnerAttendance === "yes"
        ? "attending"
        : "not_attending";

    const secondary_rsvp_status =
      secondaryMorningAttendance === "yes" ||
      secondaryDinnerAttendance === "yes"
        ? "attending"
        : "not_attending";

    // ✅ DIETARY YES/NO FLAGS
    const primaryDietaryFlag = primaryDietaryRestrictions?.trim()
      ? "yes"
      : "no";

    const secondaryDietaryFlag = secondaryDietaryRestrictions?.trim()
      ? "yes"
      : "no";

    // ✅ NOTES (actual text only)
    const primaryNotes = primaryDietaryRestrictions || "";
    const secondaryNotes = secondaryDietaryRestrictions || "";

    const submitted_at = new Date().toISOString();

    console.log("✅ Writing CLEAN RSVP:", {
      rowIndex,
      primary_rsvp_status,
      secondary_rsvp_status,
      primaryDietaryFlag,
      secondaryDietaryFlag,
    });

    // ✅ WRITE TO EXACT COLUMNS J → T
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'Guest List RSVP'!J${rowIndex}:T${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            primary_rsvp_status,        // J
            secondary_rsvp_status,      // K
            primaryMorningAttendance,  // L
            secondaryMorningAttendance,// M
            primaryDinnerAttendance,   // N
            secondaryDinnerAttendance, // O
            primaryDietaryFlag,        // P ✅ YES/NO
            secondaryDietaryFlag,      // Q ✅ YES/NO
            primaryNotes,              // R ✅ TEXT
            secondaryNotes,            // S ✅ TEXT
            submitted_at,              // T
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("[api/rsvp/submit] error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to submit RSVP",
        details: error?.message || null,
      },
      { status: 500 }
    );
  }
}