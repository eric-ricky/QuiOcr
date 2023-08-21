import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

import MainLayout from '@/components/layout';
import { useAuthContext } from '@/lib/context/auth';
import { useUIContext } from '@/lib/context/ui';
import { DocumentTextIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { NextPageWithLayout } from '../page';

const HomePage: NextPageWithLayout = () => {
  const UICtx = useUIContext();
  const authCtx = useAuthContext();

  const handleAddReciept = () => {
    UICtx?.setState((prev) => ({ ...prev, newRecieptModlIsOpen: true }));
  };

  const handleLogout = () => authCtx?.handleLogout();

  return (
    <div className="h-screen">
      <div className="container mx-auto  px-5 md:px-20 pt-4 md:pt-10">
        <div className="flex items-center justify-between">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shadow-lg">
            {authCtx?.state.user?.photoURL && (
              <Image
                src={authCtx.state.user.photoURL}
                alt="."
                fill
                className="object-cover"
              />
            )}
          </div>

          <div
            onClick={handleLogout}
            className={`flex items-center space-x-2 rounded-md border border-transparent bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-90 transition cursor-pointer`}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-50" />{' '}
            <span>Logout</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-20">
          <DocumentTextIcon className="h-6 w-6 text-gray-500" />
          <span className="font-medium">Add Reciept</span>
          <PlusSmallIcon
            onClick={handleAddReciept}
            className="h-5 w-5 text-white bg-blue-500 rounded-full cursor-pointer hover:shadow-xl active:scale-75 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
