import axios from "axios";
import {
  ADD_ITEM_TO_CART,
  ADD_SHIPPING_TO_CART,
  DELETE_FROM_CART,
} from "../constants/cartConstant";

//add try catch for api calling or get product info from ui
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      name: data.name,
      image: data.images[0],
      price: data.price,
      weight: data.weight,
      product: data._id,
      searchName: data.searchName,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FROM_CART,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const shippingToCart = (shippingData, paymentMethod) => (dispatch) => {
  dispatch({
    type: ADD_SHIPPING_TO_CART,
    payload: { shippingData, paymentMethod },
  });

  localStorage.setItem("shippingData", JSON.stringify(shippingData));
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
