import { GlobalStyles } from '../styles/global';
import Provider from '../utils/context'
import App from "next/app"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

import "./_app.scss";
import SiteLayout from "../components/SiteLayout"
import { parseCookie } from '../utils';
import { useRouter } from 'next/router'

// axios
import axios from 'axios';
import { AuthProvider, getUser } from "../utils/authContext"


function MyApp({ Component, pageProps, router }) {

  const [auth, setAuth] = useState()

  useEffect(() => {
    (async () => {
      let user
      if(document.cookie){
        user = JSON.parse(parseCookie(document.cookie).user)
      }
      const res = await getUser(user)
      if(!res) return 
      setAuth(res)
      // const token = window.sessionStorage.getItem('token');
      // axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      // const res = await getUser(token)
      console.log(res, ';appjs')

    })()
  }, [])

  if (router.pathname === '/Register') {
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
//   const appProps = await App.getInitialProps(appContext);
//   const cookie = await parseCookies(appContext.ctx.req).user
//   if(cookie){
//     // console.log(JSON.parse(cookie).id, 'app.js')
//     const res = await getUser(JSON.parse(cookie))
//     // console.log(res, 'app.js res')
//     return { ...appProps, auth: res }
//   }else{
//     return { ...appProps, auth: { status: 'SIGNED_OUT', user: null } }
//   }
// }

export default MyApp

// "@babel/core": "^7.15.0",
// "babel-loader": "^8.2.2",
