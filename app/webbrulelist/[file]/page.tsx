"use client";
import getWebbRuleItem from "@/lib/getWebbRuleItem";
import React, { useEffect, useState } from "react";
import {
  processWebbRuleSpls,
  processWebbRuleGlobalFields,
  generateFormData,
} from "@/lib/processWebbRuleContent";
import WebbOneTimeForm from "@/app/components/WebbOneTimeForm";
import WebbRecurringForm from "@/app/components/WebbRecurringForm";
import { GeneratedSpl, WebbFormData, WebbGlobalFields, WebbRuleContent } from "@/type";

type Params = {
  params: {
    file: string;
  };
};

const WebbRuleDetail = ({ params: { file } }: Params) => {
  const [ruleContent, setRuleContent] = useState<WebbRuleContent>({});
  const [formData, setFormData] = useState<WebbFormData>({
    fileName: "",
    webbSourceType: "",
    taskType: "",
    dateSearchType: "",
    scheduleIntervals: "",
    spl_config: [],
  });
  const [formType, setFormType] = useState("");

  let fileName = file.replace("_", "/");

  async function getData(fileName: string) {
    try {
      console.log("fileName: " + fileName);
      const fileContent: WebbRuleContent = await getWebbRuleItem(fileName);
      console.log("Get Data finished: ", fileContent);
      const globalFields: WebbGlobalFields =
        processWebbRuleGlobalFields(fileContent);
      globalFields.formType = fileName.split("/")[0];
      setFormType(globalFields.formType);
      globalFields.fileName = fileName.split("/")[1].split('.')[0];
      globalFields.scheduleIntervals =
        fileContent[globalFields.webbSourceType][
          globalFields.taskType
        ].scheduleIntervals;
      const splArr: Array<GeneratedSpl> = processWebbRuleSpls(
        fileContent,
        globalFields.webbSourceType,
        globalFields.taskType
      );
      globalFields.dateSearchType = splArr[0].override_setting.dateSearchType;
      console.log("Spl Arrays: ", splArr);
      console.log("Global fields: ", globalFields);
      setRuleContent(fileContent);
      const formData = generateFormData(globalFields, splArr);
      setFormData(formData);
      console.log("Form data: ", formData);
    } catch (e) {
      alert("Error: Fetch file content failed");
    }
  }

  useEffect(() => {
    getData(fileName);
  }, [fileName]);

  const updateForm =
    formType === "schedule-onetime" ? (
      <WebbOneTimeForm isUpdate={true} formData={formData} />
    ) : (
      <WebbRecurringForm isUpdate={true} formData={formData} />
    );

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="flex justify-center">{updateForm}</div>
    </div>
  );
};

export default WebbRuleDetail;
