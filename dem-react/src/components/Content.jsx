import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";


async function createContent(creds) {
    return fetch('http://localhost:3000/api/v1/contents', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
        .then(data => data)
}

function Content() {
  const container = {
    width: "50%",
    margin: "25px auto",
    padding: "30px 20px",
    borderRadius: "10px",
    border: 0,
    boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)"
  };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [birth_date, setDate] = useState("");
//   const [username, setUsername] = useState("");
  const [material, setMaterial] = useState("");

  function validateForm() {
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await createContent({"content":{
        material}
    });

    if (response) {
      console.log(response);
      swal("Success", "Register to DEM successfully!", "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
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

        <Form.Group size="lg" controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control
            autoFocus
            type="file"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </Form.Group>
        <div style={{marginTop: "2%", marginBottom: "2%"}}>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
            SignUp
            </Button>
        </div>
      </Form>
    </div>
  );
}

export default Content;