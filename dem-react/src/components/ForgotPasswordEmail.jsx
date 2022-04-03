/* eslint-disable */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import "../App.css";
import { EMAIL_REGEX } from "../helpers/patterns";

async function forgotPass(email) {
  return fetch(`http://localhost:3000/users/secret/new?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data);
}

function ForgotPasswordEmail() {
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

  function validateForm() {
    return email.length > 0 && EMAIL_REGEX.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPass(email);

    if (response.status == 200 || response.status == 204) {
      console.log(response);
      swal("Success", "Reset password link sent to your email", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/welcome";
      });
    } else {
      console.log(response);
      swal("Failed", "Please try again", "error");
    }
  };

  return (
    <div style={container} className="ForgotPasswordEmail">
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

        <Button
          variant="outline-primary"
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Send Email
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPasswordEmail;
