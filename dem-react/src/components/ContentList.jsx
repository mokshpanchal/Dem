import React, { useState, useEffect } from "react";
import { fetchApi } from "../helpers/fetcher";

export default function ContentList() {
  const mystyle = {
    backgroundImage: `url('./back.jpg')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: 500,
  };
  const fetchDetails = async () => {
    const apiResponse = await fetchApi("/api/v1/contents");
    console.log({ apiResponse });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <div style={mystyle} className="ContentList"></div>
    </>
  );
}
