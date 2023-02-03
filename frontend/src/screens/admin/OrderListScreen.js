import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../../actions/orderActions";
import { convertDate, convertMongoDate } from "../../utils";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function OrderListScreen() {
  const { userInfo } = useSelector((state) => state.signin);
  const [deleteState, setDeleteState] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [orderState, setOrderState] = useState({
    loading: false,
    error: false,
    orders: [],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [orderPerPage] = useState(10);
  const [orderCounts, setOrderCount] = useState(0);

  const getOrders = useCallback(
    async (page) => {
      setOrderState((prev) => {
        return { ...prev, loading: true };
      });
      const result = await getAllOrders(page, orderPerPage);
      if (result.orders) {
        setOrderState((prev) => {
          return {
            ...prev,
            loading: false,
            orders: result.orders,
          };
        });
        setOrderCount(result.counts);
      } else {
        setOrderState((prev) => {
          return { ...prev, loading: false, error: result.error };
        });
      }
    },
    [orderPerPage]
  );

  // const dispatch = useDispatch();
  useEffect(() => {
    getOrders(1);
  }, [getOrders]);

  const deleteHandler = async (orderId) => {
    if (window.confirm(`آیا قصد حذف سفارش ${orderId} را دارید؟`)) {
      if (window.confirm("مطمئنی؟")) {
        setDeleteState({ ...deleteState, loading: true });
        const result = await deleteOrder(orderId, userInfo);
        if (result.order) {
          setDeleteState({ ...deleteState, loading: false, success: true });
          getOrders(1);
        } else {
          setDeleteState({
            ...deleteState,
            loading: false,
            success: false,
            error: result.error,
          });
        }
      }
    }
  };
  const numberOfAvailablePages = Math.ceil(orderCounts / orderPerPage);

  const changePage = (input) => {
    if (input === "next" && currentPage < numberOfAvailablePages) {
      getOrders(currentPage + 1);
      setcurrentPage((prev) => prev + 1);
    } else if (input === "prev" && currentPage > 1) {
      getOrders(currentPage - 1);
      setcurrentPage((prev) => prev - 1);
    } else if (input > currentPage && input <= orderCounts) {
      getOrders(input);
      setcurrentPage(input);
    } else if (input < currentPage && input > 0) {
      getOrders(input);
      setcurrentPage(input);
    }
    window.scrollTo(0, 0);
  };
  return (
    <>
      {" "}
      <div className="block flex-row center bigText">سفارشات</div>
      {orderState.loading ? (
        <LoadingBox></LoadingBox>
      ) : orderState.error ? (
        <MessageBox variant="danger">{orderState.error}</MessageBox>
      ) : (
        <>
          {deleteState.loading && <LoadingBox></LoadingBox>}
          {deleteState.error && (
            <MessageBox variant="danger">{deleteState.error}</MessageBox>
          )}
          {orderState.orders.length > 0 ? (
            <>
              <div className="wrapper">
                <div className="table">
                  <div className="table-row header">
                    <div className="cell">شناسه</div>
                    <div className="cell">کد پیگیری</div>
                    <div className="cell">تاریخ ثبت</div>
                    <div className="cell">مبلغ کل</div>
                    <div className="cell">تاریخ پرداخت</div>
                    <div className="cell">تاریخ ارسال</div>
                    <div className="cell">پیام ارسال</div>

                    <div className="cell">روش پرداخت</div>
                    <div className="cell"> وزن سفارش</div>
                    <div className="cell">آدرس </div>
                    <div className="cell">محصولات </div>

                    <div className="cell">عملیات ها</div>
                  </div>

                  {orderState.orders.map((order) => (
                    <div key={order._id} className="table-row">
                      <div className="cell" data-title="شناسه">
                        {order._id}
                      </div>
                      <div className="cell" data-title="شناسه">
                        {order.trackingCode}
                      </div>

                      <div className="cell" data-title="تاریخ ثبت">
                        {convertMongoDate(order.createdAt)}
                      </div>
                      <div className="cell" data-title="مبلغ کل">
                        {order.totalPrice}
                      </div>
                      <div className="cell" data-title="تاریخ پرداخت">
                        {order.paidAt
                          ? convertDate(order.paidAt)
                          : "پرداخت نشده"}
                      </div>
                      <div className="cell" data-title="تاریخ ارسال">
                        {order.deliveredAt
                          ? convertDate(order.deliveredAt)
                          : "ارسال نشده"}
                      </div>
                      <div className="cell" data-title="پیام ارسال">
                        {order.deliverMessage
                          ? order.deliverMessage
                          : "ارسال نشده"}
                      </div>
                      <div className="cell" data-title="روش پرداخت">
                        {order.paymentMethod}
                      </div>
                      <div className="cell" data-title="وزن سفارش ">
                        {order.totalWeight}
                      </div>
                      <div className="cell" data-title="آدرس">
                        {order.shippingAddress.state}
                        {order.shippingAddress.city}
                        {order.shippingAddress.phoneNumber}
                      </div>

                      <div className="cell" data-title="محصولات ">
                        {order.productItems.map((item) => item.name)}
                      </div>
                      <div className="cell" data-title="جزئیات سفارش">
                        <Link
                          to={`/adminOrder/${order._id}`}
                          className="table-btn "
                        >
                          مشاهده
                        </Link>
                        <button
                          className="table-btn "
                          onClick={() => deleteHandler(order._id)}
                        >
                          حذف{" "}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ul className="pagination">
                  <li>
                    <button
                      className="btn page-btn"
                      onClick={() => changePage("prev")}
                    >
                      <i className="fas fa-backward"></i>
                    </button>
                  </li>
                  {currentPage - 2 > 0 && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage - 2)}
                      >
                        {currentPage - 2}
                      </button>
                    </li>
                  )}
                  {currentPage - 1 > 0 && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </button>
                    </li>
                  )}
                  <li>
                    <button className="btn main-page-btn">{currentPage}</button>
                  </li>
                  {currentPage + 1 <= numberOfAvailablePages && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </button>
                    </li>
                  )}
                  {currentPage + 2 <= numberOfAvailablePages && (
                    <li>
                      <button
                        className="btn page-btn"
                        onClick={() => changePage(currentPage + 2)}
                      >
                        {currentPage + 2}
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="btn page-btn"
                      onClick={() => changePage("next")}
                    >
                      <i className="fas fa-forward"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <MessageBox>هنوز سفارشی ثبت نشده است</MessageBox>
          )}
        </>
      )}
    </>
  );
}
