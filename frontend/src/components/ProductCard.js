import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { product } = props;
  const qty = 1;
  const addToCartHandler = () => {
    props.history.push(`/cart/${product._id}?qty=${qty}`);
  };
  return (
    <div key={product._id} className="card">
      <Link to={`/products/${product.searchName}?id=${product._id}`}>
        <img
          className={product.InStock ? "medium" : "medium not-stock"}
          title={product.name}
          src={product.images[0]}
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product.searchName}?id=${product._id}`}>
          <h1>{product.name}</h1>
        </Link>

        {product.InStock ? (
          <div className="row block">
            {" "}
            <div
              className="btn cart-btn"
              type="button"
              onClick={addToCartHandler}
            >
              <i className="fas fa-shopping-cart"> </i>
            </div>
            <div className="price">{product.price} تومان</div>
          </div>
        ) : (
          <div className="row block">
            <div className="btn cart-btn disable" type="button">
              <i className="fas fa-shopping-cart"> </i>
            </div>
            <div className="price-gray">
              {product.price}
              تومان
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
