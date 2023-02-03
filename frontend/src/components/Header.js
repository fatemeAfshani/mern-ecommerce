import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";

function Header(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const signin = useSelector((state) => state.signin);
  const { userInfo } = signin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const openNav = () => {
    document.getElementById("mySideNav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
  };

  const dropdownContainer = (id) => {
    const container = document.getElementById(id);
    if (container.style.display === "block") {
      container.style.display = "none";
    } else {
      container.style.display = "block";
    }
  };
  return (
    <>
      <header className="navbar">
        <div className="info-header">
          <span>
            {" "}
            برای مشاهده فیلم محصولات و اطلاع از تخفیفات ویژه به پیج ما سر بزنید
            <i className="fas fa-instagram "></i>
          </span>
    
          <span>
            {" "}
            مشاوره تخصصی و پیگیری سفارشات{"   "} 
            <i className="fas fa-phone"></i>
          </span>
        </div>

        <div className="flex-row nav">
          <div>
            <Link to="/">
              <img src="/logo/logo.png" alt="لوگو" />
            </Link>
          </div>
          <SearchBox></SearchBox>
          <div className="links">
            {userInfo ? (
              <div className="dropdown menu-btn profile-btn">
                <div className="profile-btn">
                  <i className="fas fa-user-circle"></i>
                  <i className="fas fa-angle-down"></i>
                </div>

                <ul className="dropdown-item">
                  <li>
                    <Link to="/OrderHistory">پیگیری سفارشات</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      خروج از سیستم
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="menu-btn profile-btn">
                حساب کاربری
                <i className="fas fa-user-circle"></i>
              </Link>
            )}
            {userInfo && userInfo.isAdmin ? (
              <div className="dropdown">
                <div>
                  ادمین پنل <i className="fas fa-angle-down"></i>
                </div>
                <ul className="dropdown-item">
                  <li>
                    <Link to="/ordersList">لیست سفارشات</Link>
                  </li>
                  <li>
                    <Link to="/productsList">لیست محصولات</Link>
                  </li>
                  <li>
                    <Link to="/usersList">لیست کاربران</Link>
                  </li>
                  <li>
                    <Link to="/commentList">لیست نظرات</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}

            <Link to="/cart" className="menu-btn cart-btn">
              {cartItems.length > 0 ? (
                <span className="cart-circle-header">{cartItems.length}</span>
              ) : (
                <></>
              )}
              <i className="fas fa-shopping-cart"> </i>
              سبد خرید
            </Link>
          </div>
        </div>
        <ul className="top-level-menu">
          <li>
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link to="/search/category/پزشکی">
              {" "}
              <i className="fas fa-angle-down"></i> پزشکی
            </Link>
            <ul className="second-level-menu">
              <li>
                <Link to="/search/category/ماسک">ماسک</Link>
              </li>
              <li>
                <Link to="/search/category/فشارسنج">فشارسنج</Link>
              </li>
              <li>
                <Link to="/search/category/قندخون"> دستگاه قندخون</Link>
              </li>
              <li>
                <Link to="/search/category/تب سنج"> تب سنج</Link>
              </li>
              <li>
                <Link to="/search/category/پالس اکسیمر"> پالس اکسیمر</Link>
              </li>
              <li>
                <Link to="/search/category/کپسول اکسیژن"> کپسول اکسیژن</Link>
              </li>
              <li>
                <Link to="/search/category/ سایر محصولات پزشکی">
                  سایر محصولات
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/search/category/خانگی">
              {" "}
              <i className="fas fa-angle-down"></i> خانگی
            </Link>
            <ul className="second-level-menu">
              <li>
                <Link to="/search/category/دستگاه بخور">
                  <i className="fas fa-angle-left"></i>دستگاه بخور
                </Link>
                <ul className="third-level-menu">
                  <li>
                    <Link to="/search/category/بخور سرد">بخور سرد </Link>
                  </li>

                  <li>
                    <Link to="/search/category/بخور گرم">بخور گرم </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/search/category/ترازو">
                  <i className="fas fa-angle-left"></i>ترازو
                </Link>
                <ul className="third-level-menu">
                  <li>
                    <Link to="/search/category/ترازو آشپزخانه">
                      ترازو آشپزخانه{" "}
                    </Link>
                  </li>

                  <li>
                    <Link to="/search/category/ترازو وزن ">ترازو وزن </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/search/category/ماساژور">
                  <i className="fas fa-angle-left"></i>ماساژور
                </Link>
                <ul className="third-level-menu">
                  <li>
                    <Link to="/search/category/ماساژور سر و گردن">
                      ماساژور سر و گردن{" "}
                    </Link>
                  </li>

                  <li>
                    <Link to="/search/category/ماساژور صورت">
                      ماساژور صورت{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/category/ماساژور بدن">ماساژور بدن </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/search/category/ سایر محصولات خانگی">
                  سایر محصولات
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/search/category/ورزشی">
              <i className="fas fa-angle-down"></i> ورزشی
            </Link>
            <ul className="second-level-menu">
              <li>
                <Link to="/search/category/تردمیل">تردمیل</Link>
              </li>
              <li>
                <Link to="/search/category/دوچرخه">دوچرخه</Link>
              </li>
              <li>
                <Link to="/search/category/ سایر محصولات ورزشی">
                  سایر محصولات
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/search/category/ارتوپدی">
              {" "}
              <i className="fas fa-angle-down"></i> ارتوپدی
            </Link>
            <ul className="second-level-menu">
              <li>
                <Link to="/search/category/واکر">واکر</Link>
              </li>
              <li>
                <Link to="/search/category/ویلچر">ویلچر</Link>
              </li>
              <li>
                <Link to="/search/category/تشک مواج">تشک مواج</Link>
              </li>
              <li>
                <Link to="/search/category/توالت فرنگی">توالت فرنگی</Link>
              </li>
              <li>
                <Link to="/search/category/ سایر محصولات ارتوپدی">
                  سایر محصولات
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/search/category/زیبایی">
              {" "}
              <i className="fas fa-angle-down"></i> زیبایی
            </Link>
            <ul className="second-level-menu">
              <li>
                <Link to="/search/category/فیس براش">فیس براش</Link>
              </li>
              <li>
                <Link to="/search/category/دستگاه ها">دستگاه ها </Link>
              </li>
              <li>
                <Link to="/search/category/ماسک صورت">ماسک صورت </Link>
              </li>
              <li>
                <Link to="/search/category/ سایر محصولات زیبایی">
                  سایر محصولات
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/contact">ارتباط با ما</Link>
          </li>
          <li>
            <Link to="/trackOrder"> پیگیری سفارشات </Link>
          </li>
        </ul>
      </header>
      <header className="small-navbar">
        <div className="info-header-small">
          <span>
            {" "}
            مشاوره و پیگیری سفارشات{"   "} 
            <i className="fas fa-phone"></i>
          </span>
        </div>
        <div className="flex-row">
          <div>
            <Link to="/">
              <img className="mybrand" src="/logo/logo.png" alt="لوگو" />
            </Link>
          </div>
          <div className="links">
            {userInfo ? (
              <div className="dropdown menu-btn profile-btn">
                <div className="profile-btn">
                  <i className="fas fa-user-circle"></i>
                  <i className="fas fa-angle-down angle"></i>
                </div>

                <ul className="dropdown-item">
                  <li>
                    <Link to="/OrderHistory">پیگیری سفارشات</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      خروج از سیستم
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="menu-btn profile-btn">
                <i className="fas fa-user-circle "></i>
              </Link>
            )}
            {userInfo && userInfo.isAdmin ? (
              <div className="dropdown">
                <div>
                  {userInfo.name} <i className="fas fa-angle-down"></i>
                </div>
                <ul className="dropdown-item">
                  <li>
                    <Link to="/dashBoard">داشبورد</Link>
                  </li>
                  <li>
                    <Link to="/ordersList">لیست سفارشات</Link>
                  </li>
                  <li>
                    <Link to="/productsList">لیست محصولات</Link>
                  </li>
                  <li>
                    <Link to="/usersList">لیست کاربران</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}

            <Link to="/cart" className="menu-btn cart-btn">
              {cartItems.length > 0 ? <span>{cartItems.length}</span> : <></>}
              <i className="fas fa-shopping-cart"> </i>
            </Link>
          </div>
          <SearchBox variant="small"></SearchBox>
          <span onClick={openNav}>
            <i className="fas fa-bars fa-2x"></i>
          </span>

          <div className="sidenav" id="mySideNav">
            <div className="closebtn" onClick={closeNav}>
              <i className="fas fa-times"></i>
            </div>
            <Link to="/">صفحه اصلی</Link>
            <button
              className="dropdown-btn"
              onClick={() => dropdownContainer("dropdown-container1")}
            >
              پزشکی
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container" id="dropdown-container1">
              <Link to="/search/category/فشارسنج">فشارسنج</Link>
              <Link to="/search/category/قندخون"> دستگاه قندخون</Link>
              <Link to="/search/category/تب سنج"> تب سنج</Link>
              <Link to="/search/category/ماسک"> ماسک </Link>
              <Link to="/search/category/پالس اکسیمر"> پالس اکسیمر </Link>
              <Link to="/search/category/کپسول اکسیژن"> کپسول اکسیژن </Link>
              <Link to="/search/category/ سایر محصولات پزشکی">
                  سایر محصولات
                </Link>
            </div>
            <button
              className="dropdown-btn"
              onClick={() => dropdownContainer("dropdown-container2")}
            >
              خانگی
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container" id="dropdown-container2">
              <Link to="/search/category/دستگاه بخور">دستگاه بخور</Link>
              <Link to="/search/category/ماساژور"> ماساژور</Link>
              <Link to="/search/category/ترازو"> ترازو </Link>
              <Link to="/search/category/ سایر محصولات خانگی">
                  سایر محصولات
                </Link>
            </div>

            <button
              className="dropdown-btn"
              onClick={() => dropdownContainer("dropdown-container3")}
            >
              ورزشی
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container" id="dropdown-container3">
              <Link to="/search/category/تردمیل">تردمیل</Link>
              <Link to="/search/category/دوچرخه"> دوچرخه</Link>
              <Link to="/search/category/ سایر محصولات ورزشی">
                  سایر محصولات
                </Link>
            </div>

            <button
              className="dropdown-btn"
              onClick={() => dropdownContainer("dropdown-container4")}
            >
              ارتوپدی
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container" id="dropdown-container4">
              <Link to="/search/category/واکر">واکر</Link>
              <Link to="/search/category/ویلچر">ویلچر</Link>
              <Link to="/search/category/مینی بایک"> مینی بایک </Link>
              <Link to="/search/category/تشک مواج">تشک مواج</Link>
              <Link to="/search/category/توالت فرنگی">توالت فرنگی</Link>
              <Link to="/search/category/ سایر محصولات ارتوپدی">
                  سایر محصولات
                </Link>
            </div>
            <button
              className="dropdown-btn"
              onClick={() => dropdownContainer("dropdown-container5")}
            >
              زیبایی
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container" id="dropdown-container5">
              <Link to="/search/category/فیس براش">فیس براش</Link>
              <Link to="/search/category/دستگاه ها">دستگاه ها </Link>
              <Link to="/search/category/ماسک صورت">ماسک صورت </Link>
              <Link to="/search/category/ سایر محصولات زیبایی">
                  سایر محصولات
                </Link>
            </div>
            <Link to="/contact">ارتباط با ما</Link>
            <Link to="/trackOrder">پیگیری سفارش</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
