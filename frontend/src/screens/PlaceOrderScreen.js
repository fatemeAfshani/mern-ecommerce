import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import { computingPostPrice } from "../postPrice";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signin);
  const [createOrderState, setCreateOrder] = useState({
    loading: false,
    error: "",
    success: false,
    order: {},
  });

  // const [error, setError] = useState("");

  // const [forwardMethod, setForwardMethod] = useState("");
  const toPrice = (num) => Number(num); //"1.123" > "1.12" > 1.12

  const cartItemsPrice = toPrice(
    cart.cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  );

  const cartItemsWeight = toPrice(
    cart.cartItems.reduce((total, item) => total + item.weight * item.qty, 0)
  );

  const itemsCount = cart.cartItems.reduce(
    (total, item) => total + parseInt(item.qty),
    0
  );

  function calculatePrice() {
    if (cartItemsPrice >= 990000) return toPrice(0);
    if (cart.paymentMethod === "offline") {
      return 39000;
    } else if (cart.shippingAddress.state === "تهران") {
      return 25000;
    } else return 30000;
    // const result = computingPostPrice(
    //   cart.shippingAddress.state,
    //   cartItemsWeight
    // );
    // if (result.error) {
    //   setError(result.error);
    // } else return toPrice(result.price);
  }

  let postPrice = calculatePrice();

  const totalPrice = toPrice(parseInt(cartItemsPrice) + parseInt(postPrice));

  const postText = postPrice === 0 ? "ارسال رایگان" : `${postPrice} تومان`;

  const sendUserBack = (address) => {
    props.history.push(address);
  };
  const dispatch = useDispatch();
  const clickHandler = async () => {
    const trackingCode = Math.floor(100000 + Math.random() * 900000);
    setCreateOrder({ ...createOrderState, loading: true });
    const result = await createOrder(
      {
        // forwardMethod,
        productItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        trackingCode,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cartItemsPrice,
        totalWeight: cartItemsWeight,
        postPrice,
        totalPrice,
      },

      dispatch
    );
    if (result.order) {
      setCreateOrder({
        ...createOrderState,
        loading: false,
        success: true,
        order: result.order,
      });
    } else {
      setCreateOrder({
        ...createOrderState,
        loading: false,
        error: result.error,
      });
    }
  };

  useEffect(() => {
    if (createOrderState.success) {
      props.history.push(`/order/${createOrderState.order._id}`);
    }
  }, [
    createOrderState.success,
    dispatch,
    createOrderState.order,
    props.history,
  ]);
  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="flex-row top">
        <div className="col-1">
          <div className=" feature product-bg">
            <ul>
              <li className="card-flex">
                <div>{itemsCount}</div>
                <div>تعداد محصولات </div>
              </li>
              <div className="line"></div>
              <li className="card-flex ">
                <div className="direction">
                  {cartItemsPrice}
                  تومان
                </div>
                <div>مجموع قیمت سبد خرید</div>
              </li>
              <div className="line"></div>
              <li className="card-flex">
                <div className="direction">{postText}</div>
                <div>هزینه ارسال</div>
              </li>
              <div className="line"></div>
              <li className="card-flex">
                <div className="price">
                  {totalPrice}
                  تومان
                </div>
                <div>مبلغ قابل پرداخت</div>
              </li>
              <div className="line"></div>
              <li>
                <button className="btn cart-btn block" onClick={clickHandler}>
                  تکمیل و ثبت سفارش
                </button>
              </li>
              <li>{createOrderState.loading && <LoadingBox></LoadingBox>}</li>
              <li>
                {createOrderState.error && (
                  <MessageBox variant="danger">
                    {createOrderState.error}
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
          <div className="banner-2">
            <img src="/baners/BannerErsal.jpg" alt="بنر ارسال سفارش " />
          </div>
        </div>
        <div className="col-2">
          <div className=" feature product-bg">
            <div className="block flex-row center midText">اطلاعات کاربر</div>
            <div className="feature ">
              <strong> : نام و نام خانوادگی</strong>
              <br />
              {cart.shippingAddress.fullname}
            </div>
            <div className="feature">
              <strong> :شماره تماس</strong> <br />
              {userInfo.phoneNumber}
            </div>
            <div className="feature">
              <strong> :آدرس</strong> <br />
              {cart.shippingAddress.state},{cart.shippingAddress.city},
              {cart.shippingAddress.fullAddress}
            </div>
            <div className="feature">
              <strong> :کد پستی</strong>
              <br />
              {cart.shippingAddress.postalCode}
            </div>

            <div>
              <button
                className="btn cart-btn feature"
                onClick={() => sendUserBack("/shipping")}
              >
                تغییر اطلاعات
              </button>
            </div>
          </div>
          <div className="feature product-bg">
            <div className="block flex-row center midText"> سبد خرید</div>
            <ul>
              {cart.cartItems.map((item) => (
                <div key={item.product}>
                  <li className="row item">
                    <div className=" row feature">
                      <span>
                        {" "}
                        {item.qty} ×‌ {item.price} = {item.price * item.qty}
                      </span>
                    </div>
                    <div className=" feature">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>

                    <div>
                      <Link to={`/products/${item.product}`}>
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
  );
}

export default PlaceOrderScreen;
