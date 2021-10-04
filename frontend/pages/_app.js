import { GlobalStyles } from '../styles/global';
import Provider from '../utils/context'
import App from "next/app"
import { useEffect, useState } from 'react'

import "./_app.scss";
import SiteLayout from "../components/SiteLayout"

// cookies / axios
import axios from 'axios';
import jsCookie from 'js-cookie';
import { AuthProvider, getUser } from "../utils/authContext"
import { getSessionStorage } from '../utils'


function MyApp({ Component, pageProps, router }) {

  const { id, params } = router.query;

  const [auth, setAuth] = useState()

  useEffect(() => {
    (async () => {
      const token = window.sessionStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      const res = await getUser(token)
      if(!res) return 
      setAuth(res)
    })()
  }, [])
 
  if (router.pathname === '/Register') {
    console.log('path')
    return (
      <AuthProvider myAuth={auth}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    )
  } else {
    return (<AuthProvider myAuth={auth}>
      <Provider>
        <GlobalStyles />
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </AuthProvider>
    )
  }
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext)
//   const auth = await getUser()
//   console.log('getInitialProps ran')
//   return { ...appProps, auth: auth }
// }


export default MyApp

// "@babel/core": "^7.15.0",
// "babel-loader": "^8.2.2",
