import { Grid } from 'grommet';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  Grid.available = true;
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
