import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";


async function signupUser(creds) {
    return fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
        .then(data => data)
}

function SignUp() {
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setDate] = useState("");
  const [username, setUsername] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await signupUser({"user":{
      email,
      password,
      name,
      phone,
      birth_date,
      username}
    });

    if (response) {
      console.log(response);
      swal("Success", "Register to DEM successfully!", "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        // localStorage.setItem('accessToken', response['accessToken']);
        // localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/login";
      });
    } else {
      swal("Failed", "Please try again", "error");
    }
  }

  return (
    <div style={container} className="SignUp">
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

        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="birthdate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            placeholder="Birth Date"
            value={birth_date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          SignUp
        </Button>

      </Form>
    </div>
  );
}

export default SignUp;