import axios from "axios";

export default async function getWebbRuleItem(fileName: string ){
    let config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('sess')}`,
          User: `${window.localStorage.getItem('email')}`,
          FileName: fileName
        },
      }
    try {
        const response = await axios.get("http://localhost:3001/antibotswebb/v1/display_individual", config);
        const {data} = response.data;
        return data;
    }catch (err){
        console.log(`Fetch Rule content ${fileName} failed , err: ${err}`); 
        throw err;
    }
}