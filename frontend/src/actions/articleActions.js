// import axios from "axios";
// import {
//   ARTICLE_DETAIL_FAIL,
//   ARTICLE_DETAIL_REQUEST,
//   ARTICLE_DETAIL_SUCCESS,
// } from "../constants/articleConstant";

// export const listArticles = async (page, limit) => {
//   try {
//     const { data } = await axios.get(
//       `/api/articles/all?page=${page}&limit=${limit}`
//     );
//     console.log("articles data", data);
//     return data;
//   } catch (error) {
//     return {
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     };
//   }
// };

// export const detailArticle = (articleId) => async (dispatch) => {
//   dispatch({
//     type: ARTICLE_DETAIL_REQUEST,
//     payload: articleId,
//   });
//   try {
//     const { data } = await axios.get(`/api/articles/${articleId}`);
//     console.log("article detail", data);

//     dispatch({ type: ARTICLE_DETAIL_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: ARTICLE_DETAIL_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const createArticle = async (userInfo) => {
//   try {
//     const { data } = await axios.post(
//       "/api/articles",
//       {},
//       {
//         headers: {
//           authorization: `Bearer ${userInfo.token}`,
//         },
//       }
//     );
//     console.log("created article", data);
//     return { article: data.article };
//   } catch (error) {
//     return {
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     };
//   }
// };

// export const updateArticle = async (id, article, userInfo) => {
//   try {
//     const { data } = await axios.put(`/api/articles/${id}`, article, {
//       headers: { authorization: `Bearer ${userInfo.token}` },
//     });

//     return { article: data.article };
//   } catch (error) {
//     return {
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     };
//   }
// };

// export const likeArticle = async (id, like, userInfo) => {
//   try {
//     const { data } = await axios.put(
//       `/api/articles/${id}`,
//       {
//         ip: "222.222.22.22",
//         like,
//       },
//       {
//         headers: { authorization: `Bearer ${userInfo.token}` },
//       }
//     );

//     return { message: data.message };
//   } catch (error) {
//     return {
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     };
//   }
// };

// export const deleteArticle = async (id, userInfo) => {
//   try {
//     const { data } = await axios.delete(`/api/articles/${id}`, {
//       headers: {
//         authorization: `Bearer ${userInfo.token}`,
//       },
//     });
//     return { article: data.article };
//   } catch (error) {
//     return {
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     };
//   }
// };
