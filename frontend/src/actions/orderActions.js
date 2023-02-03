import axios from "axios";
import { DELETE_CART_ITEMS } from "../constants/cartConstant";
import {
  GET_ORDER_FAIL,
  GET_ORDER_FOR_ADMIN_FAIL,
  GET_ORDER_FOR_ADMIN_REQUEST,
  GET_ORDER_FOR_ADMIN_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../constants/orderConstant";
export const createOrder = async (order, dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.post("/api/orders/", order, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch({
      type: DELETE_CART_ITEMS,
    });
    localStorage.removeItem("cartItems");
    return { order: data.order };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderForAdmin = (orderId) => async (dispatch) => {
  dispatch({
    type: GET_ORDER_FOR_ADMIN_REQUEST,
  });
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(`/api/orders/admin/${orderId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: GET_ORDER_FOR_ADMIN_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FOR_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrders = async (page, limit) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(
      `/api/orders/mine?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const getAllOrders = async (page, limit) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(
      `/api/orders?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const deleteOrder = async (orderId, userInfo) => {
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    return { order: data.order };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const deliverOrder = async (orderId, message, userInfo) => {
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {
        message,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    return { order: data.order };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    if (!localStorage.getItem("userInfo")) {
      return {
        error: "برای حذف کنسل کردن سفارش ابتدا وارد ناحیه کاربری خود شود",
      };
    }
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(`/api/orders/cancel/${orderId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return { order: data.order };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
