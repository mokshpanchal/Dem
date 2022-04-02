/* eslint-disable */
import React, { useEffect, useState } from "react";
import { postApi, fetchApi } from "../helpers/fetcher";
import { getLocalUser, clearAllValues } from "../helpers/local-service";
import swal from "sweetalert";

import "../styles/UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const logout = async () => {
    try {
      const apiResponse = await fetchApi("/users/logout");
      console.log({ apiResponse });
      // if (!apiResponse.data.success) {
      //   return swal(
      //     "Failed",
      //     "Failed to remove from the cart, please try again!",
      //     "error"
      //   );
      // }
      // await getUserCart();
      // return swal(
      //   "Success",
      //   "Removed item from the cart successfully!",
      //   "success",
      //   {
      //     buttons: false,
      //     timer: 2000,
      //   }
      // )
      await clearAllValues();
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
      return swal(
        "Failed",
        "Failed to logout, please try again or contact to the support team!",
        "error",
        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };
  useEffect(() => {
    const localUser = getLocalUser();
    setUser(localUser);
  }, []);
  console.log({ user });
  return (
    <>
      <div className="UserProfile">
        <div className="userDetails">
          <img
            src="/avatar-default.webp"
            height={200}
            width={200}
            style={{ borderRadius: "100px" }}
          />
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
        <div className="userHistory"></div>
      </div>
    </>
  );
}
