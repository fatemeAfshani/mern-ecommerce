import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  orderDetailForAdminReducer,
  orderDetailReducer,
} from "./reducers/orderReducer.js";
import {
  detailProductReducer,
  relaitedProductsReducer,
} from "./reducers/productReducers.js";
// import { detailArticleReducer } from "./reducers/articleReducers.js";
import {
  SigninReducer,
  userDetailForAdminReducer,
  userDetailReducer,
} from "./reducers/userReducers.js";
const initialState = {
  signin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingData")
      ? JSON.parse(localStorage.getItem("shippingData"))
      : {
          fullname: "",
          state: "",
          city: "",
          fullAddress: "",
          postalCode: "",
          phoneNumber: "",
        },
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",
  },
};
const reducer = combineReducers({
  productDetail: detailProductReducer,
  // articleDetail: detailArticleReducer,
  cart: cartReducer,
  signin: SigninReducer,
  orderDetail: orderDetailReducer,
  orderDetailForAdmin: orderDetailForAdminReducer,
  userDetail: userDetailReducer,
  userDetailForAdmin: userDetailForAdminReducer,
  relaitedProducts: relaitedProductsReducer,
});

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
);

export default store;
