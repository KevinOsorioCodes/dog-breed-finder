import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import Header from '~/infrastructure/ui/components/Header'
import { labels } from '~/shared/labels/labels'
import '~/shared/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>{labels.app_title}</title>
      </Head>
      <div className="flex flex-col">
        <Header />
        <Component {...pageProps} />
      </div>
    </Fragment>
  )
}

export default MyApp
