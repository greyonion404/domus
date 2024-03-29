import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import data from '../styles/data';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress options={{ easing: "ease", speed: 500 }} color={data.styles.color.secondary} />
      <UserProvider> <Component {...pageProps} /> </UserProvider>
    </>
  )
}

export default MyApp
