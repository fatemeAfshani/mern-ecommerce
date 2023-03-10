import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserDataForAdmin,
  updateUserProfileByAdmin,
} from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

function EditUserScreen(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, error, user } = useSelector(
    (state) => state.userDetailForAdmin
  );
  const { userInfo } = useSelector((state) => state.signin);

  const [updateUser, setUpdateUser] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const dispatch = useDispatch();
  const formHandler = async (e) => {
    e.preventDefault();
    setUpdateUser({ ...updateUser, loading: true });
    const result = await updateUserProfileByAdmin(
      { id, name, isAdmin, phoneNumber },
      userInfo
    );
    if (result.user) {
      setUpdateUser({ ...updateUser, loading: false, success: true });
    } else {
      setUpdateUser({ ...setUpdateUser, loading: false, error: result.error });
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataForAdmin(id));
    } else if (updateUser.success) {
      props.history.push("/usersList");
    } else {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
    }
  }, [dispatch, user, updateUser.success, id, props.history]);
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : updateUser.loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <>
          {updateUser.error && (
            <MessageBox variant="danger">{updateUser.error}</MessageBox>
          )}

          <form className="form" onSubmit={formHandler}>
            <div>
              <h2>??????????????</h2>
            </div>

            <div>
              <label htmlFor="name">??????</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="?????? ?????? ???? ???????? ????????"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">??????????</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="?????????? ?????? ???? ???????? ????????"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <div className="radio-input">
                <label htmlFor="online">??????????</label>
                <input
                  type="radio"
                  name="isAdmin"
                  id="online"
                  value="true"
                  required
                  onChange={(e) => setIsAdmin(true)}
                />
              </div>

              <div className="radio-input">
                <label htmlFor="offline">??????????</label>
                <input
                  type="radio"
                  name="isAdmin"
                  id="offline"
                  value="false"
                  required
                  onChange={(e) => setIsAdmin(false)}
                />
              </div>
            </div>

            <button type="submit" className="btn cart-btn half-btn">
              ???? ?????? ?????????? ??????????????
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default EditUserScreen;
