import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, deleteFromCart } from "../actions/cartActions";

function CartScreen(props) {
  const { id } = useParams();
  const params = new URLSearchParams(props.location.search);
  const qty = params.get("qty") || 1;
  const dispatch = useDispatch();
  const itemInCart = useSelector((state) => state.cart);
  const { cartItems } = itemInCart;

  //maybe user just want to see the cart and not adding anything to it so check if we have any id
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  const deleteHandler = (productID) => {
    dispatch(deleteFromCart(productID));
  };

  const changeQty = (productID, productQty, action) => {
    const numberQty = parseInt(productQty);
    if (action === "inc") {
      dispatch(addToCart(productID, numberQty + 1));
    } else if (action === "dec" && numberQty > 1) {
      dispatch(addToCart(productID, numberQty - 1));
    }
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const goingBack = () => {
    props.history.goBack();
  };
  return (
    <>
      <button className="btn back-btn" onClick={goingBack}>
        بازگشت به صفحه محصول
      </button>
      <div className="flex-row top ">
        <div className="col-1">
          {cartItems.length > 0 ? (
            <div className="feature product-bg">
              <ul>
                <li className="card-flex">
                  <div className="direction">
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.qty,
                      0
                    )}
                    تومان
                  </div>
                  <div>مجموع قیمت سبد خرید</div>
                </li>
                <div className="line"></div>
                <li className="card-flex">
                  <div className="price">
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.qty,
                      0
                    )}
                    تومان
                  </div>
                  <div>مبلغ قابل پرداخت</div>
                </li>
                <div className="line"></div>
                <li>
                  <button
                    className="btn cart-btn block"
                    onClick={checkoutHandler}
                  >
                    ادامه خرید
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <> </>
          )}
          <div className="banner-2">
            <img src="/baners/Banner1.png" alt="بنر پست رایگان" />
          </div>
        </div>
        <div className="col-2 product-bg">
          <div className="block flex-row center bigText">
            {cartItems.length > 0 && (
              <span className="cart-circle-header">{cartItems.length}</span>
            )}
            سبد خرید
          </div>

          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <div key={item.product}>
                  <div className="row">
                    <div>
                      <button
                        type="button"
                        className="delete-custom"
                        onClick={() => deleteHandler(item.product)}
                      >
                        <i className="fas fa-times "></i>
                      </button>
                    </div>
                    <div className="line"></div>
                  </div>
                  <li className="row item">
                    <div className="row feature">
                      <span>تومان</span>
                      {item.price}
                    </div>
                    <div className="row feature">
                      <button
                        className="stock-btn small"
                        onClick={() => {
                          changeQty(item.product, item.qty, "dec");
                        }}
                      >
                        -
                      </button>
                      <span> {item.qty}</span>
                      <button
                        className="stock-btn small"
                        onClick={() => {
                          changeQty(item.product, item.qty, "inc");
                        }}
                      >
                        +
                      </button>
                      <div> :تعداد </div>
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
                </div>
              ))}
            </ul>
          ) : (
            <div className="feature">.سبد خرید شما خالی است </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartScreen;
