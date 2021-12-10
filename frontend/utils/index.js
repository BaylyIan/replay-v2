import axios from 'axios';
import jsCookie from 'js-cookie';
import cookie from "cookie"
import { DB_URL } from '../utils/constants'

import { useCallback, useState, useRef, useEffect } from 'react'


export async function postImage({ image, type, id }) {
  const formData = new FormData();
  formData.append("image", image)
  if (type === 'playlist') {
    console.log(formData, 'util')
    const result = await axios.post(`${DB_URL}/playlistImage`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return result.data
  } else if (type === 'profile') {
    const result = await axios.post(`${DB_URL}/profileImage/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
    console.log(result.data, 'after image ')
    return result.data
  }
}

export async function getSessionStorage(key, initialValue) {
  try {
    const token = window.sessionStorage.getItem(key);
    console.log('getSessionStorage success')
    return JSON.parse(token)
  } catch (e) {
    console.log('getSessionStorage error')

    // if error, return initial value
    return initialValue;
  }
}

export function parseCookies(req){
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

// export const Login = async ({ email, password }) => {
//   const result = await axios.post('http://localhost:4200/api/users/login', {
//     email: email,
//     password: password
//   })

//   const token = result.data.token
//   sessionStorage.setItem('token', token);
//   jsCookie.set("token", token);
//   axios.defaults.headers.common['Authorization'] = "Bearer " + token;

//   const user = await axios.get('http://localhost:4200/api/profile', { token: token }).then(user => {
//     sessionStorage.setItem("user", JSON.stringify(user.data.result[0]));
//   })
//   return { user }
//   // setUser(JSON.parse(sessionStorage.user))
//   // setLoggedIn(true)
//   // return { user }
// }

// export const Signup = async ({ name, email, password }) => {
//   const _result = await axios.post("http://localhost:4200/api/create_user", {
//     name: name,
//     email: email,
//     password: password,
//   });

//   console.log(_result, '_result')

//   const _token = _result.data.token
//   sessionStorage.setItem('token', _token);
//   jsCookie.set("token", _token);
//   axios.defaults.headers.common['Authorization'] = "Bearer " + _token;

//   console.log(_result.data.token, 'token')

//   const user = await axios.get('http://localhost:4200/api/profile', { token: _token });

//   sessionStorage.setItem("user", JSON.stringify(user.data.result[0]));
//   // setUser(JSON.parse(sessionStorage.user))
//   // setLoggedIn(true)
//   return { user }
// }

// export const Logout = async ({ }) => {
//   sessionStorage.clear();
//   axios.defaults.headers.common['Authorization'] = null;
//   jsCookie.remove('token')
// }