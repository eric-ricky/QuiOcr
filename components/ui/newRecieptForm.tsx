import { db } from '@/lib/firebase/config';
import { IRecieptDetails } from '@/utils/types';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

interface IProps {
  initial: IRecieptDetails;
  closeModal: () => void;
}

const NewRecieptForm: React.FC<IProps> = ({ initial, closeModal }) => {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const userSchema = Yup.object({
    pin: Yup.string().required("Can't be empty"),
    nameOfSupplier: Yup.string().required("Can't be empty"),
    invoiceDate: Yup.string().required("Can't be empty"),
    invoiceNumber: Yup.string().required("Can't be empty"),
    descOfGoods: Yup.string().required("Can't be empty"),
    vatValue: Yup.string().required("Can't be empty"),
    taxableValue: Yup.string().required("Can't be empty"),
    totalAmount: Yup.string().required("Can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      pin: initial.pin,
      nameOfSupplier: initial.nameOfSupplier,
      invoiceDate: initial.invoiceDate,
      invoiceNumber: initial.invoiceNumber,
      descOfGoods: initial.descOfGoods,
      vatValue: initial.vatValue,
      taxableValue: initial.taxableValue,
      totalAmount: initial.totalAmount,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        console.log('values', values);

        // update excel
        const {
          descOfGoods,
          invoiceDate,
          invoiceNumber,
          nameOfSupplier,
          taxableValue,
          vatValue,
          pin,
        } = values;

        const region = 'Local';

        const recieptInfo = [
          region,
          pin,
          nameOfSupplier,
          invoiceDate,
          invoiceNumber,
          descOfGoods,
          vatValue,
          taxableValue,
        ];

        const excelResponse = await axios.post('/api/excel', { recieptInfo });

        console.log('update Response', excelResponse);

        if (!excelResponse.data.success)
          throw new Error(excelResponse.data.message || 'Error updating excel');

        // add to firestore
        const recieptsRef = collection(db, 'reciepts');
        await addDoc(recieptsRef, {
          data: { ...recieptInfo },
          createdAt: serverTimestamp(),
        });

        console.log('Added successfully!!');

        // close the modal
        closeModal();
      } catch (error: { code: string } | any) {
        console.log(error);
        setFormError(error.message || 'Failed to confirm reciept');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-4">
          {/* pin */}
          <div className="col-span-6">
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Pin
            </label>
            <input
              type="text"
              id="pin"
              {...getFieldProps('pin')}
              placeholder="P051123223G"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />
            {touched.pin && errors.pin && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.pin}
              </p>
            )}
          </div>

          {/* invoice date */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="invoiceDate"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Invoice Date
            </label>
            <input
              type="text"
              id="invoiceDate"
              {...getFieldProps('invoiceDate')}
              placeholder="18/08/2023"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />
            {touched.invoiceDate && errors.invoiceDate && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.invoiceDate}
              </p>
            )}
          </div>

          {/* invoice no. */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="invoiceNumber"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              {...getFieldProps('invoiceNumber')}
              placeholder="0040797430000034932"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />
            {touched.invoiceNumber && errors.invoiceNumber && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.invoiceNumber}
              </p>
            )}
          </div>

          {/* name of supplier */}
          <div className="col-span-6">
            <label
              htmlFor="nameOfSupplier"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Name of Supplier
            </label>
            <input
              type="text"
              id="nameOfSupplier"
              {...getFieldProps('nameOfSupplier')}
              placeholder="NAIVAS LIMITED"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />

            {touched.nameOfSupplier && errors.nameOfSupplier && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.nameOfSupplier}
              </p>
            )}
          </div>

          {/* description of goods */}
          <div className="col-span-6">
            <label
              htmlFor="descOfGoods"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Description of Goods
            </label>
            <input
              type="text"
              id="descOfGoods"
              {...getFieldProps('descOfGoods')}
              placeholder="ASSORTED ITEMS"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />
            {touched.descOfGoods && errors.descOfGoods && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.descOfGoods}
              </p>
            )}
          </div>

          {/* vat value */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="vatValue"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              VAT Value
            </label>
            <input
              type="text"
              id="vatValue"
              {...getFieldProps('vatValue')}
              placeholder="519.72"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-blue-400 font-bold"
            />
            {touched.vatValue && errors.vatValue && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.vatValue}
              </p>
            )}
          </div>

          {/* taxable value */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="taxableValue"
              className="block text-sm font-medium text-gray-700 pl-2"
            >
              Taxable Value
            </label>
            <input
              type="text"
              id="taxableValue"
              {...getFieldProps('taxableValue')}
              placeholder="5628.28"
              className="mt-1 w-full rounded-md border-gray-200 border outline-none sm:text-sm py-2 px-2.5 placeholder:text-slate-300"
            />
            {touched.taxableValue && errors.taxableValue && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.taxableValue}
              </p>
            )}
          </div>

          <div className="col-span-6 pt-8 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Confirm'}
            </button>
          </div>

          {formError && (
            <div className="col-span-6 pt-4">
              <p className="text-rose-500">{formError}</p>
            </div>
          )}
        </div>
      </Form>
    </FormikProvider>
  );
};

export default NewRecieptForm;
