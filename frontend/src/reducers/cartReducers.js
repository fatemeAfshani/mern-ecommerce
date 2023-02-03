import {
  ADD_ITEM_TO_CART,
  ADD_SHIPPING_TO_CART,
  DELETE_CART,
  DELETE_CART_ITEMS,
  DELETE_FROM_CART,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case DELETE_CART:
      return {
        ...state,
        cartItems: [],
        shippingAddress: {
          fullname: "",
          state: "",
          city: "",
          fullAddress: "",
          postalCode: "",
          phoneNumber: "",
        },
        paymentMethod: "",
      };
    case ADD_SHIPPING_TO_CART:
      return {
        ...state,
        shippingAddress: action.payload.shippingData,
        paymentMethod: action.payload.paymentMethod,
      };
    case DELETE_CART_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
