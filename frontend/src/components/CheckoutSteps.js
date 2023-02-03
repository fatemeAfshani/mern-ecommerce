import React from "react";

function CheckoutSteps(props) {
  return (
    <div className="row checkout">
      <div className={props.step3 ? "active" : ""}>سفارش</div>
      <div className={props.step2 ? "active" : ""}>وارد کردن اطلاعات ارسال</div>
      <div className={props.step1 ? "active" : ""}>ورود</div>
    </div>
  );
}

export default CheckoutSteps;
