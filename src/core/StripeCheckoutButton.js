import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper.js";
function StripeCheckoutButton({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const _token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  ////stripe section
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        const orderData = {
          products: products,
          transaction_id: response.id,
        };
        createOrder(userId, _token, orderData);
        cartEmpty(() => {
          console.log("Did we got crash?");
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };
  /////// sf end
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey="pk_test_51IiKR7SHien7o1Vg7KBi86rl9HvKgzgaxJRiAhrkaCmr3IffUP5StAK1egJWGew2oaQijo72cduyZ3uyKQXsqvxP00qeWF1ayb"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 text-white>Stripe checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
}

export default StripeCheckoutButton;
