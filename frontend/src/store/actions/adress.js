import {SET_CURRENT_ADDRESS} from './actions';

export const setAddress = (address) =>{
    return {
        type: SET_CURRENT_ADDRESS,
        address
    }
}