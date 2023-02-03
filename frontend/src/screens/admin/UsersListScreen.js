import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsersList } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function UsersListScreen() {
  const { userInfo } = useSelector((state) => state.signin);
  const [userDelete, setUserDelete] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const [userState, setUserState] = useState({
    loading: false,
    error: false,
    users: [],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const [userCounts, setUserCount] = useState(0);

  const getUsers = useCallback(
    async (page) => {
      setUserState((prev) => {
        return { ...prev, loading: true };
      });
      const result = await getUsersList(page, userPerPage);
      if (result.users) {
        setUserState((prev) => {
          return {
            ...prev,
            loading: false,
            users: result.users,
          };
        });
        setUserCount(result.counts);
      } else {
        setUserState((prev) => {
          return { ...prev, loading: false, error: result.error };
        });
      }
    },
    [userPerPage]
  );

  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: USER_DETAIL_FOR_ADMIN_RESET });
    getUsers(1);
  }, [getUsers]);

  const deleteHandler = async (userId) => {
    if (window.confirm("آیا میخواهید کاربر را حذف کنید؟")) {
      if (window.confirm("مطمئنی؟")) {
        setUserDelete({ ...userDelete, loading: true });
        const result = await deleteUser(userId, userInfo);
        if (result.user) {
          setUserDelete({ ...userDelete, loading: false, success: true });
          getUsers(1);
        } else {
          setUserDelete({
            ...userDelete,
            loading: false,
            success: false,
            error: result.error,
          });
        }
      }
    }
  };

  const numberOfAvailablePages = Math.ceil(userCounts / userPerPage);

  const changePage = (input) => {
    if (input === "next" && currentPage < numberOfAvailablePages) {
      getUsers(currentPage + 1);
      setcurrentPage((prev) => prev + 1);
    } else if (input === "prev" && currentPage > 1) {
      getUsers(currentPage - 1);
      setcurrentPage((prev) => prev - 1);
    } else if (input > currentPage && input <= userCounts) {
      getUsers(input);
      setcurrentPage(input);
    } else if (input < currentPage && input > 0) {
      getUsers(input);
      setcurrentPage(input);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h1 className="bigText block flex-row center ">کاربران</h1>

      {userDelete.loading && <LoadingBox></LoadingBox>}
      {userDelete.error && (
        <MessageBox variant="danger">{userDelete.error}</MessageBox>
      )}
      {userState.loading ? (
        <LoadingBox></LoadingBox>
      ) : userState.error ? (
        <MessageBox variant="danger">{userState.error}</MessageBox>
      ) : (
        <>
          {userState.users.length > 0 ? (
            <>
              <div className="wrapper">
                <div className="table">
                  <div className="table-row header">
                    <div className="cell">شناسه</div>
                    <div className="cell">شماره</div>
                    <div className="cell">ادمین؟</div>
                    <div className="cell">عملیات ها </div>
                  </div>

                  {userState.users.map((user) => (
                    <div key={user._id} className="table-row">
                      <div className="cell" data-title="شناسه">
                        {user._id}
                      </div>
                      <div className="cell" data-title="شماره تلفن">
                        {user.phoneNumber}
                      </div>
                      <div className="cell" data-title="ادمین؟">
                        {user.isAdmin ? "admin" : "user"}
                      </div>

                      <div className="cell" data-title="عملیات ها ">
                        <Link to={`/users/${user._id}/edit`}>ویرایش</Link>
                        <button
                          className="table-btn "
                          onClick={() => deleteHandler(user._id)}
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
            <MessageBox>هنوز کاربری ثبت نشده است</MessageBox>
          )}
        </>
      )}
    </>
  );
}
