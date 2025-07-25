import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const client = await auth.getClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sheets = google.sheets({ version: 'v4', auth: client as any });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID as string;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'products!A2:E',
    });
    const rows = res.data.values || [];
    const products = rows.map((row) => ({
      id: row[0],
      name: row[1],
      price: Number(row[2]),
      image: row[3],
      category: row[4],
      inStock: true,
    }));
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
