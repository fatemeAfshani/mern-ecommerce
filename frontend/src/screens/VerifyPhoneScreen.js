import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { verification } from "../actions/userActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function VerifyPhoneScreen(props) {
  const { phone } = useParams();
  const [code, setCode] = useState("");

  const dispatch = useDispatch();
  const { userInfo, error, loading } = useSelector((state) => state.signin);

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(verification(phone, code));
  };
  const { search } = useLocation();
  const redirect = search ? `/${search.split("=")[1]}` : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <>
      <CheckoutSteps step1></CheckoutSteps>
      {loading && <LoadingBox></LoadingBox>}
      <form className="form" onSubmit={formHandler}>
        <div>
          <h2>ورود/ثبت نام</h2>
        </div>

        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="verification">وارد کردن کد تایید</label>
          <input
            type="number"
            id="verification"
            name="verification"
            placeholder="لطفا کد ارسال شده راوارد کنید"
            required
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="right">
          پیام حاوی کد حداکثر تا ۲ دقیقه دیگر ارسال خواهد شد
        </div>
        <div className="right">
          پیامی دریافت نکرده اید؟
          <Link to={`/signin?redirect=${redirect}`} className="link">
            برای ارسال مجدد کلیک کنید
          </Link>
        </div>

        <button type="submit" className="btn cart-btn half-btn">
          تایید
        </button>
      </form>
    </>
  );
}
