import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail) {
    throw new Error("❌ Missing GOOGLE_CLIENT_EMAIL");
  }

  if (!rawPrivateKey) {
    throw new Error("❌ Missing GOOGLE_PRIVATE_KEY");
  }

  // 🔥 CRITICAL FIX (handles Vercel formatting)
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

export async function getSheetsClient() {
  try {
    const auth = getAuth();

    await auth.authorize();

    return google.sheets({
      version: "v4",
      auth,
    });
  } catch (error: any) {
    console.error("❌ Google Auth Error:", error);
    throw new Error("Google authentication failed");
  }
}

export async function getGuestRows() {
  try {
    const sheets = await getSheetsClient();

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_TAB_NAME;

    if (!spreadsheetId) {
      throw new Error("❌ Missing GOOGLE_SHEET_ID");
    }

    if (!sheetName) {
      throw new Error("❌ Missing GOOGLE_SHEET_TAB_NAME");
    }

    console.log("📡 Fetching sheet:", sheetName);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A:Z`,
    });

    const rows = response.data.values ?? [];

    console.log("📦 Rows fetched:", rows.length);

    return rows;

  } catch (error: any) {
    console.error("❌ Google Sheets Fetch Error:", error);
    throw new Error(
      error?.message || "Failed to fetch Google Sheets data"
    );
  }
}