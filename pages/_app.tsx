import AuthContextProvider from '@/lib/context/auth';
import UIContextProvider from '@/lib/context/ui';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from './page';

interface IAppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: IAppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <AuthContextProvider>
        <UIContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </UIContextProvider>
      </AuthContextProvider>
    </>
  );
}
