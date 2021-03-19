import { updateObject } from "./utility";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET, DECREASE_ITEM_QUATITY } from "../actions/actions";

const initialState = {
  basket: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const inBasket = state.basket.find((item) =>
        item.id === action.item.id ? true : false
      );

      let newBasket = [...state.basket];

      if (!inBasket) {
        newBasket = [...state.basket, {...action.item, qty: 1}];
      }
      else {
        
        const index = state.basket.findIndex((item) => item.id === action.item.id)

        newBasket[index].qty += 1

      }


      return {
        ...state,
        basket: newBasket,
      };

    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case DECREASE_ITEM_QUATITY:

      const inCurrentBasket = state.basket.find((item) =>
      item.id === action.id ? true : false
      );

      let newCurrentBasket = [...state.basket];

      if(inCurrentBasket){

        const itemIndex = state.basket.findIndex((item) => item.id === action.id)

        newCurrentBasket[itemIndex].qty -= 1

      }

      
      return{
        ...state,
        basket: newCurrentBasket,
      };

    default:
      return state;
  }
};

export default cartReducer;
