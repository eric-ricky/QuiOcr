import { useUIContext } from '@/lib/context/ui';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import NewRecieptModal from '../ui/modals/newReciept';

const inter = Inter({ subsets: ['latin'] });

interface IProps {
  children: ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const UICtx = useUIContext();

  return (
    <>
      <div className={`flex min-h-screen flex-col ${inter.className} `}>
        <main className="flex-grow">{children}</main>
      </div>

      {UICtx?.state.newRecieptModlIsOpen && <NewRecieptModal />}
    </>
  );
};

export default MainLayout;
