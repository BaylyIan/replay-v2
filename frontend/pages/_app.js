import { GlobalStyles } from '../styles/global';
import Provider from '../utils/context'

import "./_app.scss";
import SiteLayout from "../components/SiteLayout"

// cookies / axios
import axios from 'axios';
import jsCookie from 'js-cookie';
import jsHttpCookie from 'cookie';

function MyApp({ Component, pageProps, router }) {

  const { id, params } = router.query;

  var tokenCheck = false;
  if (process.browser) {
    const token = sessionStorage.getItem("token");
    if (token) {
      jsCookie.set("token", token);
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      tokenCheck = true
    }else{
      tokenCheck = false
    }
  }

  console.log(tokenCheck, 'tokenCheck')

  if(router.pathname === '/Register'){
    console.log('path')
    return(
      <Provider>
        <Component {...pageProps} />
      </Provider>
    )
  }else{
    return (<Provider>
      <GlobalStyles />
      <SiteLayout>
      <Component {...pageProps} />
      </SiteLayout>
    </Provider>);
  }
}

export async function getServerSideProps({ req, res }) {
  const { token } = jsHttpCookie.parse(req.headers.cookie);
}

export default MyApp

// "@babel/core": "^7.15.0",
// "babel-loader": "^8.2.2",
