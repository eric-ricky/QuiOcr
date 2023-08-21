import { useUIContext } from '@/lib/context/ui';
import useExtractRecieptInfo from '@/lib/hooks/useExtractRecieptInfo';
import useUploadImage from '@/lib/hooks/useUploadImage';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowUpOnSquareIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect } from 'react';
import NewRecieptForm from '../newRecieptForm';
import ProgressComponent from '../progress';

/**
 * show upload reciept input
 * loading status (uploading)
 * processing status
 * for with inputs - after the inputs are present i.e not null
 *  **/

const NewRecieptModal = () => {
  const UICtx = useUIContext();
  const { handleUpload, progress, uploading, photoURL, uploadingError } =
    useUploadImage('reciepts');
  const {
    isProcessing,
    handleProcessReciept,
    processingError,
    recieptDetails,
  } = useExtractRecieptInfo(photoURL);

  useEffect(() => {
    if (photoURL) {
      !isProcessing && handleProcessReciept();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoURL]);

  const closeModal = () => {
    UICtx?.setState((prev) => ({ ...prev, newRecieptModlIsOpen: false }));
  };

  return (
    <>
      <Transition appear show={UICtx?.state.newRecieptModlIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between"
                  >
                    <span className="text-lg font-medium leading-6 text-gray-900">
                      New Reciept
                    </span>

                    <span
                      className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 p-1.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </span>
                  </Dialog.Title>

                  <div className="mt-5">
                    <div className="flex flex-col space-y-2">
                      {!photoURL && !uploading && (
                        <label
                          htmlFor="file-upload"
                          className="flex items-center space-x-1 cursor-pointer text-base shadow-sm rounded-md border-2 py-2 px-2.5 w-fit"
                        >
                          <PhotoIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          {/* <ArrowUpOnSquareIcon className="h-5 w-5 text-gray-500" /> */}
                          <span className="text-sm font-medium">
                            Upload Reciept
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            onChange={handleUpload}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      )}

                      {uploadingError && (
                        <p className="text-sm text-rose-500">
                          {uploadingError}
                        </p>
                      )}

                      {uploading && !uploadingError && (
                        <>
                          <p className="text-sm text-gray-500">
                            Uploading... {progress}%
                          </p>
                          <ProgressComponent
                            color="bg-green-500"
                            width={progress}
                          />
                        </>
                      )}

                      {isProcessing && (
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full border border-t-0 border-blue-400 animate-spin"></span>
                          <p className="text-sm text-gray-500">Processing...</p>
                        </div>
                      )}

                      {/* form */}
                      {!isProcessing && !processingError && recieptDetails && (
                        <NewRecieptForm
                          initial={recieptDetails}
                          closeModal={closeModal}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-2 hidden">
                    <ArrowUpOnSquareIcon className="h-6 w-6 text-gray-500" />

                    <label htmlFor="reciept">Upload Reciept</label>
                    <input type="file" name="reciept" id="reciept" />

                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewRecieptModal;
