/* eslint-disable */
import React, { useState } from "react";
import '../styles/Plan.css'
import { fetchApi } from "../helpers/fetcher";
export default function Plan() {
const [plans, setPlans] = useState([]);

const getPlans = async () => {
  try {
    let contentData = [];
    const apiResponse = await fetchApi(`/api/v1/subscription_plans`);
    console.log({ apiResponse });
    if (apiResponse.status == 200) {
      contentData = apiResponse.data.data;
    }
    setContent(contentData);
  } catch (exception) {
    console.error("error while fetching plans", { exception });
  }
};

return (
    <>
    <div className="Plan">
      <div className="freePlan"></div>
      <div className="businessPlan"></div>
    </div>
    </>
  )
};
