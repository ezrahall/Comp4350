import * as actionTypes from '../actions/actions';
import { updateObject } from './utility';

const initialState = {
    user: null,
    address: '',
    isLoading: false,
    error: null
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, isLoading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        error: null,
        isLoading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        isLoading: false
    })
};

const authLogout = (state, action) => {
    return updateObject(state, {user:null});
};

const setAddress = (state, action) => {
    return updateObject(state,{...state, address: action.address})
}



const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_CURRENT_ADDRESS: return setAddress(state, action);
        default: return state;
    }
};

export default authReducer;