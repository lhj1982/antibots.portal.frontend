import { JSON_SERVER_PATH } from "@/utils/constants";
import axios from "axios";

export const launchEntryLocationData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/chart_data/1');
        const { launch_location } = response.data;
        console.log('Received data:', launch_location);
        return launch_location;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}