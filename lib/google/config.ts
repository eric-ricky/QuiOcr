import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export const jwt = new JWT({
  email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

export const auth = new google.auth.JWT(jwt);

export const sheets = google.sheets('v4'); // sheets instance
