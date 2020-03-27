import { SET_LOADING, GET_PRODUCTS, ADD_IN_CART, REMOVE_FROM_CART } from "./types";


export const shopReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_IN_CART: {
      return {
        ...state,
        shopCart:  action.payload
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        shopCart: action.payload
      }
    }
    default:
      return state;
  }
};
