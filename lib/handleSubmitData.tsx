import dayjs from "dayjs";

export default function handleSubmitData( data: any ) {
  const {
    webbSourceType,
    dataSearchType,
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
        dataSearchType: '',
        absoluteDate: {
          startDatetime: '',
          stopDatetime: ''
        },
        relativeDate: {
          timeInMinutes: 0
        },
        project: '',
        logstore: ''
      };
    
    switch (dataSearchType) {
      case "absolute":
        let formatType = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
        if(item.timeType === 'without_date'){
            formatType = 'HH:mm:ss.SSSZ';
        }
        obj.override_setting.dataSearchType = "absolute";
        obj.override_setting.absoluteDate = {
          startDatetime:  dayjs(item.searchStartTime).format(formatType),
          stopDatetime: dayjs(item.searchEndTime).format(formatType),
        };
        obj.override_setting.relativeDate = {
          timeInMinutes: 0,
        };
        break;
      case "relative":
        obj.override_setting.dataSearchType = "relative";
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
                              "dateSearchType": "${dataSearchType}",
                              "absoluteDate": {
                                  "startDatetime": "2023-07-31T13:00:00.000+08:00",
                                  "stopDatetime": "2023-07-31T17:10:00.000+08:00"
                                },
                                "relativeDate": {
                                  "timeInMinutes": 15
                                }
                          },
                          "scheduledInterval": "${scheduledInterval}",
                          "schedule" : ${splStr}
                      }
                  }
              }`;
  return JSON.parse(res);
};