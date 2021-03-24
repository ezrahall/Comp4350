import axios from "axios";
import nookies from 'nookies';

import {AUTH_SUCCESS, AUTH_START, AUTH_FAIL, AUTH_LOGOUT} from './actions';

export let authStart = () => {
    return {
        type:AUTH_START
    };
};

export let authSuccess = (user) => {
    return{
        type: AUTH_SUCCESS,
        user
    };
};

export let authFail = (error) => {
    return{
        type: AUTH_FAIL,
        error: error
    };
};

export const logOut = () => {
    nookies.destroy(null, "jwt_token")
    sessionStorage.removeItem('user')
    return{
        type: AUTH_LOGOUT
    }
}

export const signIn = (user) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Login`, {
            password: user.password,
            email: user.email,
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
                    const user = {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address
                    }
                    const stringUser = JSON.stringify(user)
                    sessionStorage.setItem("user", stringUser)
                    nookies.set(null, 'jwt_token', data.jwt_token)
                    dispatch(authSuccess(user))
                    return true;
                }
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            dispatch(authFail('Username or password is incorrect'))
                            break

                        case 404:
                            dispatch(authFail('Error trying to connect to server, please try again later!'))
                            break

                        case 500:
                            dispatch(authFail('Oops well that didnt work. How about you try again. Contact us if the problem persists'))
                            break
                    }
                }
                return false;
            })
    }
}
export let signUp = (user, type) => {
    return dispatch => {
        const restaurantAPI = '/Api/Restaurant/Register'
        const userApi = '/Api/User/Register'
        const endPoint = type ? restaurantAPI : userApi
        dispatch(authStart())
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL + endPoint}`, {
            password: user.password,
            email: user.email,
            name: user.name,
            addr: user.address
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
                    sessionStorage.setItem("user", JSON.stringify(user))
                    nookies.set(null, 'jwt_token', data.jwt_token)
                    dispatch(authSuccess(user))
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            dispatch(authFail('An account with that email already exists'))
                            break

                        case 404:
                            dispatch(authFail('Error trying to connect to server, please try again later!'))
                            break

                        case 500:
                            dispatch(authFail('Oops looks like there was a problem. Please try again later'))
                            break
                    }
                }
            })
    }
}

export const updateUser = (user) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Update`, {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                cookies: genCookies(),
            },
            {
                withCredentials: true
            })
            .then((resp) => {
                const statusCode = resp.status
                const oldUser = JSON.parse(sessionStorage.getItem('user'))
                if (statusCode == 200) {
                    const newUserDetails = {
                        name: user.name === '' ? oldUser.name : user.name,
                        email: user.email === '' ? oldUser.email : user.email,
                        phone: user.phone === '' ? oldUser.phone : user.phone,
                        address: user.address,
                    }
                    sessionStorage.setItem("user", JSON.stringify(newUserDetails))
                    dispatch(authSuccess(newUserDetails))
                }
            })
            .catch((error) => {
                if (error.response) {

                    switch (error.response.status) {
                        case 403:
                            dispatch(authFail('Session expired, please sign in again'))
                            break

                        case 404:
                            dispatch(authFail('Error trying to connect to server, please try again later!'))
                            break

                        case 500:
                            dispatch(authFail('Oops looks like there was a problem. Please try again later'))
                            break
                    }
                }
            })
    }
}

const genCookies = () => {

    return (
        document.cookie.split(';').map(function(c) {
            return c.trim().split('=').map(decodeURIComponent);
        }).reduce(function(a, b) {
            try {
                a[b[0]] = JSON.parse(b[1]);
            } catch (e) {
                a[b[0]] = b[1];
            }
            return a;
        }, {})
    )
}