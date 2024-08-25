import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>21BCE3053</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
