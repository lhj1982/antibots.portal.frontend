import axios, { CancelTokenSource } from "axios";

export default async function deleteWebbRuleItem(fileName: string){
    let config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('sess')}`,
          User: `${window.localStorage.getItem('email')}`,
          FileName: fileName
        },
      }
    try {
        const response = await axios.delete("http://localhost:3001/antibotswebb/v1/delete", config);
        const {data} = response.data;
        return data;
    }catch (err){
        console.log(`Delete Rule ${fileName} failed , err: ${err}`); 
        throw err;
    }
}