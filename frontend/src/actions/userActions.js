import {
  USER_DETAIL_FAIL,
  USER_DETAIL_FOR_ADMIN_FAIL,
  USER_DETAIL_FOR_ADMIN_REQUEST,
  USER_DETAIL_FOR_ADMIN_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstant";
import axios from "axios";
import { DELETE_CART } from "../constants/cartConstant";

export const signin = async (phoneNumber) => {
  try {
    const { data } = await axios.post("/api/users/signin", {
      phoneNumber,
    });
    return { user: data.user };

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");

  dispatch({
    type: DELETE_CART,
  });

  dispatch({
    type: USER_SIGNOUT,
  });
};

export const verification = (phoneNumber, code) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      phoneNumber,
      code,
    },
  });
  try {
    const { data } = await axios.post("/api/users/verify", {
      phoneNumber,
      code,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserData = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAIL_REQUEST,
  });
  const {
    signin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersList = async (page, limit) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(`/api/users?page=${page}&limit=${limit}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

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

export const deleteUser = async (userId, userInfo) => {
  try {
    const { data } = await axios.delete(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    return { user: data.user };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const updateUserProfileByAdmin = async (Updateddata, userInfo) => {
  try {
    const { data } = await axios.put("/api/users/AdminUpdate", Updateddata, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    return { user: data };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const getUserDataForAdmin = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAIL_FOR_ADMIN_REQUEST,
  });
  const {
    signin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: USER_DETAIL_FOR_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FOR_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
