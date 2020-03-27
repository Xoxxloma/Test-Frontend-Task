import React, { useReducer, createContext } from "react";
import data from "../products.json";
import {
  GET_PRODUCTS,
  SET_LOADING,
  ADD_IN_CART,
  REMOVE_FROM_CART
} from "./types.js";
import { shopReducer } from "./shopContextReducer.js";

export const ShopContext = createContext();

export const ShopState = ({ children }) => {
  const initialState = {
    products: [],
    shopCart: [],
    loading: false
  };

  const [state, dispatch] = useReducer(shopReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getProducts = () => {
    setLoading();
    dispatch({
      type: GET_PRODUCTS,
      payload: data
    });
  };

  const updateCartItems = (shopCart, item, idx) => {
    if (item.count === 0) {
      return [...shopCart.slice(0, idx), ...shopCart.slice(idx + 1)];
    }

    if (idx === -1) {
      return [...shopCart, item];
    }

    return [...shopCart.slice(0, idx), item, ...shopCart.slice(idx + 1)];
  };

  const updateItem = (item = {}, product, quantity) => {
    const {
      productId = product.productId,
      title = product.title,
      price = product.priceGold,  //  <====== price hardcoded here but could be flexible
      count = 0,
      total = 0
    } = item;
    return {
      productId,
      title,
      price,
      count: count + quantity,
      total: total + price * quantity
    };
  };

  const updateCart = (id, quantity = 1) => {
    const product = state.products.find(({ productId }) => productId === id);
    const itemIndex = state.shopCart.findIndex(
      ({ productId }) => productId === id
    );
    const item = state.shopCart[itemIndex];

    const newItem = updateItem(item, product, quantity);

    const newShopState = updateCartItems(state.shopCart, newItem, itemIndex);

    dispatch({
      type: ADD_IN_CART,
      payload: newShopState
    });
  };

  const removeFromCart = id => {
    const newShopState = state.shopCart.filter(
      ({ productId }) => productId !== id
    );
    dispatch({
      type: REMOVE_FROM_CART,
      payload: newShopState
    });
  };

  const { products, shopCart, loading, orderTotal } = state;
  return (
    <ShopContext.Provider
      value={{
        products,
        shopCart,
        loading,
        getProducts,
        setLoading,
        orderTotal,
        updateCart,
        removeFromCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
