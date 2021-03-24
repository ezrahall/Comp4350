import {updateObject} from './utility';
import {SET_RESTAURANT} from '../actions/actions';

const initialState = {
    restaurant: null
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_RESTAURANT:
            return {
                ...state,
                restaurant: action.restaurant
            };
        default:
            return state;
    }
}

export default restaurantReducer;