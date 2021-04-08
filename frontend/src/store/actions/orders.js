import axios from "axios";
import {SET_CURRENT_ORDER, UPDATE_CURRENT_ORDER, NULL_ORDER} from '../actions/actions';

export const setOrder = (order) => {
    return dispatch => {
        dispatch({
            type:SET_CURRENT_ORDER,
            order
        })
    }
}

export const orderNull = () => {
    return dispatch => {
        dispatch({
            type: NULL_ORDER
        })
    }
}

export const increaseState = (id) =>{
    return dispatch => {
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Transaction/Update`,{
            cookies: genCookies(),
            id
        })
            .then(() =>{
                dispatch({
                    type: UPDATE_CURRENT_ORDER,
                    id
                })
            })
            .catch((error) => console.log(error))
    }
}
const genCookies = () => {

    return (
        document.cookie.split(';').map((c) => {
            return c.trim().split('=').map(decodeURIComponent);
        }).reduce((a, b) => {
            try {
                a[b[0]] = JSON.parse(b[1]);
            } catch (e) {
                a[b[0]] = b[1];
            }
            return a;
        }, {})
    )
}