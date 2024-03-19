import dayjs from "dayjs";
import axios from "axios";
import { GeneratedSpl } from "@/type";
import { BACKEND_HOST, WEBBRULE_UPLOAD_PATH } from "@/utils/constants";
import { useUserStore } from "@/zustand/userStore";

function generateData(data: any) {
  const {
    webbSourceType,
    dateSearchType,
    taskType,
    spl_config,
    scheduleIntervals,
    timeType,
  } = data;

  // console.log("SPL: ", spl_config);

  let splArr: Array<GeneratedSpl> = [];

  spl_config.forEach((item: any) => {
    let obj: GeneratedSpl = {} as GeneratedSpl;
    obj.enable = true;
    obj.spl = item.spl;
    obj.ruleId = item.ruleId;
    obj.destination = item.destination;
    obj.action = item.action;
    obj.nameSpace = item.nameSpace;
    obj.expiration = item.ttl;
    obj.project = item.project;
    obj.logstore = item.logstore;
    obj.override_setting = {
      dateSearchType: "",
      absoluteDate: {
        startDatetime: "",
        stopDatetime: "",
      },
      relativeDate: {
        timeInMinutes: 0,
      }
    };

    switch (dateSearchType) {
      case "absolute":
        let formatType = "YYYY-MM-DDTHH:mm:ss.SSSZ";
        if (data.timeType === "without_date") {
          formatType = "HH:mm:ss.SSSZ";
        }
        obj.override_setting.dateSearchType = "absolute";
        obj.override_setting.absoluteDate = {
          startDatetime: dayjs(item.searchStartTime).format(formatType),
          stopDatetime: dayjs(item.searchEndTime).format(formatType),
        };
        obj.override_setting.relativeDate = {
          timeInMinutes: 0,
        };
        break;
      case "relative":
        obj.override_setting.dateSearchType = "relative";
        obj.override_setting.absoluteDate = {
          startDatetime: "",
          stopDatetime: "",
        };
        obj.override_setting.relativeDate = {
          timeInMinutes: item.searchTimeRange,
        };
        break;
      default:
        break;
    }

    if (webbSourceType === "ali-sls") {
      obj.project = item.project;
      obj.logstore = item.logstore;
    }

    splArr.push(obj);
  });

  let splStr = JSON.stringify(splArr);

  let res = `{
                  "${webbSourceType}": {
                      "${taskType}" : {
                          "enable": true,
                          "default_setting": {
                              "dateSearchType": "${dateSearchType}",
                              "absoluteDate": {
                                  "startDatetime": "2023-07-31T13:00:00.000+08:00",
                                  "stopDatetime": "2023-07-31T17:10:00.000+08:00"
                                },
                                "relativeDate": {
                                  "timeInMinutes": 15
                                }
                          },
                          "scheduleIntervals": "${scheduleIntervals}",
                          "schedule" : ${splStr}
                      }
                  }
              }`;
  var postData = {}
  try {
    // console.log('before res:',res);
    postData = JSON.parse(res);
  } catch (error) {
    console.log('Catch Generate JSON.parse error:',error);
  }
  return postData
}

export default async function handleSubmitData(
  searchType: string,
  fileName: string,
  data: any
) {
  let generatedData = {};
  try {
    generatedData = generateData(data);
  } catch (error) {
    console.log('catch handleSubmitData error: ', error);
  }
  // const generatedData = generateData(data);
  // console.log("Generated Data: ", generatedData);
  // http://localhost:3001/antibotswebb/v1/upload
  const response = await axios.post(
    `${BACKEND_HOST}/${WEBBRULE_UPLOAD_PATH}`,
    generatedData,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("sess")}`,
        FileName: fileName,
        "Search-Type": searchType,
        User: `${window.localStorage.getItem("email")}`,
      },
    }
  );
  // console.log("response: ", response);
  return response;
}
