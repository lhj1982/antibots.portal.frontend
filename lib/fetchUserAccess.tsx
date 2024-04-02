import { BACKEND_HOST, LOCAL_STORAGE_EMAIL, USER_ACCESS_PATH } from "@/utils/constants";
import axios from "axios";

export default async function fetchUserAccess() {
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
      User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
    },
  };
  return axios
    .get(`${BACKEND_HOST}/${USER_ACCESS_PATH}`, config)
    .then((response) => {
      let { data } = response.data;
      // console.log("User role: ", data.name);
      const arr = data.name.split(".");
      return arr[arr.length - 1];
    })
    .catch((err) => {
      // console.log("Fetch user role error: ", err);
      throw err;
    });
}
