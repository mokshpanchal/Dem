/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import { fetchApi, deleteApi } from "../helpers/fetcher";
import "../styles/Cart.css";
import swal from "sweetalert";
import { ThemeContext } from "../App";
import { setLocalCart } from "../helpers/local-service";
import { Button } from "react-bootstrap";

export default function Cart() {
  const [userCart, setUserCart] = useState(null);
  // const mystyle = {
  //   backgroundImage: `url('./back.jpg')`,
  //   backgroundSize: "100% 100%",
  //   backgroundRepeat: "no-repeat",
  //   height: 500,
  // };
  const { cart, setCart } = useContext(ThemeContext);
  var randomImages = ["/assets/cover.jpg", "/assets/cover1.jpg", "/assets/cover2.jpg", "/assets/cover3.jpg", "/assets/cover4.jpg", "/assets/cover5.jpg"]
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
    <div>
      <div className="container">
        <h3 style={{color: "#11598D", fontWeight: "bold"}} >Cart</h3>
        {userCart &&
          Object.entries(userCart).length > 0 &&
          userCart.map((cartItem) => (
            <div className="cart_item">
              <img
                src={
                  randomImages[Math.floor(Math.random()*randomImages.length)]
                }
                height={50}
                width={50}
              />
              <div className="cart_content">
              <p style={{color: "#11598D", fontWeight: "bold", margin: 0}} >{cartItem.recordable.title}</p>
              <p style={{color: "#11598D", margin: 0, textTransform: 'capitalize'}} >{cartItem.recordable.content_type}</p>
              <p style={{color: "#11598D", margin: 0, textTransform: 'capitalize'}} > by {cartItem.user.name}</p>
              </div>
              <div className="price_part">
                <p style={{color: "#11598D", marginTop: "1vw",}}> ${cartItem.recordable.price} </p>
                <Button style={{marginLeft: "1vw"}} onClick={(e) => removeItem(e, cartItem.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        {userCart && Object.entries(userCart).length > 0 && (
          <div className="totalPart">
            <h4 style={{color: "#11598D", fontWeight: "bold"}}>
              Total:  $
              {userCart.reduce(
                (total, lineItem) =>
                  (total += parseFloat(lineItem.recordable.price)),
                0
              )}
            </h4>
            <Button onClick={() => (window.location.href = "/checkout")}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
