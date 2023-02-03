import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shippingToCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { states } from "../data/states";
import { stateCities } from "../data/cities";

function ShippingAddressScreen(props) {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState({
    fullname: shippingAddress.fullname,
    state: shippingAddress.state,
    city: shippingAddress.city,
    fullAddress: shippingAddress.fullAddress,
    postalCode: shippingAddress.postalCode,
  });

  // const [paymentMethod, setpaymentMethod] = useState("online");
  const paymentMethod = 'online' 

  const changeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress({ ...address, [name]: value });
  };

  const state = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const stateNumber =
      e.target[e.target.selectedIndex].getAttribute("data-number");
    const citiesName = stateCities.find(
      (obj) => obj.name === parseInt(stateNumber)
    );
    setAddress({ ...address, [name]: value, city: citiesName.cities[0].name });
    const select = document.getElementById("city");
    let i,
      L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
      select.remove(i);
    }
    citiesName.cities.forEach((city) => {
      let option = document.createElement("option");
      option.value = city.name;
      option.innerHTML = city.name;
      select.appendChild(option);
    });
  };

  const dispatch = useDispatch();
  const formHandler = (e) => {
    e.preventDefault();
    if (
      address.state === "" ||
      address.city === "" ||
      address.state.match(/لطفا/) ||
      address.city.match(/لطفا/)
    ) {
      return alert("لطفا نام شهر و استان را انتخاب کنید");
    } else if (address.postalCode.length !== 10) {
      return alert(" لطفا کدپستی ۱۰ رقمی وارد کنید");
    } 
    // else if (address.state !== "تهران" && paymentMethod === "offline") {
    //   return alert("فقط ساکنین استان تهران امکان پرداخت درب منزل را دارند");
    // }
    dispatch(shippingToCart(address, paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={formHandler}>
        <div>
          <h2>اطلاعات ارسال</h2>
        </div>
        <div>
          <label htmlFor="fullname">نام و نام خانوادگی</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            aria-describedby="fullnameSmall"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            required
            value={address.fullname}
            onChange={changeHandle}
          />
          <small id="fullnameSmall">.محصول به این نام پست خواهد شد </small>
        </div>
        <div>
          <label htmlFor="state">استان</label>
          <select id="state" name="state" onChange={state}>
            {states.map((state) => {
              return (
                <option
                  key={state.number}
                  data-number={state.number}
                  value={state.name}
                >
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="city">شهر</label>
          <select name="city" id="city" onChange={changeHandle}>
            <option value="0">لطفا شهر را انتخاب نمایید</option>
          </select>
        </div>
        <div>
          <label htmlFor="fullAddress">...منطقه، خیابان</label>
          <input
            type="textarea"
            id="fullAddress"
            name="fullAddress"
            aria-describedby="addressSmall"
            placeholder="منطقه، خیابان، کوچه، پلاک، واحد را وارد کنید"
            value={address.fullAddress}
            required
            onChange={changeHandle}
          />
          <small id="addressSmall">
            لطفا آدرس کامل شامل منطقه، خیابان، کوچه، پلاک، واحد را وارد کنید{" "}
          </small>
        </div>
        <div>
          <label htmlFor="postalCode">کد پستی</label>
          <input
            type="number"
            id="postalCode"
            name="postalCode"
            placeholder="کدپستی خود را وارد کنید"
            value={address.postalCode}
            required
            aria-describedby="postalCodeSmall"
            onChange={changeHandle}
          />
          <small id="postalCodeSmall">
            لطفا کد پستی خود را بدون فاصله و با حروف انگلیسی وارد کنید
          </small>
        </div>

        {/* <div>
          <p className="right">
            فقط ساکنین شهر تهران امکان پرداخت درب منزل را دارند
          </p>
          <div className="radio-input">
            <label htmlFor="online">پرداخت به صورت آنلاین</label>
            <input
              type="radio"
              name="paymentMethod"
              id="online"
              value="online"
              required
              onChange={(e) => setpaymentMethod(e.target.value)}
            />
          </div>

          <div className="radio-input">
            <label htmlFor="offline">پرداخت درب منزل(ارسال با پیک)</label>
            <input
              type="radio"
              name="paymentMethod"
              id="offline"
              value="offline"
              required
              disabled={address.city !== "تهران"}
              onChange={(e) => setpaymentMethod(e.target.value)}
            />
          </div>
        </div> */}

        <button type="submit" className="btn cart-btn half-btn">
          تایید اطلاعات و مرحله بعد
        </button>
      </form>
    </>
  );
}

export default ShippingAddressScreen;
