import { RootLayout } from '@fortuna/layouts'
import MainLayout from '@fortuna/layouts/MainLayout'
import { MuiProvider, ReactQueryProvider } from '@fortuna/providers'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiProvider>
      <ReactQueryProvider>
        <RootLayout>
          <MainLayout>
          <Component {...pageProps} />
          </MainLayout>
        </RootLayout>
      </ReactQueryProvider>
    </MuiProvider>
  )
}
