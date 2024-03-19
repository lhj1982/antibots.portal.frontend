import { BACKEND_HOST, WEBBRULE_GETLIST_PATH } from "@/utils/constants";
import axios from "axios";

export default async function getWebbRuleList() {
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
      User: `${window.localStorage.getItem("email")}`,
    },
  };
  try {
    const response = await axios.get(
      `${BACKEND_HOST}/${WEBBRULE_GETLIST_PATH}`,
      config
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    //console.log("Fetch Rule List Error, err: ", err);
    throw err;
  }
}
