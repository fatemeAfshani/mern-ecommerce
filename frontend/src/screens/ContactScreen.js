import axios from "axios";
import React, { useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ContactScreen() {
  const [comment, setComment] = useState({ name: "", comment: "" });
  const [sendComment, setSendComment] = useState({
    loading: false,
    error: "",
  });

  const changeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setComment({ ...comment, [name]: value });
  };
  const formHandler = (e) => {
    setSendComment({ loading: true });
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/comments/contact",
      data: {
        name: comment.name,
        comment: comment.comment,
      },
    })
      .then((res) => {
        setSendComment({ loading: false, error: false });
        alert("نظر شما ارسال شد");
      })
      .catch((err) => {
        setSendComment({ loading: false, error: err.message });
      });
  };

  return (
    <div>
      <div className="block flex-row center bigText"> اطلاعات تماس</div>
      <ul className="direction contact">
        <li>
          <p>آدرس </p>
          <div>
            <span>
              <i className="fas fa-map-marked-alt margin-left"></i>
             آدرس تستی
            </span>
          </div>
        </li>

        <li>
          <p>شماره تماس</p>
          <div>
            {" "}
            <i className="fas fa-phone-square  margin-left"></i>
            09123456789
          </div>
        </li>

        <li>
          <p>ایمیل</p>
          <div>
            {" "}
            <i className="fas fa-phone-square  margin-left"></i>
            fatemeh.afshani78@gmail.com
          </div>
        </li>
      </ul>
      <form className="content-form" onSubmit={formHandler}>
        {sendComment.loading && <LoadingBox></LoadingBox>}
        {sendComment.error && <MessageBox>{sendComment.error}</MessageBox>}
        <h3>ارسال نظر یا شکایت</h3>
        <div>
          <label htmlFor="name">نام</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="نام"
            required
            value={comment.name}
            onChange={changeHandle}
          />
        </div>

        <div>
          {" "}
          <label htmlFor="comment">ثبت نظر یا شکایات</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="نظر خود را بنویسید"
            required
            value={comment.comment}
            onChange={changeHandle}
          ></textarea>
        </div>

        <button type="submit" className="btn cart-btn">
          ارسال
        </button>
      </form>
    </div>
  );
}
