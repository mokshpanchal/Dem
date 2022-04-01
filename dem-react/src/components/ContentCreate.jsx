import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";
import { getHeaders } from "../helpers/fetcher";

async function uploadFile(cId, file) {
  console.log({ file });
  let fd = new FormData();
  fd.append("material", file);
  // const headers = { "Content-Type": "multipart/form-data" };

  const fileResponse = await axios.post(
    `${process.env.REACT_APP_PUBLIC_URL}/api/v1/contents/uploadfile?content_id=${cId}`,
    fd
  );
  console.log({ fileResponse });
  return true;
}
async function createContent(formdata, file) {
  console.log("file outer", { file });
  const form = {
    title: formdata["content"]["title"],
    content_type: formdata["content"]["content_type"],
    description: formdata["content"]["description"],
    price: parseFloat(formdata["content"]["price"]),
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
  return axios
    .post(`${process.env.REACT_APP_PUBLIC_URL}/api/v1/contents`, form, {
      headers: getHeaders(),
    })
    .then(async (data) => {
      console.log("content created", { data });
      console.log("file inner", { file });

      await uploadFile(data.data.data.id, file);
      debugger;
    });
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
  console.log({ material });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createContent(
      {
        content: {
          title,
          description,
          price,
          content_type,
        },
      },
      material
    );

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
  };
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
