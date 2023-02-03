import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h1 className="footer-header">چرا فروشگاه ما ؟</h1>
      <div className="footer-feature">
        <div>
          <span>
            <i className="fas fa-shipping-fast fa-3x block"></i>
          </span>
          ارسال ۳ تا ۷ روز کاری به سراسر کشور
        </div>
        <div>
          <span>
            <i className="fas fa-phone-volume fa-3x block"></i>
          </span>
          ارسال رایگان سفارشات بالای ۱ میلیون تومان
        </div>
        <div>
          <span>
            <i className="far fa-handshake fa-3x block"></i>
          </span>
          ضمانت اصالت کالا
        </div>
        <div>
          <span>
            <i className="far fa-calendar fa-3x block">2</i>
          </span>
          فرصت ۴۸ ساعت تست و بازگرداندن کالا
        </div>
      </div>
      <div className="footer-bg">
        <div className="flex-row top ">
          <div className="col-1 feature">
            <ul>
              <li className="footer-li">
                <span>
                  <Link to="/questions"> سوالات متداول</Link>
                </span>
                <i className="fas fa-question fa-2x margin-left"></i>
              </li>

              <li className="footer-li">
                <span>
                  <Link to="/contact">ثبت شکایات </Link>
                </span>
                <i className="fas fa-paper-plane fa-2x margin-left"></i>
              </li>
              <li className="footer-li">
                <span>
                  <Link to="/questions">شرایط مرجوعی کالا</Link>
                </span>
                <i className="fas fa-share fa-2x margin-left"></i>
              </li>
              <li className="footer-li">
                <span>
                  <Link to="/contact">تماس با ما</Link>
                </span>
                <i className="fas fa-phone-square fa-2x margin-left"></i>
              </li>
            </ul>
          </div>
          <div className="col-1 feature">
            <ul>
              <li className="footer-li">
                <p>نماد اعتماد الکترونیکی</p>
              </li>{" "}
            </ul>
            <li className="footer-li">
              <a referrerPolicy="origin" target="_blank" href="/namad.html">
                <img
                  src="/logo/namad-logo.png"
                  alt="نماد اعتماد الکترونیکی"
                  style={{ cursor: "pointer" }}
                ></img>
              </a>
            </li>
          </div>
          <div className="col-1 feature">
            <ul>
              <li className="footer-li">
                <span>اطلاعات تماس</span>
              </li>

              <li className="footer-li">
                09123456789
                <i className="fas fa-phone-square fa-2x margin-left"></i>
              </li>
              <li className="footer-li">
                fatemeh.afshani78@gmail.com
                <i className="fas fa-paper-plane fa-2x margin-left"></i>
              </li>
            
              <li className="footer-li">
                آدرس تستی
                <i className="fas fa-paper-plane fa-2x margin-left"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="feature">
          <h1>
            فروشگاه آنلاین  | تضمین اصالت کالا، ارسال سریع، گارانتی معتبر
          </h1>
          <p>
            فروشگاه ما  از تامین کنندگان تخصصی تجهیزات پزشکی و لوازم ورزشی در ایران
            می باشد که توانسته با حذف واسطه ها محصولاتی با کیفیت از برندهایی نام
            آشنا را در فروشگاه خود با قیمتی مناسب و تضمین اصالت کالا برای
            مشتریان عرضه کند. تجهیزات پزشکی و لوازم ورزشی موجود در این فروشگاه همه
            اصل بوده و با گارانتی ارائه میشوند
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
