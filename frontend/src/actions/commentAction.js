import axios from "axios";

export const getAllComments = async (page, limit) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(
      `/api/comments/all?page=${page}&limit=${limit}`,
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

export const deleteComment = async (commentId, userInfo) => {
  try {
    const { data } = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    return { comment: data.comment };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const confirmComment = async (commentId, userInfo) => {
  try {
    const { data } = await axios.put(
      `/api/comments/confirm/${commentId}`,
      {},
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    return { comment: data.comment };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
