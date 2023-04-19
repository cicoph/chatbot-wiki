import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import '@/styles/globals.css';

import { config } from "@fortawesome/fontawesome-svg-core";
const inter = Inter({ subsets: ['latin'] });

config.autoAddCss = false; 


function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </SessionProvider>
    
  );
}

export default appWithTranslation(App);
