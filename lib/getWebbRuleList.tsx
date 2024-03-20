import { BACKEND_HOST, LOCAL_STORAGE_EMAIL, WEBBRULE_GETLIST_PATH } from "@/utils/constants";
import { useUserStore } from "@/zustand/userStore";
import axios from "axios";

export default async function getWebbRuleList() {
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
      User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
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
