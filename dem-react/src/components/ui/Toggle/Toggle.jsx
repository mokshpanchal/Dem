import React from "react";
import "./Toggle.css";

export default function Toggle({ id, active = false, handleToggle }) {
  return (
    <label class="switch">
      <input type="checkbox" checked={active} onChange={handleToggle} />
      <span class="slider round"></span>
    </label>
  );
}
