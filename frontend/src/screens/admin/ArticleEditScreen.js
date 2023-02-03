// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import LoadingBox from "../../components/LoadingBox";
// import MessageBox from "../../components/MessageBox";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { detailArticle, updateArticle } from "../../actions/articleActions";

// export default function ArticleEditScreen(props) {
//   const { id } = useParams();
//   const [EditArticle, setEditArticle] = useState({
//     title: "",
//     thumbnail: "",
//   });

//   const [body, setBody] = useState("");

//   const [updateState, setUpdateState] = useState({
//     loading: false,
//     error: "",
//     success: false,
//   });
//   const [upload, setUplaod] = useState({ loading: false, error: "" });

//   const dispatch = useDispatch();
//   const { loading, error, article } = useSelector(
//     (state) => state.articleDetail
//   );

//   useEffect(() => {
//     if (updateState.success) {
//       props.history.push("/articleList");
//     }
//     if (!article || article._id !== id) {
//       // dispatch({ type: PRODUCT_UPDATE_RESET });
//       dispatch(detailArticle(id));
//     } else {
//       setEditArticle({
//         title: article.title,
//         thumbnail: article.thumbnail,
//       });
//       setBody(article.body);
//     }
//   }, [dispatch, article, id, props.history, updateState.success]);

//   const changeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setEditArticle({ ...EditArticle, [name]: value });
//   };

//   const updateBody = (editor) => {
//     const data = editor.getData();
//     setBody(data);
//   };

//   const { userInfo } = useSelector((state) => state.signin);

//   const uploadFilesHandler = async (e) => {
//     const file = e.target.file;
//     const bodyFormData = new FormData();
//     bodyFormData.append("images", file);

//     setUplaod({ ...upload, loading: true });
//     try {
//       const { data } = await axios.post("/api/uploads", bodyFormData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       });
//       setUplaod({ ...upload, loading: false });
//       setEditArticle({ ...EditArticle, thumbnail: data });
//     } catch (error) {
//       setUplaod({ loading: false, error: error.message });
//     }
//   };

//   const formHandler = async (e) => {
//     e.preventDefault();
//     setUpdateState({ ...updateState, loading: true });
//     const result = await updateArticle(id, { ...EditArticle, body }, userInfo);

//     if (result.article) {
//       setUpdateState({ ...updateState, loading: false, success: true });
//     } else {
//       setUpdateState({ ...updateState, loading: false, error: result.error });
//     }
//   };

//   return (
//     <>
//       <form className="form " onSubmit={formHandler}>
//         <div>
//           <h2>ویرایش مقاله</h2>
//         </div>
//         {loading && <LoadingBox></LoadingBox>}
//         {error && <MessageBox variant="danger">{error}</MessageBox>}
//         {updateState.loading && <LoadingBox></LoadingBox>}
//         {updateState.error && (
//           <MessageBox variant="danger">{updateState.error}</MessageBox>
//         )}
//         {upload.loading && <LoadingBox></LoadingBox>}
//         {upload.error && (
//           <MessageBox variant="danger">{upload.error}</MessageBox>
//         )}
//         <div>
//           <label htmlFor="name">عنوان</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             placeholder="عنوان را وارد کنید"
//             required
//             value={EditArticle.title}
//             onChange={(e) => changeHandler(e)}
//           />
//         </div>

//         <div>
//           <label htmlFor="imageFiles">عکس</label>
//           <input
//             type="file"
//             id="imageFiles"
//             label="عکس مورد نظررا انتخاب کنید"
//             onChange={uploadFilesHandler}
//           />
//         </div>
//         <div>
//           <label htmlFor="body">توضیحات</label>
//           <CKEditor
//             editor={ClassicEditor}
//             data={body}
//             config={{
//               language: {
//                 ui: "en",
//                 content: "ar",
//               },
//             }}
//             // onChange={(_, editor) => supdateDescription(editor)}
//             onReady={(editor) => {
//               // You can store the "editor" and use when it is needed.
//               console.log("Editor is ready to use!", editor);
//             }}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               console.log({ event, editor, data });
//             }}
//             onBlur={(event, editor) => updateBody(editor)}
//             onFocus={(event, editor) => {}}
//           />
//         </div>

//         <button type="submit" className="btn cart-btn half-btn">
//           تایید تغییرات{" "}
//         </button>
//       </form>
//     </>
//   );
// }
