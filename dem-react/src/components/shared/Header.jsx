/* eslint-disable */
import { Outlet, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { getLocalCart, getAuthToken } from "../../helpers/local-service";
import "./Header.css";

function Header() {
  const { cart, setCart } = useContext(ThemeContext);
  const [user, setUser] = useState(false);

  console.log("header cart", { cart });
  useEffect(() => {
    const localCart = getLocalCart();
    const localUser = getAuthToken() || "";
    if (localCart) {
      setCart(localCart);
    }
    if (localUser) {
      setUser(localUser.length > 0);
    }
  }, []);

  // const searchContent() => {

  // }
  
  const logo = {
    float: "left",
    width: "7vw",
    height: "3vw",
    marginTop: "1vh",
  };

  const search = {
    float: "center",
    marginTop: "2vh",
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    marginLeft: "40vw",
  };

  const navBar = {
    // boxShadow:
    //   "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
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
    fontColor: "#11598D",
    fontSize: "1.5em",
    textDecoration: "none",
    marginRight: "1vw",
  };

  const navListLeft = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
    marginTop: "1.5vh",
    marginLeft: "-55vw",
  };

  const cartIndicator = {
    fontSize: "15px",
    background: "#11598D",
    color: "#fff",
    padding: "0 5px",
    verticalAlign: "top",
    marginLeft: "-10px",
    borderRadius: "20px",
    position: "absolute"
  };

  const size = {
    width: "2vw",
    height: "2vw",
  };
  console.log({ cart });
  return (
    <>
      <div className="Header">
        <nav className="nav" style={navBar}>
          <a href="/home">
            <img className="logo" style={logo} src="/assets/logo.png"></img>
          </a>
          {user && (
            <>
              <ul className="navListLeft" style={navListLeft}>
                <li style={list}>
                  {" "}
                  <Link
                    style={{ color: "#11598D", textDecoration: "none" }}
                    to="/content-list"
                  >
                    {" "}
                    Content{" "}
                  </Link>{" "}
                </li>
                <li style={list}>
                  {" "}
                  <Link
                    style={{ color: "#11598D", textDecoration: "none" }}
                    to="/plan"
                  >
                    {" "}
                    Plans{" "}
                  </Link>{" "}
                </li>
              </ul>
              <div className="search" style={search}>
                {" "}
                <form action="/search" method="get">
                  <input
                    style={{
                      border: 0,
                      borderRadius: 20,
                      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1)",
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
            </>
          )}
          <ul className="navListRight" style={navListRight}>
            {!user ? (
              <>
                <li>
                  {" "}
                  <Link style={{fontWeight: "bold", color: "#156299"}} to="/login"> Login </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{fontWeight: "bold", color: "#156299"}} to="/signup"> Signup </Link>{" "}
                </li>
              </>
            ) : (
              <>
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
                    <img
                      style={size}
                      src="/assets/setting.png"
                      alt="image"
                    />{" "}
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
                          (qty, lineItem) =>
                            (qty += parseFloat(lineItem.quantity)),
                          0
                        ) || ""}
                      </span>
                    )}
                  </Link>{" "}
                </li>
              </>
            )}
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
