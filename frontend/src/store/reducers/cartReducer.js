import {updateObject} from './utility';
import {SET_CURRENT_BOOKINGS} from '../actions/actions';

const initialState = {
    basket: 0
};

const setCurrentBooking = (state, action) => {
    return updateObject(state, {...state, iceTime: action.iceTime});
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket,action.item],
            };
        case 'ADD_ADDRESS':
            return {
                ...state,
                address: [...state.basket,action.address],
            };

        case 'REMOVE_FROM_BASKET':

            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index,1)

            }
            else {
                console.warn('Cant Remove Product (id: $({action.id}) as it is not in the basket  ')
            }
            return {
                ...state,
                basket: newBasket

            }
        case SET_CURRENT_BOOKINGS:
            return {
                ...state,
                basket: state.basket+1
            }

        default:
            return state;
    }
}

export default cartReducer;