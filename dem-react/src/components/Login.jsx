import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';
import '../App.css';

async function loginUser(creds) {
    return fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(data => data)
}

function Login() {
  const container = {
    width: "50%",
    margin: "25px auto",
    padding: "30px 20px",
    borderRadius: "10px",
    border: 0,
    boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)"
  };
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({"user":{
      email,
      password
    }});

    if (response.status == 200) {
      console.log(response)
      swal("Success", "Logged in successfully", "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        window.location.href = "/home";
      });
    } else {
      swal("Failed", "Please try again", "error");
    }
  }

  return (
    <div style={container} className="Login">
      <img style={{width: 100, margin: "20px"}} src="/assets/logo.png" alt="" />
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
        <div style={{marginTop: "2%", marginBottom: "2%"}}>
          <Button variant="primary" block size="lg" type="submit" disabled={!validateForm()}>
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