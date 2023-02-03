import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertMongoDate, convertDate } from "../utils";

function OrderHistory() {
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
      const result = await getMyOrders(page, orderPerPage);
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

  useEffect(() => {
    getOrders(1);
  }, [getOrders]);

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
      <div className="block flex-row center bigText">سفارشات</div>
      {orderState.loading ? (
        <LoadingBox></LoadingBox>
      ) : orderState.error ? (
        <MessageBox variant="danger">{orderState.error}</MessageBox>
      ) : (
        <>
          {orderState.orders.length > 0 ? (
            <>
              <div className="wrapper">
                <div className="table">
                  <div className="table-row header">
                    <div className="cell">کد پیگیری</div>
                    <div className="cell">تاریخ ثبت</div>
                    <div className="cell">مبلغ کل (تومان)</div>
                    <div className="cell">تاریخ پرداخت</div>
                    <div className="cell">تاریخ ارسال</div>
                    <div className="cell">جزئیات سفارش</div>
                  </div>

                  {orderState.orders.map((order) => (
                    <div key={order._id} className="table-row">
                      <div className="cell" data-title="کد پیگیری">
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
                      <div className="cell" data-title="جزئیات سفارش">
                        <Link to={`/order/${order._id}`} className="table-btn ">
                          مشاهده
                        </Link>
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

export default OrderHistory;
