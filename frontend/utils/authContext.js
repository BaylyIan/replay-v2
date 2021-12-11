import axios from 'axios';
import { createContext, useContext } from 'react';
import router from 'next/router';
import { getSessionStorage } from '../utils'
import Cookies from 'js-cookie';
import { DB_URL } from '../utils/constants'

const AuthContext = createContext();

export const getUser = async (cookie) => {
    console.log('ran main getUser fun on COntext')
    if (cookie) {
        // console.log(cookie.id, 'before user cookie passed into auth context')
        const id = cookie.id
        return await axios.get(`${DB_URL}/api/profile/${id}`)
            .then((res) => {
                // console.log(res.data.result, 'res in auth')
                if (res.data.result[0]) {
                    Cookies.set('user', JSON.stringify(res.data.result[0]))
                    return { status: 'SIGNED_IN', user: res.data.result[0] };
                } else {
                    // console.log('no result')
                    return { status: 'SIGNED_OUT', user: null };
                }
            })
    } else {
        // console.log('no cookie')

        return { status: 'SIGNED_OUT', user: null };
    }


    // return await axios
    // .get(`${DB_URL}/api/profile`)
    // .then((res) => {
    //     console.log(res.data.result[0], 'getUSer useAUth')
    //   if (res.data.result[0]) {
    //     Cookies.set('user', JSON.stringify(res.data.result[0]))
    //     return { status: 'SIGNED_IN', user: res.data.result[0] };
    //   } else {
    //     return { status: 'SIGNED_OUT', user: null };
    //   }
    // })
    // .catch((error) => {
    //     console.log('error here')
    //     console.log(error.message)
    //   return { status: 'SIGNED_OUT', user: null };
    // });
};

export const AuthProvider = (props) => {

    const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };

    const login = async ({ email, password }) => {
        return await axios.post(`${DB_URL}/api/users/login`, {
            email: email,
            password: password
        })
            .then((result) => {
                // console.log(result.data, 'heyeyey')
                if (result.data.error) return result.data.error
                else {
                    // sessionStorage.setItem('token', result.data.token);
                    // axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
                    // sessionStorage.setItem('user', JSON.stringify(result.data.user))
                    Cookies.set('user', JSON.stringify(result.data.user))
                    console.log('user signed in');
                    router.push('/');
                    router.reload()
                    // router.reload()
                }
            })
            .catch((err) => {
                console.error(err)
            })
    };

    const register = async ({ name, email, password }) => {
        return await axios.post(`${DB_URL}/api/create_user`, {
            name: name,
            email: email,
            password: password,
        })
            .then((result) => {
                if (result.data.error) return result.data.error
                else {
                    // const token = result.data.token
                    // sessionStorage.setItem('token', token);
                    // axios.defaults.headers.common['Authorization'] = "Bearer " + _token;
                    console.log(result.data, 'user registered')
                    Cookies.set('user', JSON.stringify(result.data))
                    router.push('/')
                    router.reload()
                }
            })
            .catch(function (error) {
                console.error(error.message)
            })
    }

    const logout = async () => {
        sessionStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
    };

    return <AuthContext.Provider value={{ auth, logout, register, login }} {...props} />;
};
export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;