import { IRecieptDetails } from '@/utils/types';
import axios from 'axios';
import { useState } from 'react';

const useExtractRecieptInfo = (photoURL: string) => {
  const [processingError, setProcessingError] = useState<undefined | string>(
    undefined
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [recieptDetails, setRecieptDetails] = useState<IRecieptDetails | null>(
    null
  );

  const handleProcessReciept = async () => {
    try {
      if (!photoURL) {
        console.error('Please enter an image URL.');

        throw new Error('Please enter a valid image');
      }

      setProcessingError(undefined);
      setIsProcessing(true);

      // Make a request to our API route
      const response = await axios.post('/api/mindee', { photoURL });
      console.log('response ===>', response);

      if (!response.data.success)
        throw new Error(
          response.data.error || 'Failed to extract details from the receipt'
        );

      const {
        descOfGoods,
        invoiceDate,
        invoiceNumber,
        nameOfSupplier,
        taxableValue,
        vatValue,
        totalAmount,
        pin,
      } = response.data.data;

      setRecieptDetails({
        descOfGoods,
        invoiceDate,
        pin,
        invoiceNumber,
        nameOfSupplier,
        taxableValue,
        totalAmount,
        vatValue,
      });
    } catch (error: any) {
      console.log(error);
      setProcessingError(error.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    setIsProcessing,
    recieptDetails,
    setRecieptDetails,
    handleProcessReciept,
    processingError,
  };
};

export default useExtractRecieptInfo;
