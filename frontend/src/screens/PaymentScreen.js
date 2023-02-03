import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import queryString from "query-string";
import { paymentVerify, payOrder } from "../actions/paymentActions";

function PaymentScreen(props) {
  //input of this url should be the order id , payment amout, payment authority to verify the payment
  const { id, amount } = useParams();
  const { Authority } = queryString.parse(props.location.search);

  const [paymentStatus, setPaymentStatus] = useState({
    loading: false,
    error: false,
    id: "",
  });

  const [payOrderError, setPayOrderError] = useState(false);

  const verification = useCallback(async () => {
    setPaymentStatus((prev) => {
      return { ...prev, loading: true };
    });
    const result = await paymentVerify(amount, Authority);
    if (result.paymentId) {
      setPaymentStatus((prev) => {
        return {
          ...prev,
          loading: false,
          id: result.paymentId,
        };
      });
    } else {
      setPaymentStatus((prev) => {
        return { ...prev, loading: false, error: result.error };
      });
    }
  }, [amount, Authority]);

  useEffect(() => {
    verification();
  }, [verification]);

  //if payment was successfull we should update database
  //send user to order screen
  const clickHandler = async () => {
    if (!paymentStatus.error && paymentStatus.id) {
      const result = await payOrder(id, paymentStatus.id);
      if (result.order) {
        props.history.push(`/order/${id}`);
      } else {
        setPayOrderError(result.message);
      }
    } else {
      props.history.push(`/order/${id}`);
    }
  };

  return (
    <div className="form">
      <div>
        <h2>وضعیت پرداخت</h2>
      </div>
      {paymentStatus.loading ? (
        <LoadingBox></LoadingBox>
      ) : paymentStatus.error ? (
        <MessageBox variant="danger">
          {paymentStatus.error} در صورت عدم بازگشت وجه حداکثر تا ۲۴ ساعت به حساب
          شما با پشتیبانی تماس بگیرید{" "}
        </MessageBox>
      ) : payOrderError ? (
        <MessageBox variant="danger">{payOrderError}</MessageBox>
      ) : (
        <>
          <p>پرداخت با موفقیت با شناسه پرداخت {paymentStatus.id} انجام شد</p>
          <p>.با تشکر از خرید شما، سفارش در اسرع وقت تهیه و ارسال خواهد شد </p>
        </>
      )}
      <button className="btn cart-btn half-btn" onClick={clickHandler}>
        ادامه
      </button>
    </div>
  );
}

export default PaymentScreen;
