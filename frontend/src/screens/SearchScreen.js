import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductCard from "../components/ProductCard";

export default function SearchScreen(props) {
  const { name = "all", category = "all" } = useParams();
  const [price, setPrice] = useState({ min: "0", max: "10000000" });
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("newest");
  const [filter, setFilter] = useState({
    loading: false,
    error: false,
  });
  const [categoryStuff, setCategory] = useState({
    cateory: [],
    children: [],
    error: "",
  });

  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage] = useState(10);
  const [productCounts, setProductCount] = useState(0);

  const filterSearch = useCallback(
    ({ page = "1" }) => {
      const productName = name !== "all" ? name : "";
      const prodcutCategory = category !== "all" ? category : "";
      setFilter({ loading: true });
      axios
        .get(
          `/api/products?name=${productName}&category=${prodcutCategory}&min=${price.min}&max=${price.max}&order=${order}&page=${page}&limit=${productPerPage}`
        )
        .then((res) => {
          setFilter({ loading: false, error: false });

          setProducts(res.data.products);

          setProductCount(res.data.counts);
          setcurrentPage(page);
        })
        .catch((err) => {
          setFilter({ loading: false, error: err.message });
        });

      axios
        .get(`/api/category/${category}`)
        .then(({ data }) => {
          setCategory({
            cateory: data.category.category.split("/"),
            children: data.children,
          });
        })
        .catch((error) => {
          setCategory({
            error:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        });
    },
    [name, category, productPerPage, order, price]
  );

  const formSubmit = (e) => {
    e.preventDefault();
    const min = e.target[0].value || 0;
    const max = e.target[1].value || 20000000;
    setPrice({ max, min });
  };

  useEffect(() => {
    filterSearch({ page: 1 });
    window.scrollTo(0, 0);
  }, [filterSearch]);

  const numberOfAvailablePages = Math.ceil(productCounts / productPerPage);

  const changePage = (input) => {
    if (input === "next" && currentPage < numberOfAvailablePages) {
      filterSearch({ page: currentPage + 1 });
    } else if (input === "prev" && currentPage > 1) {
      filterSearch({ page: currentPage - 1 });
    } else if (input > currentPage && input <= productCounts) {
      filterSearch({ page: input });
    } else if (input < currentPage && input > 0) {
      filterSearch({ page: input });
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      {filter.loading ? (
        <LoadingBox></LoadingBox>
      ) : filter.error ? (
        <MessageBox variant="danger">{filter.error}</MessageBox>
      ) : categoryStuff.error ? (
        <MessageBox variant="danger">{categoryStuff.error}</MessageBox>
      ) : (
        <>
          <div className="search-nav">
            <ul>
              {categoryStuff.cateory.map((cat, index) => {
                if (index === 0) {
                  return (
                    <li key={index}>
                      <Link to="/search/name/">فروشگاه اینترنتی </Link>
                      <i className="fas fa-angle-left"></i>{" "}
                    </li>
                  );
                } else if (index === categoryStuff.cateory.length - 1) {
                  return <li key={index}>{cat}</li>;
                } else {
                  return (
                    <li key={index}>
                      <Link to={cat}>{cat}</Link>
                      <i className="fas fa-angle-left"></i>{" "}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="flex-row  top">
            <ul className="col-3 background-bg">
              {products.length > 0 ? (
                <>
                  <div className=" flex-row center reverse">
                    {products.map((product) => {
                      return (
                        <ProductCard
                          key={product._id}
                          product={product}
                          history={props.history}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <ul className="pagination">
                      <li>
                        <button
                          className="btn search-page-btn"
                          onClick={() => changePage("prev")}
                        >
                          <i className="fas fa-backward"></i>
                        </button>
                      </li>
                      {currentPage - 2 > 0 && (
                        <li>
                          <button
                            className="btn search-page-btn"
                            onClick={() => changePage(currentPage - 2)}
                          >
                            {currentPage - 2}
                          </button>
                        </li>
                      )}
                      {currentPage - 1 > 0 && (
                        <li>
                          <button
                            className="btn search-page-btn"
                            onClick={() => changePage(currentPage - 1)}
                          >
                            {currentPage - 1}
                          </button>
                        </li>
                      )}
                      <li>
                        <button className="btn main-page-btn">
                          {currentPage}
                        </button>
                      </li>
                      {currentPage + 1 <= numberOfAvailablePages && (
                        <li>
                          <button
                            className="btn search-page-btn"
                            onClick={() => changePage(currentPage + 1)}
                          >
                            {currentPage + 1}
                          </button>
                        </li>
                      )}
                      {currentPage + 2 <= numberOfAvailablePages && (
                        <li>
                          <button
                            className="btn search-page-btn"
                            onClick={() => changePage(currentPage + 2)}
                          >
                            {currentPage + 2}
                          </button>
                        </li>
                      )}
                      <li>
                        <button
                          className="btn search-page-btn"
                          onClick={() => changePage("next")}
                        >
                          <i className="fas fa-forward"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <li className="not-found"> متاسفانه محصولی یافت نشد</li>
              )}
            </ul>
            <div className=" col-1 ">
              <div className=" product-bg search-order">
                <h4>دسته بندی</h4>
                <ul>
                  {categoryStuff.children.map((child) => {
                    return (
                      <li key={child._id}>
                        <Link to={`/search/category/${child.name}`}>
                          {child.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className=" product-bg">
                <form
                  className="search-slidebar"
                  onSubmit={(e) => formSubmit(e)}
                >
                  <h4>فیلتر بر اساس قیمت</h4>

                  <div>
                    <label htmlFor="min">قیمت از</label>
                    <input
                      type="number"
                      id="min"
                      name="min"
                      placeholder={price.min}
                    />
                  </div>

                  <div>
                    <label htmlFor="max">قیمت تا</label>
                    <input
                      type="number"
                      id="max"
                      name="max"
                      placeholder={price.max}
                    />
                  </div>

                  <button type="submit" className="btn  cart-btn">
                    فیلتر
                  </button>
                </form>
              </div>
              <div className=" product-bg search-order">
                <h4>ترتیب بر اساس</h4>
                <ul>
                  <li key="newest">
                    <button
                      className="filter-btn"
                      onClick={() => setOrder("newest")}
                    >
                      جدیدترین
                    </button>
                  </li>
                  <li key="highest">
                    <button
                      className="filter-btn"
                      onClick={() => setOrder("highest")}
                    >
                      گرانترین
                    </button>
                  </li>
                  <li key="lowest">
                    <button
                      className="filter-btn"
                      onClick={() => setOrder("lowest")}
                    >
                      ارزانترین
                    </button>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
