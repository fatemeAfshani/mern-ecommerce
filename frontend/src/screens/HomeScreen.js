import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import ProductSlider from "../components/ProductSlider";
import { Link } from "react-router-dom";

function HomeScreen(props) {
  const [myProducts, setMyProducts] = useState({
    loading: false,
    error: false,
  });

  const [products, setProducts] = useState({
    main: [],
    product1: [],
    product2: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setMyProducts({ loading: true });
    axios
      .get(`/api/products/home?category1=&category2=ماساژور&category3=ترازو`)
      .then((res) => {
        setMyProducts({ loading: false, error: false });
        setProducts({
          main: res.data.mainProducts,
          product1: res.data.products1,
          product2: res.data.products2,
        });
      })
      .catch((err) => {
        setMyProducts({ loading: false, error: err.message });
      });
  }, []);

  return (
    <>
      {myProducts.loading ? (
        <LoadingBox></LoadingBox>
      ) : myProducts.error ? (
        <MessageBox variant="danger">{myProducts.error}</MessageBox>
      ) : (
        <>
          <div className="banners">
            <div className="banner-2 pri">
              <Link to="/search/category/ترازو">
                <img src="/baners/tarazo.jpg" alt="بنر ترازو" />
              </Link>
              <Link to="/search/category/قندخون">
                <img src="/baners/ghandkhon.jpg" alt="بنر قند خون" />
              </Link>
            </div>
            <div className="banner-1">
              <Link to="/search/category/ماساژور">
                <img src="/baners/masagor.jpg" alt="بنر ماساژور" />
              </Link>
            </div>
          </div>

          <Link to="/search/category/" className=" title">
            <span>
              {" "}
              <i className="fas fa-angle-left title-angle"></i>جدیدترین محصولات{" "}
              <i className="fas fa-angle-right title-angle"></i>
            </span>
          </Link>
          <ProductSlider
            products={products.main}
            history={props.history}
          ></ProductSlider>
        </>
      )}
      {
        <>
          <div className="banners">
            <div className="banner-2 pri">
              <Link to="/search/category/فشارسنج">
                <img src="/baners/bloodpressure.jpg" alt="بنر فشارسنج" />
              </Link>
            </div>
            <div className="banner-2 pri">
              <Link to="/search/category/ویلچر">
                <img src="/baners/vilcher.jpg" alt="بنر ویلچر" />
              </Link>
            </div>
            <div className="banner-2 ">
              <Link to="/search/category/دستگاه بخور">
                <img src="/baners/bokhor.jpg" alt="بنر بخور" />
              </Link>
            </div>
          </div>
          <Link to="/search/category/ماساژور" className=" title">
            <span>
              {" "}
              <i className="fas fa-angle-left title-angle"></i>انواع ماساژور
              <i className="fas fa-angle-right  title-angle"></i>{" "}
            </span>
          </Link>

          <ProductSlider
            products={products.product1}
            history={props.history}
          ></ProductSlider>
        </>
      }
      {
        <>
          <div className="banners">
            <div className="banner-2 sm-phone-banner">
              <Link to="/search/category/فشارسنج">
                <img src="/baners/bloodpressure.jpg" alt="بنر فشارسنج" />
              </Link>
            </div>
          </div>
          <Link to="/search/category/ترازو " className=" title">
            <span>
              {" "}
              <i className="fas fa-angle-left title-angle"></i>ترازو{" "}
              <i className="fas fa-angle-right title-angle"></i>{" "}
            </span>
          </Link>

          <ProductSlider
            products={products.product2}
            history={props.history}
          ></ProductSlider>
        </>
      }
    </>
  );
}

export default HomeScreen;
