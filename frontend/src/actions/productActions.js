import axios from "axios";
import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_RELAITED_FAIL,
  PRODUCT_RELAITED_REQUEST,
  PRODUCT_RELAITED_SUCCESS,
} from "../constants/productConstant";

export const listProducts = async (page, limit) => {
  try {
    const { data } = await axios.get(
      `/api/products?page=${page}&limit=${limit}`
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

export const detailProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reliatedProducts = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_RELAITED_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/relaited/${productId}`);
    dispatch({
      type: PRODUCT_RELAITED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_RELAITED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = async (userInfo) => {
  try {
    const { data } = await axios.post(
      "/api/products",
      {},
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    return { product: data.product };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const updateProduct = async (id, product, userInfo) => {
  try {
    const { data } = await axios.put(`/api/products/${id}`, product, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });

    return { product: data.product };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const deleteProduct = async (id, userInfo) => {
  try {
    const { data } = await axios.delete(`/api/products/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    return { product: data.product };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
