import { Grid } from 'grommet';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthLayer } from '../components/auth/auth-layer';
import { HttpLayer } from '../components/http/http-layer';
import { AppLayer } from '../components/app/app-layer';

function CustomApp({ Component, pageProps }: AppProps) {
  Grid.available = true;
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>
      <main className="app">
        <AuthLayer>
          <HttpLayer>
            <AppLayer>
               <Component {...pageProps} />
            </AppLayer>
          </HttpLayer>
        </AuthLayer>
      </main>
    </>
  );
}

export default CustomApp;
