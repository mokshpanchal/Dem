/* eslint-disable */
import React, { useState } from "react";
import "../styles/Home.css";
import Toggle from "./ui/Toggle/Toggle";

export default function Settings() {
  const [discover, setDiscover] = useState(true);
  const [email, setEmail] = useState(true);
  const [newsLetters, setnewsLetters] = useState(true);
  const [content, setcontent] = useState(true);

  return (
    <div className={`container`}>
      <h3 style={{color: "#11598D", fontWeight: "bold"}} > Settings </h3>
      <div className="settings_card">
        <div className="single_settings">
          <p style={{color: "#11598D"}} >Account discoverability</p>{" "}
          <p>
            <Toggle
              id={1}
              handleToggle={() => setDiscover(!discover)}
              active={discover}
            />
          </p>
        </div>
        <div className="single_settings">
          <p style={{color: "#11598D"}} >Allow email notification</p>{" "}
          <p>
            <Toggle
              id={2}
              handleToggle={() => setEmail(!email)}
              active={email}
            />
          </p>
        </div>
        <div className="single_settings">
          <p style={{color: "#11598D"}} >Newsletters and offers</p>{" "}
          <p>
            <Toggle
              id={3}
              handleToggle={() => setnewsLetters(!newsLetters)}
              active={newsLetters}
            />
          </p>
        </div>
        <div className="single_settings">
          <p style={{color: "#11598D"}} >Content rechability</p>{" "}
          <p>
            <Toggle
              id={4}
              handleToggle={() => setcontent(!content)}
              active={content}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
