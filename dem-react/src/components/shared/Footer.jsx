/* eslint-disable */
import './Footer.css'
const Footer = () => {
  const footer = {
    backgroundColor: "#11598D",
    height: 230,
    // position: 'absolute',
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
    margin: "5vw 130px",
  };
  const list1 = {};
  const list2 = {};
  const bold = {
    fontWeight: "bold",
  };
  const line = {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "4vw"
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
          <img className="footerLogo" style={footerLogo} src="/assets/logo-whiteBG-round.png" alt="" />
        </a>
        <div >
          <div>
            <ul className="footerList"style={footerList}>
              {/* <li style={bold}>Social Links</li> */}
              <li>
                <a
                  href="https://www.linkedin.com/in/dem-web-app-3a9355236/"
                  target="_blank"
                >
                  <img
                    style={{ width: "2vw", height: "2vw", marginRight: "1vw" }}
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
                    style={{ width: "2vw", height: "2vw", marginRight: "1vw" }}
                    src="/assets/facebook.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/DemWebApp" target="_blank">
                  <img
                    style={{ width: "2vw", height: "2vw", marginRight: "1vw" }}
                    src="/assets/twitter.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/DemWebApp" target="_blank">
                  <img
                    style={{ width: "2vw", height: "2vw", marginRight: "1vw" }}
                    src="/assets/github.png"
                  />
                </a>
              </li>
            </ul>
          </div>
          {/* <div style={list1}>
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
          </div> */}
        </div>
        <hr className="line" style={line} />
        <p className="lowerFooter" style={lowerFooter}>
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
