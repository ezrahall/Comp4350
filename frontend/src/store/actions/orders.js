import {SET_CURRENT_ORDER} from '../actions/actions';

export const setOrder = (order) => {
    return dispatch => {
        dispatch({
            type:SET_CURRENT_ORDER,
            order
        })
    }
}