import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import EditUserScreen from "./screens/admin/EditUserScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UsersListScreen from "./screens/admin/UsersListScreen";
import CartScreen from "./screens/CartScreen";
import Error404Screen from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistory from "./screens/OrderHistory";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import SearchScreen from "./screens/SearchScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ContactScreen from "./screens/ContactScreen";
import TrackingScreen from "./screens/TrackingScreen";
import AdminOrderScreen from "./screens/admin/AdminOrderScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import ScrollToTop from "./screens/ScrollToTop";
import PaymentScreen from "./screens/PaymentScreen";
import CommentScreen from "./screens/admin/CommentScreen";
import VerifyPhoneScreen from "./screens/VerifyPhoneScreen";

// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
// });

function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header />

        <main>
          <ScrollToTop />
          <Switch>
            <Route
              path="/products/:searchName"
              component={ProductScreen}
              exact
            ></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/contact" component={ContactScreen}></Route>
            <Route
              path="/verifyPhoneNumber/:phone"
              component={VerifyPhoneScreen}
            ></Route>
            <Route
              path="/payment/:id/:amount"
              component={PaymentScreen}
            ></Route>
            <Route path="/trackOrder" component={TrackingScreen}></Route>
            <Route path="/questions" component={QuestionsScreen}></Route>
            <PrivateRoute
              path="/orderHistory"
              component={OrderHistory}
            ></PrivateRoute>
            <AdminRoute
              path="/productsList"
              component={ProductListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/products/:id/edit"
              component={ProductEditScreen}
            ></AdminRoute>
            <AdminRoute
              path="/ordersList"
              component={OrderListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/usersList"
              component={UsersListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/adminOrder/:id"
              component={AdminOrderScreen}
            ></AdminRoute>
            <AdminRoute
              path="/commentList"
              component={CommentScreen}
            ></AdminRoute>
            <AdminRoute
              path="/users/:id/edit"
              component={EditUserScreen}
            ></AdminRoute>
            <Route path="/" exact component={HomeScreen}></Route>
            <Route
              path="/search/name/:name?"
              exact
              component={SearchScreen}
            ></Route>
            <Route
              path="/search/category/:category?"
              exact
              component={SearchScreen}
            ></Route>
            <Route path="*" component={Error404Screen}></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
