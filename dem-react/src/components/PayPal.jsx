/* eslint-disable */
import React, { useState, useRef, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import '../styles/PayPal.css'

export default function ReactPayPal() {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const paypalRef = useRef();
  const { cart } = useContext(ThemeContext);
  console.log("checkout page cart", { cart });
  useEffect(() => {
    if (!cart || !cart.length) return;

    setTotal(
      cart.reduce(
        (total, lineItem) => (total += parseFloat(lineItem.recordable.price)),
        0
      )
    );
  }, [cart]);
  useEffect(() => {
    if (!total) return;
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "CAD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [total]);

  if (paid) {
    return <div>Payment successful.!</div>;
  }

  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  return (
    <div className="payPal">
      <div className="container">
        <h1 style={{color: "#11598D", fontWeight: "bold"}}> Checkout </h1>
        <h4  style={{color: "#11598D", fontWeight: "bold"}}>Total Amount in $CAD : {total} /-</h4>
        <div ref={paypalRef} />
        <h2 style={{border: "5px dashed red", color: "#11598D", borderRadius: "10px"}}> Disclaimer: This website do-not sell any product. The payment gateway is purely for educational and demonstration purposes only. If you are a visitor to website. Please do-not proceed to pay. Owners of this website will not be liable for any kind of transaction.</h2>
      </div>
    </div>
  );
}
