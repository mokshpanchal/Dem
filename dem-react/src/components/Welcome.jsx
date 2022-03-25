import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';

const Welcome = () => {
    const mystyle = {
        backgroundImage: `url('/assets/welcomeBack.jpg')`,
        height: 500
    }
  return (
    <>
    <div style={mystyle} className="Welcome">

    </div>
    </>
  )
};

export default Welcome;