import axios from 'axios';
import { createContext, useContext } from 'react';
import router from 'next/router';
import { getSessionStorage } from '../utils'


const AuthContext = createContext();

export const getUser = async (ctx) => {
    console.log('ran main getUser fun on COntext')
    // axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    // console.log(user, 'context getSSuser')

    return await axios
        .get('http://localhost:4200/api/profile')
        .then((user) => {
            console.log(user, ' getUser context')
            // console.log(result.data.result[0], 'res.dadada')
            if (user) {
                return { status: 'SIGNED_IN', user: user };
            } else {
                return { status: 'SIGNED_OUT', user: null };
            }
        })
        .catch((error) => {
            return { status: 'SIGNED_OUT', user: null };
        });
};

export const AuthProvider = (props) => {

    const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };

    const login = async ({ email, password }) => {
        return await axios.post('http://localhost:4200/api/users/login', {
            email: email,
            password: password
        })
            .then((result) => {
                console.log(result.data.token, result.data.user, 'should be token + userInfo')
                // router.push('/');
                sessionStorage.setItem('token', result.data.token);
                axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
                sessionStorage.setItem('user', JSON.stringify(result.data.user))
                console.log('user signed in');
            })
            .catch((error) => {
                console.error("Username or password is incorrect!!")
            })
    };

    const register = async ({ name, email, password }) => {
        return await axios.post("http://localhost:4200/api/create_user", {
            name: name,
            email: email,
            password: password,
        })
            .then((result) => {
                router.push('/')
                const token = result.data.token
                sessionStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = "Bearer " + _token;
                console.log('user registered')
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