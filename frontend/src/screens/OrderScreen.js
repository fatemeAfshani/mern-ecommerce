import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cancelOrder, getOrder } from "../actions/orderActions";
import { convertDate } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { paymentRequest } from "../actions/paymentActions";

function OrderScreen() {
  //order id
  const { id } = useParams();

  const { order, loading, error } = useSelector((state) => state.orderDetail);

  const [cancelOrderState, setCancelOrder] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const [requestPaymentState, setRequestPayment] = useState({
    loading: false,
    success: "",
    error: false,
  });

  const clickHandler = async () => {
    //paying
    //send amout of money and callback screen

    setRequestPayment({ ...requestPaymentState, loading: true });
    const result = await paymentRequest(
      order.totalPrice,
      `https://sample.ir/payment/${id}/${order.totalPrice}`
    );
    if (result.authority) {
      setRequestPayment({
        ...requestPaymentState,
        loading: false,
        success: result.authority,
      });
    } else {
      setRequestPayment({
        ...requestPaymentState,
        loading: false,
        success: false,
        error: result.error,
      });
    }
  };

  const cancelOrderHandler = async (id) => {
    setCancelOrder({ ...cancelOrderState, loading: true });
    const result = await cancelOrder(id);
    if (result.order) {
      setCancelOrder({ ...cancelOrderState, loading: false, success: true });
    } else {
      setCancelOrder({
        ...cancelOrderState,
        loading: false,
        success: false,
        error: result.error,
      });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(id));
    if (requestPaymentState.success) {
      window.location.href = requestPaymentState.success;
    }
  }, [dispatch, id, requestPaymentState]);

  return (
    <>
      {loading || cancelOrderState.loading || requestPaymentState.loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : cancelOrderState.error ? (
        <MessageBox variant="danger">{cancelOrderState.error}</MessageBox>
      ) : requestPaymentState.error ? (
        <MessageBox variant="danger">{requestPaymentState.error}</MessageBox>
      ) : cancelOrderState.success ? (
        <MessageBox variant="info">سفارش شما کنسل شد</MessageBox>
      ) : (
        <>
          <h2 className="right ">
            <span> {order.trackingCode}</span>
            <span> سفارش با شماره پیگیری</span>
          </h2>
          <MessageBox variant="warning" right="yes">
            لطفا شماره پیگیری را نزد خود نگهدارید و در زمان پیگیری سفارش از آن
            استفاده کنید
          </MessageBox>
          <div className="flex-row top">
            <div className="col-1 feature product-bg">
              <ul>
                <li className="card-flex">
                  <div className="direction">
                    {order.itemsPrice}
                    تومان
                  </div>
                  <div>مجموع قیمت سبد خرید</div>
                </li>
                <div className="line"></div>
                <li className="card-flex">
                  <div className="direction">`{order.postPrice} تومان`</div>
                  <div>هزینه ارسال</div>
                </li>
                <div className="line"></div>
                <li className="card-flex">
                  <div className="price">
                    {order.totalPrice}
                    تومان
                  </div>
                  <div>مبلغ قابل پرداخت</div>
                </li>
                <div className="line"></div>
                <li>
                  {order.paymentMethod === "online" &&
                  !order.isPaid &&
                  !order.isCanceled ? (
                    <button
                      className="btn cart-btn block"
                      // onClick={clickHandler}
                    >
                      تست
                    </button>
                  
                  ) : order.paymentMethod === "online" && order.isPaid ? (
                    <div>پرداخت شده</div>
                  ) : order.isCanceled ? (
                    <div>سفارش کنسل شده است</div>
                  ) : (
                    <div>پرداخت در محل</div>
                  )}
                </li>
              </ul>
            </div>
            <div className="col-2">
              <div className=" feature product-bg">
                <div className="block flex-row center midText">
                  فاکتور سفارش
                </div>
                <div className="feature">
                  <strong> :فروشنده</strong>
                  <br />
                  فروشگاهی اینترنتی 
                </div>
                <div className="feature">
                  <strong> : نام و نام خانوادگی خریدار</strong>
                  <br />
                  {order.shippingAddress.fullname}
                </div>
                <div className="feature">
                  <strong> :شماره تماس</strong> <br />
                  {order.shippingAddress.phoneNumber}
                </div>
                <div className="feature">
                  <strong> :آدرس</strong> <br />
                  {order.shippingAddress.state},{order.shippingAddress.city},
                  {order.shippingAddress.fullAddress}
                </div>
                <div className="feature">
                  <strong> :کد پستی</strong>
                  <br />
                  {order.shippingAddress.postalCode}
                </div>

                {order.isDelivered ? (
                  <div>
                    <MessageBox right="yes">
                      <div className="inline-block">
                        {convertDate(order.deliveredAt)}
                      </div>{" "}
                      <span>
                        {order.deliverMessage
                          ? order.deliverMessage
                          : "سفارش شما ارسال شده است"}{" "}
                      </span>
                    </MessageBox>
                  </div>
                ) : (
                  <div>
                    <MessageBox variant="danger" right="yes">
                      سفارش مورد نظر هنوز ارسال نشده است
                    </MessageBox>
                  </div>
                )}

                <div className="feature">
                  <strong> :روش پرداخت </strong>
                  <br />
                  {order.paymentMethod === "online"
                    ? "روش پرداخت آنلاین"
                    : "پرداخت در محل"}
                </div>
                {order.isPaid ? (
                  <div>
                    <MessageBox right="yes">
                      <div className="inline-block">
                        {convertDate(order.paidAt)}
                      </div>{" "}
                      <span>هزینه سفارش پرداخت شده است</span>
                    </MessageBox>
                  </div>
                ) : (
                  <div>
                    <MessageBox right="yes" variant="danger">
                      هزینه سفارش پرداخت نشده است
                    </MessageBox>
                  </div>
                )}

                <div className="feature">
                  <span className="alerty">
                    {order.paymentMethod === "offline" &&
                      "متن تستی"}
                  </span>
                </div>
  
                <div></div>
                {!order.isDelivered && !order.isPaid && !order.isCanceled ? (
                  <button
                    className="btn cart-btn feature"
                    onClick={() => cancelOrderHandler(order._id)}
                  >
                    کنسل کردن سفارش
                  </button>
                ) : order.isCanceled ? (
                  <div style={{ marginTop: "1rem" }}>
                    {" "}
                    <MessageBox right="yes" variant="info">
                      سفارش کنسل شده است
                    </MessageBox>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="feature product-bg">
                <div className="block flex-row center bigText"> سبد خرید</div>
                <ul>
                  {order.productItems.map((item) => (
                    <div key={item.product}>
                      <li className="row item">
                        <div className=" row feature">
                          <span>
                            {" "}
                            {item.qty} ×‌ {item.price} = {item.price * item.qty}
                          </span>
                        </div>
                        <div className=" feature">
                          <Link
                            to={`/products/${item.searchName}?id=${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          <Link
                            to={`/products/${item.searchName}?id=${item.product}`}
                          >
                            <img
                              className="small "
                              src={item.image}
                              alt={item.name}
                            />
                          </Link>
                        </div>
                      </li>
                      <div className="line"></div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderScreen;
