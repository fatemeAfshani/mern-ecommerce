import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_RELAITED_FAIL,
  PRODUCT_RELAITED_REQUEST,
  PRODUCT_RELAITED_SUCCESS,
} from "../constants/productConstant";

export const detailProductReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const relaitedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_RELAITED_REQUEST:
      return { loading: true };
    case PRODUCT_RELAITED_SUCCESS:
      return { loading: false, relaited: action.payload };
    case PRODUCT_RELAITED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
