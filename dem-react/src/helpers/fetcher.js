/* eslint-disable */
import axios from "axios";
import { getAuthToken } from "./local-service";

const BASE_API = process.env.REACT_APP_PUBLIC_URL;

export function getHeaders(headers = {}) {
  const authToken = getAuthToken();
  headers = {
    ...headers,
    "Content-Type": "application/json",
  };
  headers = authToken
    ? {
        ...headers,
        Authorization: authToken,
      }
    : headers;
  return headers;
}
export async function fetchApi(path = "/", query = "") {
  return await axios
    .get(`${BASE_API}${path}`, {
      headers: getHeaders(),
    })
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
//example of pathObjects
// [
//     {
//         path:"/one",
//         queryString:"a=b&c=d",
//         responseKey: "one"
//     },
//     {
//         path:"/two",
//         responseKey: "two"
//     }
// ]
export async function bulkAsyncFetchApi(pathObjects = []) {
  let results = {};
  if (!pathObjects) return results;
  let promises = [];
  await pathObjects.map((pathObject) => {
    promises = [
      ...promises,
      new Promise(async (resolve, reject) => {
        const resp = await axios.get(
          `${BASE_API}${pathObject.path}${
            pathObject.queryString ? `?${pathObject.queryString}` : ""
          }`,
          {
            headers: getHeaders(),
          }
        );
        return resolve({ [pathObject.responseKey]: resp.data });
      }),
    ];
  });
  const res = await Promise.allSettled(promises)
    .then((responses) => {
      console.log("all data", { responses });
      responses.forEach(
        (result) => (results = { ...results, ...{ ...result.value } })
      );
      return results;
    })
    .catch((error) => error);
  return res;
}
