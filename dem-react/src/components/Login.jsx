/* eslint-disable */
import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import "../App.css";
import { setAuthToken, setLocalCart } from "../helpers/local-service";
import { ThemeContext } from "../App";
import { fetchApi } from "../helpers/fetcher";

function Login() {
  const container = {
    width: "50%",
    margin: "25px auto",
    padding: "30px 20px",
    borderRadius: "10px",
    border: 0,
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCart } = useContext(ThemeContext);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
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
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  const loginUser = async (creds) => {
    return fetch(`${process.env.REACT_APP_PUBLIC_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    }).then(async (data) => {
      const headers = [...data.headers];
      const authToken = headers.find((header) =>
        header.find(
          (headerPart) => headerPart.toLowerCase() === "authorization"
        )
      );
      setAuthToken(authToken.pop());
      return data;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      user: {
        email,
        password,
      },
    });
    if (response.status == 200) {
      swal("Success", "Logged in successfully", "success", {
        buttons: false,
        timer: 2000,
      }).then(async (value) => {
        await getUserCart();
        window.location.href = "/home";
      });
    } else {
      swal("Failed", "Please try again", "error");
    }
  };
  return (
    <div style={container} className="Login">
      <img
        style={{ width: 100, margin: "20px" }}
        src="/assets/logo.png"
        alt=""
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Button
            variant="primary"
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </div>
        <div>
          <a href="/forgot_password"> Forgot Password ?</a>
        </div>
        <div>
          <a href="/signup"> Don't have an account ?</a>
        </div>
      </Form>
    </div>
  );
}

export default Login;
