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

export const launchEntryBarChartData = async ( num: number ) => {
    try {
        const response = await axios.get('http://localhost:8000/chart_data/2');
        const { city, count} = response.data;
        console.log('Bar Chart city:', city.slice(0,num));
        console.log('Bar Chart count:', count.slice(0,num));
        return {
            city: city.slice(0, num),
            count: count.slice(0, num)
          };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}