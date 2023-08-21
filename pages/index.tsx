import GoogleComponent from '@/components/sections/auth/google';
import Logo from '@/components/ui/logo';
import Image from 'next/image';
import { useState } from 'react';
import { NextPageWithLayout } from './page';

const HomePage: NextPageWithLayout = () => {
  const [isLoadingStatus, setIsLoadingStatus] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>(undefined);

  return (
    <>
      {isLoadingStatus && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center bg-slate-900 bg-opacity-70 text-white text-center text-lg">
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* <PulseLoader color="rgb(163, 230, 53)" margin={4} /> */}
            <p className="text-zinc-300">{isLoadingStatus}...</p>
          </div>
        </div>
      )}

      <div className="h-screen overflow-hidden flex">
        <div className="h-screen overflow-auto w-screen md:w-[55vw] lg:w-[44vw] xl:w-[40vw] bg-white px-8 py-14 flex flex-col">
          <div className="flex flex-col items-center space-y-10 max-w-md mx-auto mt-20">
            <Logo />
          </div>
          <div className="container mx-auto max-w-lg flex-grow flex flex-col space-y-14 mt-5 md:mt-28 py-10 lg:px-10 xl:px-20 rounded-md bg-gree-300">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-xl text-center  capitalize">
                Sign In
              </h2>
              <p className="text-sm text-slate-500 text-center mt-2">
                Sign in to continue with QuiOcr.
              </p>
            </div>

            <GoogleComponent
              setFormError={setFormError}
              setIsLoadingStatus={setIsLoadingStatus}
            />

            {formError && (
              <div className=" text-red-500 text-center mt-2">{formError}</div>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="text-center text-xs text-slate-500">
              Made with ❤ by &copy; Ricky
            </span>
          </div>
        </div>

        <div className="flex-grow bg-slate-100 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-200 overflow-hidden">
            <Image
              src="/images/bg1.jpg"
              alt="."
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
