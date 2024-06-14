// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import '../app/globals.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
