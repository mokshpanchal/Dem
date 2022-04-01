import { hover } from "@testing-library/user-event/dist/hover";
import { Outlet, Link } from "react-router-dom";

function Header() {
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
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
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
    marginLeft: "1.5vh",
    marginRight: "1.5vh",
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

  return (
    <>
      <div className="Header">
        <nav style={navBar}>
          <a href="/home">
            <img style={logo} src="/assets/logo.png"></img>
          </a>
          <ui style={navListLeft}>
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
          </ui>
          <div style={search}>
            {" "}
            <form>
              <input
                style={{
                  border: 0,
                  borderRadius: 20,
                  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
                }}
                type="text"
                name="search"
              />
              <Link to="/search">
                {" "}
                <img
                  style={{ width: "5vh", height: "5vh", marginLeft: 3 }}
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
                <img
                  style={{ width: "5vh", height: "5vh" }}
                  src="/assets/user.png"
                  alt="image"
                />{" "}
              </Link>{" "}
            </li>
            <li style={list}>
              {" "}
              <Link to="/setting">
                {" "}
                <img
                  style={{ width: "5vh", height: "5vh" }}
                  src="/assets/setting.png"
                  alt="image"
                />{" "}
              </Link>{" "}
            </li>
            <li style={list}>
              {" "}
              <Link to="/cart">
                {" "}
                <img
                  style={{ width: "5vh", height: "5vh" }}
                  src="/assets/shopping-cart.png"
                  alt="image"
                />{" "}
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
