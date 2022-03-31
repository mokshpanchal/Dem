import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';

function Home() {
  const mystyle = {
    backgroundImage: `url('./back.jpg')`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  } 
  return( 
    <div style={mystyle} className="home">
      
    </div>
  );
}

export default Home;