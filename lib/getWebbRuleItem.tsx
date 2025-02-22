import { BACKEND_HOST, LOCAL_STORAGE_EMAIL, WEBBRULE_GETITEM_PATH } from "@/utils/constants";
import { useUserStore } from "@/zustand/userStore";
import axios from "axios";

export default async function getWebbRuleItem(fileName: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
      User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
      FileName: fileName,
    },
  };
  try {
    const response = await axios.get(
      `${BACKEND_HOST}/${WEBBRULE_GETITEM_PATH}`,
      config
    );
    const { data } = response.data;
    return data;
  } catch (err) {
    //console.log(`Fetch Rule content ${fileName} failed , err: ${err}`);
    throw err;
  }
}
