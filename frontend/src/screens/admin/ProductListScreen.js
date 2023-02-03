import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function ProductListScreen(props) {
  const [deleteState, setDeleteProduct] = useState({
    loading: false,
    success: false,
    error: "",
  });
  // const { loading, error, products } = useSelector(
  //   (state) => state.productList
  // );
  const [createState, setCreateState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const [productState, setProductState] = useState({
    loading: false,
    error: false,
    products: [],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage] = useState(10);
  const [productCounts, setProductCount] = useState(0);

  const { userInfo } = useSelector((state) => state.signin);
  // const dispatch = useDispatch();

  const getProducts = useCallback(
    async (page) => {
      setProductState((prev) => {
        return { ...prev, loading: true };
      });
      const result = await listProducts(page, productPerPage);
      if (result.products) {
        setProductState((prev) => {
          return {
            ...prev,
            loading: false,
            products: result.products,
          };
        });
        setProductCount(result.counts);
      } else {
        setProductState((prev) => {
          return { ...prev, loading: false, error: result.error };
        });
      }
    },
    [productPerPage]
  );

  const deleteHandler = async (productId) => {
    setDeleteProduct({ ...deleteState, loading: true });
    const result = await deleteProduct(productId, userInfo);

    if (result.product) {
      setDeleteProduct({ ...deleteState, loading: false, success: true });
      getProducts(1);
    } else {
      setDeleteProduct({
        ...deleteState,
        loading: false,
        success: false,
        error: result.error,
      });
    }
  };

  const createNewProduct = async () => {
    setCreateState({ ...createState, loading: true });
    const { product, error } = await createProduct(userInfo);
    if (product) {
      props.history.push(`/products/${product._id}/edit`);
    } else {
      setCreateState({
        ...createState,
        loading: false,
        success: false,
        error,
      });
    }
  };

  useEffect(() => {
    getProducts(1);
  }, [getProducts]);

  const numberOfAvailablePages = Math.ceil(productCounts / productPerPage);

  const changePage = (input) => {
    if (input === "next" && currentPage < numberOfAvailablePages) {
      getProducts(currentPage + 1);
      setcurrentPage((prev) => prev + 1);
    } else if (input === "prev" && currentPage > 1) {
      getProducts(currentPage - 1);
      setcurrentPage((prev) => prev - 1);
    } else if (input > currentPage && input <= productCounts) {
      getProducts(input);
      setcurrentPage(input);
    } else if (input < currentPage && input > 0) {
      getProducts(input);
      setcurrentPage(input);
    }
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="flex-row ">
        <button className="btn cart-btn" onClick={createNewProduct}>
          {" "}
          افزودن محصول جدید
        </button>
        <h1 className="bigText">محصولات</h1>
      </div>
      {createState.loading && <LoadingBox></LoadingBox>}
      {createState.error && (
        <MessageBox variant="danger">{createState.error}</MessageBox>
      )}
      {deleteState.loading && <LoadingBox></LoadingBox>}
      {deleteState.error && (
        <MessageBox variant="danger">{deleteProduct.error}</MessageBox>
      )}
      {productState.loading ? (
        <LoadingBox></LoadingBox>
      ) : productState.error ? (
        <MessageBox variant="danger">{productState.error}</MessageBox>
      ) : (
        <>
          {productState.products.length > 0 ? (
            <>
              <div className="wrapper">
                <div className="table">
                  <div className="table-row header">
                    <div className="cell">شناسه</div>
                    <div className="cell">نام محصول</div>
                    <div className="cell">دسته بندی</div>
                    <div className="cell">قیمت</div>
                    <div className="cell">موجود</div>
                    <div className="cell">کد</div>
                    <div className="cell">وزن</div>
                    <div className="cell">ویژگی ها</div>
                    <div className="cell">عملیات ها </div>
                  </div>

                  {productState.products.map((product) => (
                    <div key={product._id} className="table-row">
                      <div className="cell" data-title="شناسه">
                        {product._id}
                      </div>
                      <div className="cell" data-title="نام محصول">
                        {product.name}
                      </div>
                      <div className="cell" data-title="دسته بندی">
                        {product.category}
                      </div>
                      <div className="cell" data-title="قیمت">
                        {product.price}
                      </div>
                      <div className="cell" data-title="موجود">
                        {product.InStock ? "موجود" : "ناموجود"}
                      </div>
                      <div className="cell" data-title="کد">
                        {product.code}
                      </div>
                      <div className="cell" data-title="وزن">
                        {product.weight}
                      </div>
                      <div className="cell" data-title="ویژگی ها">
                        {product.features}
                      </div>
                      <div className="cell" data-title="عملیات ها ">
                        <Link to={`/products/${product._id}/edit`}>ویرایش</Link>
                        <button
                          className="table-btn "
                          onClick={() => deleteHandler(product._id)}
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
            <MessageBox>هنوز محصولی ثبت نشده است</MessageBox>
          )}
        </>
      )}
    </>
  );
}
