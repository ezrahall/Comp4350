import * as actionTypes from '../actions/actions';
import { updateObject } from './utility';

const initialState = {
    currentOrder: null
};

const setCurrentOrder = (state, action) => {
    return updateObject(state, {currentOrder: action.order})
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_ORDER: return setCurrentOrder(state, action);
        default: return state;
    }
};

export default orderReducer;