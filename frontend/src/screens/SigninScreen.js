import React, { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useLocation } from "react-router-dom";
import { signin } from "../actions/userActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";

export default function SigninScreen(props) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const { userInfo } = useSelector((state) => state.signin);

  const [signinState, setSigninState] = useState({
    loading: false,
    error: false,
    userData: "",
  });

  const formHandler = async (e) => {
    e.preventDefault();
    setSigninState({ ...signinState, loading: true });
    const result = await signin(phoneNumber);
    if (result.user) {
      setSigninState({ ...signinState, loading: false, userData: result.user });
    } else {
      setSigninState({ ...signinState, error: result.error });
    }
  };

  const { search } = useLocation();
  const redirect = search ? search : "/";
  const redirect2 = search ? search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect2);
    }
  }, [props.history, redirect2, userInfo]);

  useEffect(() => {
    if (signinState.userData) {
      props.history.push(
        `/verifyPhoneNumber/${signinState.userData}${redirect}`
      );
    }
  }, [signinState, props.history, redirect]);
  return (
    <>
      <CheckoutSteps step1></CheckoutSteps>
      {signinState.loading && <LoadingBox></LoadingBox>}
      <form className="form" onSubmit={formHandler}>
        <div>
          <h2>ورود/ثبت نام</h2>
        </div>

        {signinState.error && (
          <MessageBox variant="danger">{signinState.error}</MessageBox>
        )}

        <div>
          <label htmlFor="PhoneNumber">شماره تماس</label>
          <input
            type="number"
            id="PhoneNumber"
            name="PhoneNumber"
            placeholder="شماره خود را وارد کنید"
            aria-describedby="phoneNumberSmall"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <small id="phoneNumberSmall">
            لطفا شماره را به انگلیسی وارد کنید
          </small>
        </div>

        <button type="submit" className="btn cart-btn half-btn">
          ورود
        </button>
      </form>
    </>
  );
}
