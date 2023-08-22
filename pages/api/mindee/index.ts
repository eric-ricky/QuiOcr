import { IRecieptDetails } from '@/utils/types';
import * as mindee from 'mindee';
import { NextApiRequest, NextApiResponse } from 'next';

const mindeeApiKey = process.env.MINDEE_API_KEY;

type Data = {
  success: boolean;
  data?: IRecieptDetails;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      if (!mindeeApiKey) throw new Error('Error configuring OCR');

      const imgURL = req.body.photoURL;

      if (!imgURL) throw new Error('Reciept image is not there');

      const mindeeClient = new mindee.Client({ apiKey: mindeeApiKey });
      const response = await mindeeClient
        .docFromUrl(imgURL)
        .parse(mindee.ReceiptV5);

      console.log('response', response);

      const document = response.document;

      if (!document)
        throw new Error('Failed to extract details from the reciept');

      console.log(document.toString());

      const nameOfSupplier = `${document.supplierName.value}`;
      let pin = '';
      let descOfGoods = `${document.category.value?.toUpperCase()}`;

      if (nameOfSupplier.includes('NAIVAS')) {
        pin = 'P051123223G';
        descOfGoods = 'ASSORTED ITEMS';
      } else if (nameOfSupplier.includes('DISTON')) {
        pin = 'P0519268961';
        descOfGoods = 'FUEL';
      }

      const meaningFulData: IRecieptDetails = {
        nameOfSupplier: `${document.supplierName.value}`,
        invoiceDate: `${document.date.value}`,
        invoiceNumber: '',
        pin,
        descOfGoods,
        vatValue: `${document.totalTax.value}`,
        taxableValue: `${document.totalNet.value}`,
        totalAmount: `${document.totalAmount.value}`,
      };

      res.status(200).json({
        success: true,
        data: meaningFulData,
      });
    } catch (error: any) {
      console.log(error);
      res.status(200).json({
        success: false,
        error: error.message || 'Uh-huh! Something is not right',
      });
    }
  }
}
