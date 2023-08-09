import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import { labels } from '~/shared/labels/labels';
import '~/shared/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>{labels.app_title}</title>
        <link rel="shortcut icon" href="/img-512.png" />
        <link rel="apple-touch-icon" href="/img-512.png" />
        <meta
          name="description"
          content="A simple project to find dog breeds"
        />
      </Head>
      <Component {...pageProps} />;
    </Fragment>
  );
}

export default MyApp;
