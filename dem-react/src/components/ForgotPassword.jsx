/* eslint-disable */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import "../App.css";

async function resetPass(password, confirmPassword, token) {
  const url = `http://localhost:3000/users/secret`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        password: password,
        confirm_password: confirmPassword,
        token: token,
      },
    }),
  }).then((data) => data);
}

function ForgotPassword() {
  const token = new URLSearchParams(useLocation().search).get("token");
  const container = {
    width: "50%",
    margin: "25px auto",
    padding: "30px 20px",
    borderRadius: "10px",
    border: 0,
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function validateForm() {
    return password.length >= 6;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPass(password, confirmPassword, token);

    if (response.status == 200 || response.status == 204) {
      console.log(response);
      swal("Success", "Password has been updated", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/home";
      });
    } else if (response.status == 422) {
      swal(response.errors, "Please try with another link", "error");
    } else {
      console.log(response);
      swal("Failed", "Please try again", "error");
    }
  };

  return (
    <div style={container} className="ForgotPassword">
      <img
        style={{ width: 100, margin: "20px" }}
        src="/assets/logo.png"
        alt=""
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-primary" block size="lg" type="submit">
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
