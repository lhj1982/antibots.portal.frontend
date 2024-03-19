"use client";
import React, { useState } from "react";
import WebbOneTimeForm from "@/app/components/WebbOneTimeForm";
import WebbRecurringForm from "@/app/components/WebbRecurringForm";
import { Tooltip } from "react-tooltip";
import SwitchTab from "../components/SwitchTab";
import { WebbFormData } from "@/type";

export default function WebbRule() {
  const [defaultFormType, setDefaultFormType] = useState(false);
  const [formData, setFormData] = useState<WebbFormData>({
    fileName: "",
    webbSourceType: "",
    taskType: "",
    dateSearchType: "",
    scheduleIntervals: "",
    spl_config: [
      {
        ruleId: "",
        spl: "",
        ttl: 0,
        destination: [],
        action: "",
        nameSpace: "",
      }
    ],
  });

  function handleSetDefaultFormType(isRecurring: boolean) {
    setDefaultFormType(isRecurring);
  }

  let webbForm;
  if (defaultFormType) {
    webbForm = <WebbRecurringForm isUpdate={false} formData={formData} />;
  } else {
    webbForm = <WebbOneTimeForm isUpdate={false} formData={formData} />;
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <SwitchTab
        taskType={defaultFormType}
        setTaskType={handleSetDefaultFormType}
      />
      <div className="flex justify-center">{webbForm}</div>
      <Tooltip anchorSelect=".type-switch" place="right">
        {defaultFormType ? "Recurring" : "One Time"}
      </Tooltip>
    </div>
  );
}
