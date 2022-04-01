import { Outlet, Link } from "react-router-dom";

const Footer = () => {
  const footer = {
    backgroundColor: "#156299",
    height: 300,
    position: "relative",
    bottom: 0,
    width: "100%",
    paddingTop: 10,
    boxShadow: "2px -2px 10px rgba(0, 0, 0, 0.5)",
  };
  const footerLogo = {
    float: "left",
    width: 100,
    height: 100,
    margin: "35px 70px",
  };
  const footerList = {
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "35px 130px",
  };
  const list1 = {};
  const list2 = {};
  const bold = {
    fontWeight: "bold",
  };
  const line = {
    backgroundColor: "white",
    width: "90%",
  };
  const lowerFooter = {
    color: "white",
    float: "left",
    margin: "0px 65px",
  };
  return (
    <>
      <div style={footer} className="Footer">
        <a href="/home">
          <img style={footerLogo} src="/assets/logo-whiteBG-round.png" alt="" />
        </a>
        <div style={footerList}>
          <div>
            <ul>
              <li style={bold}>Social Links</li>
              <li>
                <a
                  href="https://www.linkedin.com/in/dem-web-app-3a9355236/"
                  target="_blank"
                >
                  <img
                    style={{ width: "5vh", height: "5vh" }}
                    src="/assets/linkedin.png"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100079862656661"
                  target="_blank"
                >
                  <img
                    style={{ width: "5vh", height: "5vh" }}
                    src="/assets/facebook.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/DemWebApp" target="_blank">
                  <img
                    style={{ width: "5vh", height: "5vh" }}
                    src="/assets/twitter.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/DemWebApp" target="_blank">
                  <img
                    style={{ width: "5vh", height: "5vh" }}
                    src="/assets/github.png"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div style={list1}>
            <ul>
              <li style={bold}>Dēm Services</li>
              <li>Service 1</li>
              <li>Service 2</li>
              <li>Service 3</li>
            </ul>
          </div>
          <div style={list2}>
            <ul>
              <li style={bold}>About</li>
              <li>About 1</li>
              <li>About 2</li>
              <li>About 3</li>
            </ul>
          </div>
        </div>
        <hr style={line} />
        <p style={lowerFooter}>
          &copy; 2022{" "}
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="http://3.128.192.107:4000/home"
          >
            Dēm.com;
          </a>{" "}
          All the rights are reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
