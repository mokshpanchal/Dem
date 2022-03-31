import React from "react";
import "./Toggle.css";

export default function Toggle({ id, active = false, handleToggle }) {
  return (
    <div id={`toggle-div-${id}`}>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new-${id}`}
        name={`react-switch-new-${id}`}
        type="checkbox"
        checked={active}
        onChange={handleToggle}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new-${id}`}
        id={`react-switch-new-${id}-label`}
        name={`react-switch-new-${id}-label`}
        style={{ background: active && "#06D6A0" }}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
}
