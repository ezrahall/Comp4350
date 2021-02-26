export const initialState = {
    basket: [],
    user: null,
    address: ''
};

// Selector


export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state,action) => {

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

        default:
            return state;
    }
};

export default reducer;
