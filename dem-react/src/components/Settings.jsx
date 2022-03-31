import React from "react";
import "../styles/Home.css";
import Toggle from "./ui/Toggle/Toggle";

export default function Settings() {
  const handleToggle = () => {
    console.log("here");
  };
  return (
    <div className={`SignUp container`}>
      <h4>Settings</h4>
      <div className="settings_card">
        <div className="single_settings">
          <p>testttttttttt</p>{" "}
          <p>
            <Toggle id={1} />
          </p>
        </div>
        {/* <div className="single_settings">
          <p>testttttttttt</p>{" "}
          <p>
            <Toggle id={2} active={true} handleToggle={handleToggle} />
          </p>
        </div>
        <div className="single_settings">
          <p>testttttttttt</p>{" "}
          <p>
            <Toggle id={3} handleToggle={handleToggle} />
          </p>
        </div>
        <div className="single_settings">
          <p>testttttttttt</p>{" "}
          <p>
            <Toggle id={4} handleToggle={handleToggle} />
          </p>
        </div>
        <div className="single_settings">
          <p>testttttttttt</p>{" "}
          <p>
            <Toggle id={6} handleToggle={handleToggle} />
          </p>
        </div> */}
      </div>
    </div>
  );
}
