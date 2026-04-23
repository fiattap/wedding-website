import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google service account env vars");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

export async function getSheetsClient() {
  const auth = getAuth();
  await auth.authorize();

  return google.sheets({
    version: "v4",
    auth,
  });
}

export async function getGuestRows() {
  const sheets = await getSheetsClient();

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_TAB_NAME;

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID");
  }

  if (!sheetName) {
    throw new Error("Missing GOOGLE_SHEET_TAB_NAME");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!A:Z`,
  });

  return response.data.values ?? [];
}