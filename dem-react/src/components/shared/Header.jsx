/* eslint-disable */
import { Outlet, Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { getLocalCart } from "../../helpers/local-service";

function Header() {
  const { cart, setCart } = useContext(ThemeContext);
  console.log("header cart", { cart });
  useEffect(() => {
    const localCart = getLocalCart();
    if (localCart) {
      setCart(localCart);
    }
  }, []);
  const logo = {
    float: "left",
    width: 100,
    height: 45,
    marginTop: "1vh",
  };

  const search = {
    float: "center",
    marginTop: "2vh",
    display: "flex",
    justifyContent: "space-around",
  };

  const navBar = {
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 20px",
  };

  const navListRight = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
    width: "10%",
    marginTop: "1.5vh",
  };

  const list = {
    fontWeight: "bold",
    fontColor: "#156299",
    fontSize: "1.5em",
    textDecoration: "none",
  };

  const navListLeft = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
    marginTop: "1.5vh",
    marginLeft: "-15vw",
  };
  const cartIndicator = {
    fontSize: "15px",
    background: "#156299",
    color: "#fff",
    padding: "0 5px",
    verticalAlign: "top",
    marginLeft: "-10px",
    borderRadius: "20px",
  };

  const size = {
    width: "2vw",
    height: "2vw",
  };
  console.log({ cart });
  return (
    <>
      <div className="Header">
        <nav style={navBar}>
          <a href="/home">
            <img style={logo} src="/assets/logo.png"></img>
          </a>
          <ul style={navListLeft}>
            <li style={list}>
              {" "}
              <Link
                style={{ color: "#156299", textDecoration: "none" }}
                to="/content-list"
              >
                {" "}
                Content{" "}
              </Link>{" "}
            </li>
            <li style={list}>
              {" "}
              <Link
                style={{ color: "#156299", textDecoration: "none" }}
                to="/plan"
              >
                {" "}
                Plans{" "}
              </Link>{" "}
            </li>
          </ul>
          <div style={search}>
            {" "}
            <form>
              <input
                style={{
                  border: 0,
                  borderRadius: 20,
                  boxShadow:
                    "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
                }}
                type="text"
                name="search"
              />
              <Link to="/search">
                {" "}
                <img
                  style={{ width: "2vw", height: "2vw", marginLeft: 3 }}
                  src="/assets/search.png"
                  alt="image"
                />{" "}
              </Link>{" "}
            </form>
          </div>
          <ul style={navListRight}>
            {/* <li> <Link to="/login"> Login </Link> </li>
            <li> <Link to="/signup"> Signup </Link> </li> */}
            <li style={list}>
              {" "}
              <Link to="/profile">
                {" "}
                <img style={size} src="/assets/user.png" alt="image" />{" "}
              </Link>{" "}
            </li>
            <li style={list}>
              {" "}
              <Link to="/setting">
                {" "}
                <img style={size} src="/assets/setting.png" alt="image" />{" "}
              </Link>{" "}
            </li>
            <li style={{ ...list, position: "relative" }}>
              {" "}
              <Link to="/cart">
                {" "}
                <img
                  style={size}
                  src="/assets/shopping-cart.png"
                  alt="image"
                />{" "}
                {Object.entries(cart).length > 0 && (
                  <span style={cartIndicator}>
                    {cart?.reduce(
                      (qty, lineItem) => (qty += parseFloat(lineItem.quantity)),
                      0
                    ) || ""}
                  </span>
                )}
              </Link>{" "}
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
