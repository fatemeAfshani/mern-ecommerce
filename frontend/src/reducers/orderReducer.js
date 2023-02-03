import {
  GET_ORDER_FAIL,
  GET_ORDER_FOR_ADMIN_FAIL,
  GET_ORDER_FOR_ADMIN_REQUEST,
  GET_ORDER_FOR_ADMIN_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../constants/orderConstant";

export const orderDetailReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };

    case GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailForAdminReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_FOR_ADMIN_REQUEST:
      return { loading: true };

    case GET_ORDER_FOR_ADMIN_SUCCESS:
      return { loading: false, order: action.payload };
    case GET_ORDER_FOR_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
