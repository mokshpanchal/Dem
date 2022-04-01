/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import { fetchApi, deleteApi } from "../helpers/fetcher";
import "../styles/Cart.css";
import swal from "sweetalert";
import { ThemeContext } from "../App";
import { setLocalCart } from "../helpers/local-service";

export default function Cart() {
  const [userCart, setUserCart] = useState(null);
  const mystyle = {
    backgroundImage: `url('./back.jpg')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: 500,
  };
  const { cart, setCart } = useContext(ThemeContext);

  const getUserCart = async () => {
    try {
      let cartData = [];
      const apiResponse = await fetchApi("/api/v1/cart_items");
      console.log({ apiResponse });
      if (apiResponse.status == 200) {
        cartData = apiResponse.data.data;
      }
      await setCart(cartData);
      await setLocalCart(cartData);
      setUserCart(cartData);
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  const removeItem = async (e, itemId) => {
    try {
      let cartData = [];
      const response = await deleteApi(`/api/v1/cart_items/${itemId}`);
      console.log({ response });
      if (!response.data.success) {
        return swal(
          "Failed",
          "Failed to remove from the cart, please try again!",
          "error"
        );
      }
      await getUserCart();
      return swal(
        "Success",
        "Removed item from the cart successfully!",
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  useEffect(() => {
    getUserCart();
  }, []);
  console.log({ userCart });

  return (
    <div style={mystyle}>
      <div className="container">
        <h3>Cart</h3>
        {userCart &&
          Object.entries(userCart).length > 0 &&
          userCart.map((cartItem) => (
            <div className="cart_item">
              <img
                src={
                  cartItem.recordable.content_type == "audio"
                    ? "/mp3-default.png"
                    : "/mp3-default.png"
                }
                height={50}
                width={50}
              />
              <p>{cartItem.recordable.title}</p>
              <span className="price_part">
                CAD ${cartItem.recordable.price}
                <button onClick={(e) => removeItem(e, cartItem.id)}>
                  remove
                </button>
              </span>
            </div>
          ))}
        {userCart && Object.entries(userCart).length > 0 && (
          <div className="totalPart">
            <h4>
              Total:{" "}
              {userCart.reduce(
                (total, lineItem) =>
                  (total += parseFloat(lineItem.recordable.price)),
                0
              )}
            </h4>
            <button onClick={() => (window.location.href = "/checkout")}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
