import type { AppProps } from 'next/app'
import {ThemeProvider} from 'styled-components'
import { GlobalStyle } from '../theme/globalStyles'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{
      colors: {
        primary: '#3C6E71'
      }
    }}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
