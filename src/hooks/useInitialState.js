import { useState } from 'react';
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };
  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((items) => items.cartId !== payload.cartId),
    });
  };
  const addToBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };
  const addNewOrder = (payload) => {
    setState({
      ...state,
      order: [...state.orders, payload],
    });
  };

  return { removeFromCart, addToCart, addToBuyer, addNewOrder, state };
};

export default useInitialState;
