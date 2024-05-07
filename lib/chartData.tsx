import {
  BACKEND_HOST,
  BAR_PIE_PATH,
  FUNNEL_PATH,
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
    const res = response.data.data;
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
    const response = await axios.get( `${BACKEND_HOST}/${BAR_PIE_PATH}`, config);
    const { city, count } = response.data.data;
    return {
      city: city.slice(0, num),
      count: count.slice(0, num),
    };
  } catch (error) {
    console.error("Error fetching bar_pie data:", error);
  }
};

export const launchEntryFunnelChart = async (launchId : string) => {
  try{
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
        User: `${window.localStorage.getItem(LOCAL_STORAGE_EMAIL)}`,
        launchId: `${launchId}`,
      },
    };
    const response = await axios.get( `${BACKEND_HOST}/${FUNNEL_PATH}`, config);
    return response.data.data;
  }catch(error){
    console.error("Error fetching funnel data:", error);
  }
}
