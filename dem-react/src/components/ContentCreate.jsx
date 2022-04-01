import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";
import { getAuthToken } from "../helpers/local-service";

async function createContent(formdata, file) {
  // var formData = new FormData();
  console.log({ file });
  // formData.append("title", formdata["content"]["title"]);
  // formData.append("content_type", formdata["content"]["content_type"]);
  // formData.append("description", formdata["content"]["description"]);
  // formData.append("price", formdata["content"]["price"]);
  // formData.append("material", file);
  const form = {
    title: formdata["content"]["title"],
    content_type: formdata["content"]["content_type"],
    description: formdata["content"]["description"],
    price: formdata["content"]["price"],
    material: file,
  };
  // console.log({ form });
  // return fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/v1/contents`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: getAuthToken(),
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // });
  console.log({ form, file });
  return axios({
    url: `${process.env.REACT_APP_PUBLIC_URL}/api/v1/contents`,
    method: "POST",
    headers: {
      Authorization: getAuthToken(),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(form),
  }).then((data) => data);
}

function ContentCreate() {
  const container = {
    width: "50%",
    margin: "25px auto",
    padding: "30px 20px",
    borderRadius: "10px",
    border: 0,
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n  0 12.5px 10px rgba(0, 0, 0, 0.06),\n  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n  0 100px 80px rgba(0, 0, 0, 0.12)",
  };
  const params = new URLSearchParams(window.location.search);
  const content_type = params.get("content_type"); // bar

  //   const [content_type, setContentType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState();
  const [binaryFile, setBinaryFile] = useState();

  function validateForm() {
    return true;
  }
  const getBase64 = async (file) => {
    var reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileBinary = await getBase64(material);
    await setBinaryFile(fileBinary);
    // if (fileBinary) {
    const response = await createContent({
      content: {
        title,
        description,
        price,
        content_type,
      },
      fileBinary,
    });

    if (response.status === 200 || response.status === 201) {
      console.log(response);
      swal("Success", "Register to DEM successfully!", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/login";
      });
    } else {
      swal("Failed", "Please try again", "error");
    }
    // }
  };
  console.log({ material }, material?.name);
  return (
    <div style={container} className="ContentCreate">
      <img
        style={{ width: 100, margin: "20px" }}
        src="/assets/logo.png"
        alt=""
      />
      <h2> Upload your content</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="float"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group size="lg" controlId="content_type">
          <Form.Label>ContentType</Form.Label>
          <Form.Control
            type="text"
            value={content_type}
            onChange={(e) => setContentType(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group size="lg" controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control
            autoFocus
            type="file"
            onChange={(e) => {
              console.log(e);
              setMaterial(e.target.files[0]);
            }}
          />
        </Form.Group>
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Upload
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ContentCreate;
