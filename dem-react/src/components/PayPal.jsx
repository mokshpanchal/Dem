/* eslint-disable */
import React, { useState, useRef, useContext, useEffect } from "react";
import { ThemeContext } from "../App";

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
      <h4>Total Amount in $CAD : {total} /-</h4>
      <div ref={paypalRef} />
    </div>
  );
}
