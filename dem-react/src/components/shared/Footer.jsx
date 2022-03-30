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
        margin: "35px 70px"
    };
    const footerList = {
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "35px 130px"
    };
    const list1 = {

    };
    const list2 = {

    };
    const bold = {
        fontWeight: "bold"
    };
    const line = {
        backgroundColor: "white",
        width: "90%"
    };
    const lowerFooter = {
        color: "white",
        float: "left",
        margin: "0px 65px"
    };
  return (
    <>
    <div style={footer} className="Footer">
        <img style={footerLogo}src="/assets/logo-whiteBG-round.png" alt="" />
        <div style={footerList}>
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
        <hr style={line}/>
        <p style = {lowerFooter}>&copy; 2022 Dēm.com </p>
    </div>
    </>
  )
};

export default Footer;