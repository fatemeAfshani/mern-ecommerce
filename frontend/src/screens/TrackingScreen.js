import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function TrackingScreen(props) {
  const [trackOrder, setTrackOrder] = useState({
    loading: false,
    error: false,
    success: false,
    orderId: "",
  });
  const [trackingCode, setTrackingCode] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    setTrackOrder({ ...trackOrder, loading: true });
    try {
      const { data } = await axios.get(`/api/orders/track/${trackingCode}`);

      setTrackOrder({
        ...trackingCode,
        loading: false,
        success: true,
        orderId: data.orderId,
      });
    } catch (error) {
      const errorMsg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setTrackOrder({ ...trackOrder, loading: false, error: errorMsg });
    }
  };

  useEffect(() => {
    if (trackOrder.success) {
      props.history.push(`/order/${trackOrder.orderId}`);
    }
  }, [trackOrder.success, props.history, trackOrder.orderId]);
  return (
    <div>
      <div className="block flex-row center bigText"> پیگیری سفارشات</div>
      {trackOrder.loading ? (
        <LoadingBox></LoadingBox>
      ) : trackOrder.error ? (
        <MessageBox variant="danger">{trackOrder.error}</MessageBox>
      ) : (
        <></>
      )}
      <div className="flex-row top">
        <div className="col-2 feature product-bg">
          <div className="block flex-row center bigText">ورود</div>
          <p className="track-p">
            {" "}
            با ورود به بخش کاربری خود سابقه سفارشات خود را مشاهده کنید
          </p>

          <Link
            to="/signin?redirect=orderHistory"
            className="btn cart-btn half-btn "
          >
            {" "}
            مشاهده سابقه سفارشات
          </Link>
        </div>
        <div className="col-2 feature product-bg">
          <div className="block flex-row center bigText">شماره پیگیری</div>
          <p className="direction track-p">
            لطفا شماره پیگیری ۶ رقمی سفارش خود را در کادر زیر وارد کنید.
          </p>
          <form className="form" onSubmit={formHandler}>
            <div>
              <label htmlFor="trackingCode">شماره پیگیری</label>
              <input
                type="number"
                id="trackingCode"
                name="trackingCode"
                placeholder="شماره  پیگیری ۶ رقمی را وارد کنید"
                required
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>

            <button type="submit" className="btn cart-btn half-btn">
              جستجو
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
