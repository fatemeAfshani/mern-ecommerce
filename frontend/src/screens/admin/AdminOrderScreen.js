import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deliverOrder, getOrderForAdmin } from "../../actions/orderActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { convertDate } from "../../utils";

function AdminOrderScreen() {
  const { id } = useParams();

  const { loading, error, order } = useSelector(
    (state) => state.orderDetailForAdmin
  );
  const [deliverOrderState, setDeliverOrder] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const { userInfo } = useSelector((state) => state.signin);

  const deliverOrderHandler = async () => {
    const deliverMessage = document.getElementById("message").value;
    setDeliverOrder({ ...deliverOrderState, loading: true });
    const result = await deliverOrder(order._id, deliverMessage, userInfo);
    if (result.order) {
      setDeliverOrder({ ...deliverOrderState, loading: false, success: true });
    } else {
      setDeliverOrder({
        ...deliverOrderState,
        loading: false,
        success: false,
        error: result.error,
      });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (id || deliverOrderState.success) {
      dispatch(getOrderForAdmin(id));
    }
  }, [dispatch, id, deliverOrderState.success]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {deliverOrderState.loading && <LoadingBox></LoadingBox>}
          {deliverOrderState.error && (
            <MessageBox variant="danger">{deliverOrderState.error}</MessageBox>
          )}
          <h2 className="right ">
            <span> {order.trackingCode}</span>
            <span> سفارش با شماره پیگیری</span>
          </h2>
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
                  <div>هزینه پست</div>
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
                  {order.paymentMethod === "online" ? (
                    <div>‌پرداخت هزینه به صورت آنلاین</div>
                  ) : (
                    <div>پرداخت در محل</div>
                  )}
                </li>
              </ul>
            </div>
            <div className="col-2">
              <div className=" feature product-bg">
                <div className="block flex-row center midText">
                  اطلاعات کاربر
                </div>
                <div className="feature">
                  <strong> : نام و نام خانوادگی</strong>
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
                      </span>{" "}
                    </MessageBox>
                  </div>
                ) : (
                  <div>
                    <MessageBox variant="danger" right="yes">
                      سفارش مورد نظر هنوز ارسال نشده است
                    </MessageBox>
                  </div>
                )}
                {!order.isDelivered && userInfo && userInfo.isAdmin ? (
                  <form className="form">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      placeholder="پیام ارسال را وارد کنید"
                    />
                    <button
                      className="btn cart-btn feature"
                      onClick={() => deliverOrderHandler(order._id)}
                    >
                      ارسال سفارش
                    </button>
                  </form>
                ) : (
                  <></>
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
                      هزینه سفارش پرداخت شده است{" "}
                    </MessageBox>{" "}
                    <span>{convertDate(order.paidAt)}</span>{" "}
                  </div>
                ) : (
                  <div>
                    <MessageBox right="yes" variant="danger">
                      هزینه سفارش پرداخت نشده است
                    </MessageBox>
                  </div>
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

export default AdminOrderScreen;
