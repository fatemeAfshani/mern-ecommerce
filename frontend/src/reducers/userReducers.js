import {
  USER_DETAIL_FAIL,
  USER_DETAIL_FOR_ADMIN_FAIL,
  USER_DETAIL_FOR_ADMIN_REQUEST,
  USER_DETAIL_FOR_ADMIN_RESET,
  USER_DETAIL_FOR_ADMIN_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstant";

export const SigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };
    case USER_DETAIL_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailForAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_FOR_ADMIN_REQUEST:
      return { loading: true };
    case USER_DETAIL_FOR_ADMIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAIL_FOR_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAIL_FOR_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};
