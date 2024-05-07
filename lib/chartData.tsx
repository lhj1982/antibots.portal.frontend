import {
  BACKEND_HOST,
  BAR_PIE_PATH,
  JSON_SERVER_PATH,
  LOCAL_STORAGE_EMAIL,
  SCATTER_MAP_PATH,
} from "@/utils/constants";
import axios from "axios";

export const launchEntryLocationData = async (launchId: string) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
        User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
        launchId: `${launchId}`,
      },
    };
    const response = await axios.get(
      `${BACKEND_HOST}/${SCATTER_MAP_PATH}`,
      config
    );
    console.log("RESPONSE: ", response);
    const res = response.data.data;
    console.log("Received data:", res);
    return res;
  } catch (error) {
    console.error("Error fetching scatter data:", error);
  }
};

export const launchEntryBarChartData = async (
  num: number,
  launchId: string
) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
        User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
        launchId: `${launchId}`,
      },
    };
    const response = await axios.get( `${BACKEND_HOST}/antibotswebb/v1/visual_bar_pie`, config);
    const { city, count } = response.data.data;
    console.log("Bar Chart city:", city.slice(0, num));
    console.log("Bar Chart count:", count.slice(0, num));
    return {
      city: city.slice(0, num),
      count: count.slice(0, num),
    };
  } catch (error) {
    console.error("Error fetching bar_pie data:", error);
  }
};
