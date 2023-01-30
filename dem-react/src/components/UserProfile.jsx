/* eslint-disable */
import React, { useEffect, useState } from "react";
import { postApi, fetchApi } from "../helpers/fetcher";
import { clearAllValues } from "../helpers/local-service";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/UserProfile.css";

export default function UserProfile() {
  const space_around = { marginTop: "2%", marginBottom: "2%",};
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const logout = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await fetchApi("/users/logout");
      console.log({ apiResponse });
      await clearAllValues();
      swal("Success", "Logout successfully!", "success", {
        buttons: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
      return swal(
        "Failed",
        "Failed to logout, please try again or contact to the support team!",
        "error",
        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };
  const getProfile = async () => {
    try {
      const apiResponse = await fetchApi("/users/register/edit/profile");
      console.log({ apiResponse });
    } catch (exception) {
      console.error("error while fetching profile", { exception });
    }
  };

  useEffect(() => {
    const localUser = getProfile();
    // setUser(localUser);
  }, []);
  
  console.log({ user });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signupUser({
      user: {
        email,
        password,
        name,
        phone,
        birth_date,
        username,
      },
    });

    if (response) {
      console.log(response);
      swal("Success", "Register to DEM successfully!", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // localStorage.setItem('accessToken', response['accessToken']);
        // localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/login";
      });
    } else {
      swal("Failed", "Please try again", "error");
    }
  };
  return (
    <>
      {/* <div className="UserProfile"> */}
      <div className="userDetails">
      <h3 style={{color: "#11598D", fontWeight: "bold"}} > Profile </h3>
        <img
          src="/assets/logo-whiteBG-round.png"
          height={200}
          width={200}
          style={{ borderRadius: "20vh" }}
        />
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="moksh3098@gmail.com"
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={space_around} size="lg" controlId="username">
          <Form.Control
            type="text"
            value={username}
            placeholder="moksh"
            disabled
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={space_around} size="lg" controlId="name">
          <Form.Control
            type="text"
            value={name}
            placeholder="Moksh Panchal"
            disabled
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={space_around} size="lg" controlId="phone">
          <Form.Control
            type="text"
            value={phone}
            placeholder="416-887-9684"
            disabled
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group style={space_around} size="lg" controlId="birthdate">
          <Form.Control
            type="date"
            name="birthdate"
            placeholder="Birth Date"
            value={birth_date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group> */}
        </Form>
        <a className="logout" href="#" onClick={logout}>
          Logout
        </a>
      </div>
      {/* <div className="userHistory"></div> */}
      {/* </div> */}
    </>
  );
}
