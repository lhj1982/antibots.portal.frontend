import {
  GeneratedSpl,
  RawSpl,
  WebbBreakDownObj,
  WebbFormData,
  WebbGlobalFields,
  WebbRuleContent,
} from "@/type";
import dayjs, { Dayjs } from "dayjs";

export function processWebbRuleGlobalFields(fileContent: Object) {
  let res: WebbGlobalFields = {
    fileName: "",
    webbSourceType: "",
    formType: "",
    taskType: "",
    dateSearchType: "",
    scheduleIntervals: "",
  };
  res.webbSourceType = Object.keys(fileContent)[0];
  let formTypeObj: Object = (fileContent as any)[res.webbSourceType] as Object;

  if (formTypeObj && typeof formTypeObj === "object") {
    res.taskType = Object.keys(formTypeObj)[0];
  } else {
    res.taskType = "formType not found";
  }
  return res;
}

export function processWebbRuleSpls(
  fileContent: WebbRuleContent,
  webbSourceType: string,
  taskType: string
) {
  let res: Array<GeneratedSpl> = [];
  let webbBreakDownObj: WebbBreakDownObj =
    fileContent[webbSourceType][taskType];
  let scheduleSpls = webbBreakDownObj.schedule;
  scheduleSpls.forEach((item: GeneratedSpl) => {
    res.push(item);
  });
  return res;
}

export function generateFormData(
  globalFields: WebbGlobalFields,
  splArr: Array<GeneratedSpl>
) {
  let webbFormData: WebbFormData = {
    fileName: "",
    webbSourceType: "",
    taskType: "",
    dateSearchType: "",
    scheduleIntervals: "",
    spl_config: [],
  };
  webbFormData.dateSearchType = globalFields.dateSearchType;
  webbFormData.taskType = globalFields.taskType;
  webbFormData.fileName = globalFields.fileName;
  webbFormData.webbSourceType = globalFields.webbSourceType;
  webbFormData.scheduleIntervals = globalFields.scheduleIntervals;

  const splItems: Array<RawSpl> = splArr.map((generatedSpl) => {
    let rawSpl: RawSpl = {
      ruleId: "",
      spl: "",
      ttl: 0,
      destination: [],
      action: "",
      nameSpace: "",
    };

    rawSpl.ruleId = generatedSpl.ruleId;
    rawSpl.spl = generatedSpl.spl;
    rawSpl.ttl = generatedSpl.expiration;
    rawSpl.destination = generatedSpl.destination;
    rawSpl.nameSpace = generatedSpl.nameSpace;
    rawSpl.action = generatedSpl.action;
    rawSpl.project = generatedSpl.project;
    rawSpl.logstore = generatedSpl.logstore;

    if (
      globalFields.dateSearchType === "absolute" &&
      generatedSpl.override_setting.absoluteDate.startDatetime.includes("T") &&
      generatedSpl.override_setting.absoluteDate.stopDatetime.includes("T")
    ) {
      webbFormData.timeType = "with_date";
      console.log("Time With Date");
      rawSpl.searchStartTime = dayjs(
        generatedSpl.override_setting.absoluteDate.startDatetime
      );
      rawSpl.searchEndTime = dayjs(
        generatedSpl.override_setting.absoluteDate.stopDatetime
      );
    } else if (
      globalFields.dateSearchType === "absolute" &&
      !generatedSpl.override_setting.absoluteDate.startDatetime.includes("T") &&
      !generatedSpl.override_setting.absoluteDate.stopDatetime.includes("T")
    ) {
      webbFormData.timeType = "without_date";
      rawSpl.searchStartTime = dayjs(
        generatedSpl.override_setting.absoluteDate.startDatetime.split(".")[0],
        "HH:mm:ss"
      );
      rawSpl.searchEndTime = dayjs(
        generatedSpl.override_setting.absoluteDate.stopDatetime.split(".")[0],
        "HH:mm:ss"
      );
    } else {
      console.log("Time invalid");
    }

    rawSpl.searchTimeRange =
      generatedSpl.override_setting.relativeDate.timeInMinutes;

    return rawSpl;
  });
  webbFormData.spl_config = splItems;
  return webbFormData;
}
