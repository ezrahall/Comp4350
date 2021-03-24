import {SET_RESTAURANT} from './actions';

export const setRestaurant = (restaurant) => {
    return dispatch => {
        dispatch({
            type: SET_RESTAURANT,
            restaurant
        })
    }
}