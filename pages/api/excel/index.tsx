import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth, sheets } from '../../../lib/google/config';

const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_DOCUMENT_ID;

interface Data {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') throw new Error('Bad request');

    if (!spreadsheetId) throw new Error('Please provide valid spreadsheetId');

    const recieptInfo = req.body.recieptInfo;

    // authenticating
    google.options({ auth });

    // write to rows
    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [recieptInfo],
      },
    });

    console.log(appendRes.data);

    // await sheets.spreadsheets.values.append({
    //   spreadsheetId,
    //   valueInputOption: 'USER_ENTERED',
    // });

    res.status(200).json({
      success: true,
      message: 'Data enetred successfully!',
    });
  } catch (error: any) {
    console.log(error);

    res
      .status(200)
      .json({
        success: false,
        message: error.message || 'Something went wrong',
      });
  }
}
