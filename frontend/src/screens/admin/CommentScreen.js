import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertDate } from "../../utils";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  confirmComment,
  deleteComment,
  getAllComments,
} from "../../actions/commentAction";

export default function CommentScreen() {
  const { userInfo } = useSelector((state) => state.signin);
  const [deleteState, setDeleteState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const [confirmState, setConfirmState] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [commentState, setCommentState] = useState({
    loading: false,
    error: false,
    comments: [],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [commentPerPage] = useState(10);
  const [commentCounts, setCommentCount] = useState(0);

  const getComments = useCallback(
    async (page) => {
      setCommentState((prev) => {
        return { ...prev, loading: true };
      });
      const result = await getAllComments(page, commentPerPage);
      if (result.comments) {
        setCommentState((prev) => {
          return {
            ...prev,
            loading: false,
            comments: result.comments,
          };
        });
        setCommentCount(result.counts);
      } else {
        setCommentState((prev) => {
          return { ...prev, loading: false, error: result.error };
        });
      }
    },
    [commentPerPage]
  );

  // const dispatch = useDispatch();
  useEffect(() => {
    getComments(1);
  }, [getComments]);

  const deleteHandler = async (commentId) => {
    if (window.confirm(`آیا قصد حذف سفارش ${commentId} را دارید؟`)) {
      if (window.confirm("مطمئنی؟")) {
        setDeleteState({ ...deleteState, loading: true });
        const result = await deleteComment(commentId, userInfo);
        if (result.comment) {
          setDeleteState({ ...deleteState, loading: false, success: true });
          getComments(1);
        } else {
          setDeleteState({
            ...deleteState,
            loading: false,
            success: false,
            error: result.error,
          });
        }
      }
    }
  };

  const confirmHandler = async (commentId) => {
    if (window.confirm(`آیا قصد تایید نظر ${commentId} را دارید؟`)) {
      if (window.confirm("مطمئنی؟")) {
        setConfirmState({ ...confirmState, loading: true });
        const result = await confirmComment(commentId, userInfo);
        if (result.comment) {
          setConfirmState({ ...confirmState, loading: false, success: true });
          getComments(1);
        } else {
          setConfirmState({
            ...confirmState,
            loading: false,
            success: false,
            error: result.error,
          });
        }
      }
    }
  };

  const numberOfAvailablePages = Math.ceil(commentCounts / commentPerPage);

  const changePage = (input) => {
    if (input === "next" && currentPage < numberOfAvailablePages) {
      getComments(currentPage + 1);
      setcurrentPage((prev) => prev + 1);
    } else if (input === "prev" && currentPage > 1) {
      getComments(currentPage - 1);
      setcurrentPage((prev) => prev - 1);
    } else if (input > currentPage && input <= commentCounts) {
      getComments(input);
      setcurrentPage(input);
    } else if (input < currentPage && input > 0) {
      getComments(input);
      setcurrentPage(input);
    }
    window.scrollTo(0, 0);
  };
  return (
    <>
      {" "}
      <div className="block flex-row center bigText">نظرات</div>
      {commentState.loading ? (
        <LoadingBox></LoadingBox>
      ) : commentState.error ? (
        <MessageBox variant="danger">{commentState.error}</MessageBox>
      ) : (
        <>
          {(deleteState.loading || confirmState.loading) && (
            <LoadingBox></LoadingBox>
          )}
          {deleteState.error && (
            <MessageBox variant="danger">{deleteState.error}</MessageBox>
          )}
          {confirmState.error && (
            <MessageBox variant="danger">{confirmState.error}</MessageBox>
          )}
          {commentState.comments.length > 0 ? (
            <>
              <div className="wrapper">
                <div className="table">
                  <div className="table-row header">
                    <div className="cell">شناسه</div>
                    <div className="cell">نام کاربری </div>
                    <div className="cell">نظر</div>
                    <div className="cell"> شناسه محصول</div>
                    <div className="cell">تاریخ ثبت </div>
                    <div className="cell">وضعیت تایید نظر </div>
                    <div className="cell">عملیات ها</div>
                  </div>

                  {commentState.comments.map((comment) => (
                    <div key={comment._id} className="table-row">
                      <div className="cell" data-title="شناسه">
                        {comment._id}
                      </div>

                      <div className="cell" data-title="نام کاربری">
                        {comment.username}
                      </div>
                      <div className="cell" data-title="نظر">
                        {comment.comment}
                      </div>
                      <div className="cell" data-title="شناسه محصول">
                        {comment.product}
                      </div>
                      <div className="cell" data-title="تاریخ ثبت ">
                        {comment.time && convertDate(comment.time)}
                      </div>
                      <div className="cell" data-title="وضعیت تایید نظر ">
                        {comment.isConfiremd ? "تایید شده" : "تایید نشده"}
                      </div>

                      <div className="cell" data-title="عملیات ها">
                        <button
                          className="table-btn "
                          onClick={() => confirmHandler(comment._id)}
                        >
                          تایید{" "}
                        </button>

                        <button
                          className="table-btn "
                          onClick={() => deleteHandler(comment._id)}
                        >
                          حذف{" "}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ul className="pagination">
                  <li>
                    <button
                      className="btn page-btn"
                      onClick={() => changePage("prev")}
                    >
                      <i className="fas fa-backward"></i>
                    </button>
                  </li>
                  {currentPage - 2 > 0 && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage - 2)}
                      >
                        {currentPage - 2}
                      </button>
                    </li>
                  )}
                  {currentPage - 1 > 0 && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </button>
                    </li>
                  )}
                  <li>
                    <button className="btn main-page-btn">{currentPage}</button>
                  </li>
                  {currentPage + 1 <= numberOfAvailablePages && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </button>
                    </li>
                  )}
                  {currentPage + 2 <= numberOfAvailablePages && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage + 2)}
                      >
                        {currentPage + 2}
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="btn page-btn"
                      onClick={() => changePage("next")}
                    >
                      <i className="fas fa-forward"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <MessageBox>هنوز نظری ثبت نشده است</MessageBox>
          )}
        </>
      )}
    </>
  );
}
