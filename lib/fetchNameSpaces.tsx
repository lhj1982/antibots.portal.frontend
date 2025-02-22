import {
  BACKEND_HOST,
  LOCAL_STORAGE_EMAIL,
  NAMELIST_PATH,
  NAMESPACE_PATH,
} from "@/utils/constants";
import axios from "axios";

export default async function fetchNameSpaces() {
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
      User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
    },
  };
  return axios
    .get(`${BACKEND_HOST}/${NAMESPACE_PATH}`, config)
    .then((response) => {
      const data: string[] = response.data.data;
      return data;
    })
    .catch((err) => {
      console.log("Fetch NameSpace Failed: ", err);
      throw err;
    });
}
