import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, reliatedProducts } from "../actions/productActions";
import MyImageGallery from "../components/ImageGallery";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductSlider from "../components/ProductSlider";
import { convertDate } from "../utils";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  // const { searchName } = usePrams();
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const {
    loading: relaitedLoading,
    error: relaitedError,
    relaited,
  } = useSelector((state) => state.relaitedProducts);

  const [sendComment, setSendComment] = useState({
    name: "",
    comment: "",
    loading: false,
    error: false,
    success: false,
  });

  const [commentState, setCommentState] = useState({
    loading: false,
    error: false,
    comments: [],
  });

  const getComments = useCallback((id) => {
    setCommentState({ loading: true });
    axios
      .get(`/api/comments/${id}`)
      .then(({ data }) => {
        setCommentState({
          loading: false,
          comments: data,
        });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setCommentState({ loading: false, error: err });
      });
  }, []);

  useEffect(() => {
    dispatch(detailProduct(id));
    dispatch(reliatedProducts(id));
    getComments(id);
  }, [dispatch, id, getComments]);

  const checkQty = () => {
    if (qty < 1) {
      setQty(1);
    }
  };

  useEffect(() => {
    checkQty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${id}?qty=${qty}`);
  };

  let images = [];
  if (product) {
    for (let image of product.images) {
      const imageObj = {
        original: image,
        thumbnail: image,
        originalAlt: product.name,
        thumbnailAlt: product.name,
        originalClass: "image-gallery-item",
        thumbnailClass: "image-gallery-thumbnail",
        sizes: "max-width: 80%",
      };
      images.push(imageObj);
    }
  }

  const convert = (description) => {
    const elm = document.getElementById("description-text");
    if (elm) {
      elm.innerHTML = description;
    }
  };

  const sendCommentHandler = (e) => {
    e.preventDefault();
    setSendComment({ ...sendComment, loading: true });
    axios
      .post("/api/comments/", {
        username: sendComment.name,
        comment: sendComment.comment,
        productId: product._id,
      })
      .then((res) => {
        setSendComment({ ...sendComment, loading: false, success: true });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setSendComment({ ...sendComment, loading: false, error: err });
      });
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="flex-row product-bg top height">
            <div className="col-1 feature">
              <ul>
                <li className="card-flex">
                  <div className="price"> {product.price} تومان</div>
                  <div>قیمت </div>
                </li>
                <li className="card-flex">
                  {product.InStock ? (
                    <span className="success">موجود</span>
                  ) : (
                    <span className="danger">ناموجود</span>
                  )}
                  <div>وضعیت </div>
                </li>
                <li className="card-flex">
                  {product.InStock && (
                    <>
                      <div>
                        <button
                          className="stock-btn"
                          onClick={() => {
                            setQty(qty - 1);
                          }}
                        >
                          -
                        </button>
                        <span> {qty}</span>
                        <button
                          className="stock-btn"
                          onClick={() => {
                            setQty(qty + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div>تعداد </div>
                    </>
                  )}
                </li>
                <li>
                  <button
                    onClick={addToCartHandler}
                    className={
                      product.InStock
                        ? "btn cart-btn block"
                        : "btn cart-btn block disable"
                    }
                  >
                     خرید
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-2 feature">
              <h1>{product.name}</h1>
              <div className="line"></div>
              <ul>
                <li>ویژگی های محصول</li>
                {product.features.map((feature, index) => {
                  return (
                    <li key={index} className="direction">
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-1">
              {images.length > 0 && (
                <MyImageGallery images={images}></MyImageGallery>
              )}
            </div>
          </div>

          <div className="description ">
            <h3>توضیحات محصول</h3>
            <div className="line"></div>

            {product && product.description ? convert(product.description) : ""}
            <p id="description-text"></p>
          </div>

          <div className="description">
            {commentState.loading && <LoadingBox></LoadingBox>}
            <h3>نظرات کاربران</h3>
            <div className="line"></div>
            {commentState.comments && commentState.comments.length > 0 ? (
              commentState.comments.map((comment) => {
                if (comment.isConfirmed === true) {
                  return (
                    <div key={comment._id} className="comment">
                      <p
                        className={`${
                          comment.username === "admin"
                            ? "admin-comment-name"
                            : "comment-name"
                        }`}
                      >
                        {comment.username}
                      </p>
                      <p className="comment-time">
                        {convertDate(comment.time)}
                      </p>

                      <div className="comment-body">{comment.comment}</div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })
            ) : (
              <p> اولین نفری باشید که نظر میدهید</p>
            )}
          </div>
          <div>
            <form
              className="content-form"
              onSubmit={(e) => sendCommentHandler(e)}
            >
              {sendComment.loading && <LoadingBox></LoadingBox>}
              {sendComment.error && (
                <MessageBox variant="danger">{sendComment.error}</MessageBox>
              )}
              {sendComment.success && (
                <MessageBox>
                  نظر شما با موفقیت ارسال شد و پس از بررسی نمایش داده خواهد شد.
                </MessageBox>
              )}
              <h3>ارسال نظر </h3>
              <div>
                <label htmlFor="name">نام</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام"
                  value={sendComment.name}
                  onChange={(e) => {
                    setSendComment({ ...sendComment, name: e.target.value });
                  }}
                />
              </div>

              <div>
                {" "}
                <label htmlFor="comment">نظر</label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="نظر خود را بنویسید"
                  required
                  value={sendComment.comment}
                  onChange={(e) => {
                    setSendComment({
                      ...sendComment,
                      comment: e.target.value,
                    });
                  }}
                ></textarea>
              </div>

              <button type="submit" className="btn cart-btn">
                ارسال
              </button>
            </form>
          </div>

          <h1 className="block flex-row  bigText">محصولات مرتبط</h1>
          {relaitedLoading ? (
            <LoadingBox></LoadingBox>
          ) : relaitedError ? (
            <MessageBox variant="danger">{relaitedError}</MessageBox>
          ) : (
            <ProductSlider
              products={relaited}
              history={props.history}
            ></ProductSlider>
          )}
        </>
      )}
    </>
  );
}

export default ProductScreen;
