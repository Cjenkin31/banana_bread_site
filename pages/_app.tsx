import '../app/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout user={pageProps.user} bananas={pageProps.bananas}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
