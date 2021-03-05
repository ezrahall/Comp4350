import {ADD_TO_BASKET, REMOVE_FROM_BASKET} from './actions';

export const addToBasket = (item) => {
    return dispatch => {
        dispatch({
            type: ADD_TO_BASKET,
            item
        })
    }
}

export const removeFromBasket = (id) => {
    return dispatch => {
        dispatch({
            type: REMOVE_FROM_BASKET,
            id
        })
    }
}