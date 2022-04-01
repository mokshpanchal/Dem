/* eslint-disable */
import React, { useState } from "react";

export default function Welcome() {
    const mystyle = {
        backgroundImage: `url('./back.jpg')`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: 500
    }
  return (
    <>
    <div style={mystyle} className="Welcome">
    </div>
    </>
  )
};
