/* eslint-disable */
import React, { useState, useEffect } from "react";
import '../styles/Plan.css'
import { fetchApi } from "../helpers/fetcher";

export default function Plan() {
const [plans, setPlans] = useState([]);

const getPlans = async () => {
  try {
    let plans = [];
    const apiResponse = await fetchApi(`/api/v1/subscription_plans`);
    console.log({ apiResponse });
    if (apiResponse.status == 200) {
      plans = apiResponse.data.data;
    }
    setPlans(plans);
    console.log(plans);
  } catch (exception) {
    console.error("error while fetching plans", { exception });
  }
};
useEffect(() => {
  getPlans();
}, []);
return (
    <>
    <div className="Plan">
      <div className="freePlan">
        <p> <strong>{plans?.[0]?.name}</strong> </p>
        <p>  Price: {plans?.[0]?.price == 0 ? "Free" : plans?.[0]?.price + "$"} </p>
        <p>  Description: {plans?.[0]?.description}</p>
        <p>  Duration: {plans?.[0]?.duration/30} month</p>
        <p>  Allow to buy: {plans?.[0]?.allow_to_buy == 1? "Yes": "No"}</p>
        <p>  Allow to sell: {plans?.[0]?.allow_to_publish == 1? "Yes": "No"}</p>
        <p>  Space Allocated: {(plans?.[0]?.space_allowed/1024)/1000} GB</p>
      </div>
      <div className="businessPlan">
        <p> <strong>{plans?.[1]?.name}</strong> </p>
        <p>  Price: {plans?.[1]?.price == 0 ? "Free" : plans?.[1]?.price + "$"} </p>
        <p>  Description: {plans?.[1]?.description}</p>
        <p>  Duration: {plans?.[1]?.duration/30} month</p>
        <p>  Allow to buy: {plans?.[1]?.allow_to_buy == 1? "Yes": "No"}</p>
        <p>  Allow to sell: {plans?.[1]?.allow_to_publish == 1? "Yes": "No"}</p>
        <p>  Space Allocated: {(plans?.[1]?.space_allowed/1024)/1000} GB</p>
      </div>
    </div>
    </>
  )
};
