import React from "react";
import { Link } from "react-router-dom";

export default function Error404Screen() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>متاسفانه صفحه مورد نظر یافت نشد</h2>

        <Link to="/">
          <span className="arrow"></span>بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
