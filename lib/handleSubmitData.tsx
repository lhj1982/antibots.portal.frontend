import dayjs from "dayjs";
import axios from "axios";

function generateData(data: any) {
  const {
    webbSourceType,
    dateSearchType,
    taskType,
    spl_config,
    scheduledInterval,
  } = data;

  let splArr: Array<Spl> = [];

  spl_config.forEach((item: any) => {
    let obj: Spl = {} as Spl;
    obj.enable = true;
    obj.spl = item.spl;
    obj.ruleId = item.ruleId;
    obj.destination = item.destination;
    obj.action = item.action;
    obj.nameSpace = item.nameSpace;
    obj.expiration = item.ttl;
    obj.override_setting = {
      dateSearchType: "",
      absoluteDate: {
        startDatetime: "",
        stopDatetime: "",
      },
      relativeDate: {
        timeInMinutes: 0,
      },
      project: "",
      logstore: "",
    };

    switch (dateSearchType) {
      case "absolute":
        let formatType = "YYYY-MM-DDTHH:mm:ss.SSSZ";
        if (item.timeType === "without_date") {
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
      obj.override_setting.project = item.project;
      obj.override_setting.logstore = item.logstore;
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
                          "scheduleIntervals": "${scheduledInterval}",
                          "schedule" : ${splStr}
                      }
                  }
              }`;
  return JSON.parse(res);
}

export default async function handleSubmitData(
  searchType: string,
  fileName: string,
  data: any
) {
  const generatedData = generateData(data);
  console.log("Generated Data: ", generatedData);
  const response = await axios.post("http://localhost:3001/antibotswebb/v1/upload", generatedData, {
    headers: { 
        "Authorization": `Bearer ${window.localStorage.getItem('sess')}`,
        "FileName": fileName, 
        "Search-Type": searchType,
        "User": `${window.localStorage.getItem('email')}`
    },
  });
  return response;
}
