// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   createArticle,
//   deleteArticle,
//   listArticles,
// } from "../../actions/articleActions";
// import LoadingBox from "../../components/LoadingBox";
// import MessageBox from "../../components/MessageBox";

// export default function ArticleListScreen(props) {
//   const [deleteState, setDeleteArticle] = useState({
//     loading: false,
//     success: false,
//     error: "",
//   });
//   // const { loading, error, products } = useSelector(
//   //   (state) => state.productList
//   // );
//   const [createState, setCreateState] = useState({
//     loading: false,
//     error: "",
//     success: false,
//   });

//   const [articleState, setArticleState] = useState({
//     loading: false,
//     error: false,
//     articles: [],
//   });
//   const [currentPage, setcurrentPage] = useState(1);
//   const [productPerPage] = useState(10);
//   const [productCounts, setProductCount] = useState(0);

//   const { userInfo } = useSelector((state) => state.signin);
//   // const dispatch = useDispatch();

//   const getArticles = useCallback(
//     async (page) => {
//       setArticleState((prev) => {
//         return { ...prev, loading: true };
//       });
//       const result = await listArticles(page, productPerPage);
//       if (result.articles) {
//         setArticleState((prev) => {
//           return {
//             ...prev,
//             loading: false,
//             articles: result.articles,
//           };
//         });
//         setProductCount(result.counts);
//       } else {
//         setArticleState((prev) => {
//           return { ...prev, loading: false, error: result.error };
//         });
//       }
//     },
//     [productPerPage]
//   );

//   const deleteHandler = async (articleId) => {
//     setDeleteArticle({ ...deleteState, loading: true });
//     const result = await deleteArticle(articleId, userInfo);

//     if (result.product) {
//       setDeleteArticle({ ...deleteState, loading: false, success: true });
//       getArticles(1);
//     } else {
//       setDeleteArticle({
//         ...deleteState,
//         loading: false,
//         success: false,
//         error: result.error,
//       });
//     }
//   };

//   const createNewArticle = async () => {
//     setCreateState({ ...createState, loading: true });
//     const { article, error } = await createArticle(userInfo);
//     if (article) {
//       props.history.push(`/articles/${article._id}/edit`);
//     } else {
//       setCreateState({
//         ...createState,
//         loading: false,
//         success: false,
//         error,
//       });
//     }
//   };

//   useEffect(() => {
//     getArticles(1);
//   }, [getArticles]);

//   const numberOfAvailablePages = Math.ceil(productCounts / productPerPage);

//   const changePage = (input) => {
//     if (input === "next" && currentPage < numberOfAvailablePages) {
//       getArticles(currentPage + 1);
//       setcurrentPage((prev) => prev + 1);
//     } else if (input === "prev" && currentPage > 1) {
//       getArticles(currentPage - 1);
//       setcurrentPage((prev) => prev - 1);
//     } else if (input > currentPage && input <= productCounts) {
//       getArticles(input);
//       setcurrentPage(input);
//     } else if (input < currentPage && input > 0) {
//       getArticles(input);
//       setcurrentPage(input);
//     }
//     window.scrollTo(0, 0);
//   };
//   return (
//     <>
//       <div className="flex-row ">
//         <button className="btn cart-btn" onClick={createNewArticle}>
//           {" "}
//           افزودن مقاله جدید
//         </button>
//         <h1 className="bigText">مقالات</h1>
//       </div>
//       {createState.loading && <LoadingBox></LoadingBox>}
//       {createState.error && (
//         <MessageBox variant="danger">{createState.error}</MessageBox>
//       )}
//       {deleteState.loading && <LoadingBox></LoadingBox>}
//       {deleteState.error && (
//         <MessageBox variant="danger">{deleteState.error}</MessageBox>
//       )}
//       {articleState.loading ? (
//         <LoadingBox></LoadingBox>
//       ) : articleState.error ? (
//         <MessageBox variant="danger">{articleState.error}</MessageBox>
//       ) : (
//         <>
//           {articleState.articles.length > 0 ? (
//             <>
//               <div className="wrapper">
//                 <div className="table">
//                   <div className="table-row header">
//                     <div className="cell">شناسه</div>
//                     <div className="cell">عنوان </div>
//                     <div className="cell"> view</div>
//                     <div className="cell">likes</div>
//                     <div className="cell">عکس</div>
//                     <div className="cell">عملیات ها </div>
//                   </div>

//                   {articleState.articles.map((article) => (
//                     <div key={article._id} className="table-row">
//                       <div className="cell" data-title="شناسه">
//                         {article._id}
//                       </div>
//                       <div className="cell" data-title="عنوان">
//                         {article.title}
//                       </div>
//                       <div className="cell" data-title="view">
//                         {article.views}
//                       </div>
//                       <div className="cell" data-title="likes">
//                         {article.likes}
//                       </div>
//                       <div className="cell" data-title="عکس">
//                         <img
//                           src={`article.thumbnail`}
//                           alt={`article.title`}
//                           style={{ width: "30px", height: "30px" }}
//                         ></img>
//                       </div>

//                       <div className="cell" data-title="عملیات ها ">
//                         <Link to={`/articles/${article._id}/edit`}>ویرایش</Link>
//                         <button
//                           className="table-btn "
//                           onClick={() => deleteHandler(article._id)}
//                         >
//                           حذف{" "}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <ul className="pagination">
//                   <li>
//                     <button
//                       className="btn page-btn"
//                       onClick={() => changePage("prev")}
//                     >
//                       <i className="fas fa-backward"></i>
//                     </button>
//                   </li>
//                   {currentPage - 2 > 0 && (
//                     <li>
//                       <button
//                         className="btn page-btn"
//                         onClick={() => changePage(currentPage - 2)}
//                       >
//                         {currentPage - 2}
//                       </button>
//                     </li>
//                   )}
//                   {currentPage - 1 > 0 && (
//                     <li>
//                       <button
//                         className="btn page-btn"
//                         onClick={() => changePage(currentPage - 1)}
//                       >
//                         {currentPage - 1}
//                       </button>
//                     </li>
//                   )}
//                   <li>
//                     <button className="btn main-page-btn">{currentPage}</button>
//                   </li>
//                   {currentPage + 1 <= numberOfAvailablePages && (
//                     <li>
//                       <button
//                         className="btn page-btn"
//                         onClick={() => changePage(currentPage + 1)}
//                       >
//                         {currentPage + 1}
//                       </button>
//                     </li>
//                   )}
//                   {currentPage + 2 <= numberOfAvailablePages && (
//                     <li>
//                       <button
//                         className="btn page-btn"
//                         onClick={() => changePage(currentPage + 2)}
//                       >
//                         {currentPage + 2}
//                       </button>
//                     </li>
//                   )}
//                   <li>
//                     <button
//                       className="btn page-btn"
//                       onClick={() => changePage("next")}
//                     >
//                       <i className="fas fa-forward"></i>
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </>
//           ) : (
//             <MessageBox>هنوز مقاله ای ثبت نشده است</MessageBox>
//           )}
//         </>
//       )}
//     </>
//   );
// }
