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
      bringingPlusOne,
      plusOneName,
      plusOneDietaryRestrictions,
    } = body;

    if (!rowIndex) {
      return NextResponse.json(
        { ok: false, error: "Missing rowIndex" },
        { status: 400 }
      );
    }

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // ✅ Ceremony (K)
    const ceremony_response =
      primaryMorningAttendance === "yes" ||
      secondaryMorningAttendance === "yes"
        ? "yes"
        : "no";

    // ✅ Reception (L)
    const reception_response =
      primaryDinnerAttendance === "yes" ||
      secondaryDinnerAttendance === "yes"
        ? "yes"
        : "no";

    // ✅ RSVP Status (J)
    const rsvp_status =
      ceremony_response === "yes" || reception_response === "yes"
        ? "attending"
        : "not_attending";

    // ✅ Dietary YES/NO (M)
    const hasDietary =
      primaryDietaryRestrictions ||
      secondaryDietaryRestrictions ||
      plusOneDietaryRestrictions;

    const dietary_restrictions = hasDietary ? "yes" : "no";

    // ✅ Notes (N)
    const notes = [
      primaryDietaryRestrictions && `Primary: ${primaryDietaryRestrictions}`,
      secondaryDietaryRestrictions && `Secondary: ${secondaryDietaryRestrictions}`,
      plusOneDietaryRestrictions &&
        `Guest (${plusOneName || "Guest"}): ${plusOneDietaryRestrictions}`,
    ]
      .filter(Boolean)
      .join(" | ");

    // ✅ Plus One (I)
    const finalPlusOneName =
      bringingPlusOne === "yes" ? plusOneName || "" : "";

    const submitted_at = new Date().toISOString();

    console.log("✍️ Writing to sheet:", {
      rowIndex,
      rsvp_status,
      ceremony_response,
      reception_response,
      dietary_restrictions,
      notes,
    });

    // ✅ WRITE (I → O)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'Guest List RSVP'!I${rowIndex}:O${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            finalPlusOneName,      // I
            rsvp_status,           // J
            ceremony_response,     // K
            reception_response,    // L
            dietary_restrictions,  // M (yes/no)
            notes,                 // N (actual details)
            submitted_at,          // O
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