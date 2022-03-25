import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const logo = {
    float: "left",
    width: 100
  };

  const navBar = {
    boxShadow: "7px 5px 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 25px"
  };

  const navList = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
    width: "10%",
    marginTop: "1.5vh"
  };

  return (
    <>
    <div className="Header">
      <nav style = {navBar}>
        <img style = {logo} src="/assets/logo.png"></img>
        <ul style = {navList}>
          <li> <Link to="/login"> Login </Link> </li>
          <li> <Link to="/signup"> Signup </Link> </li>
        </ul>
      </nav>
      <Outlet />
    </div>
    </>
  )
};

export default Header;