import {ADD_TO_BASKET, REMOVE_FROM_BASKET,DECREASE_ITEM_QUATITY, ADJUST_ITEM_QUANTITY} from './actions';

export const addToBasket = (item) => {
    return dispatch => {
        dispatch({
            type: ADD_TO_BASKET,
            item
        })
    }
}

export let removeFromBasket = (id) => {
    return dispatch => {
        dispatch({
            type: REMOVE_FROM_BASKET,
            id
        })
    }
}

export const decreaseItemQuantity = (id) => {
    return dispatch => {
        dispatch({
            type: DECREASE_ITEM_QUATITY,
            id
        })
    }
}

export const adjustItemQuantity = (item) => {
    return dispatch => {
        dispatch({
            type: ADJUST_ITEM_QUANTITY,
            item
        })
    }
  }