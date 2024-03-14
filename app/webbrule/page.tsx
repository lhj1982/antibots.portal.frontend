"use client";
import React, { useState } from "react";
import WebbOneTimeForm from "@/app/components/WebbOneTimeForm";
import WebbRecurringForm from "@/app/components/WebbRecurringForm";
import { Tooltip } from "react-tooltip";
import SwitchTab from "../components/SwitchTab";
import { WebbFormData } from "@/type";
import { useFormTypeStore } from "@/zustand/formTypeStore";

export default function WebbRule() {
  const isDefaultFormType = useFormTypeStore(
    (state) => state.isDefaultFormType
  );

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
      },
    ],
  });

  let webbForm;
  if (isDefaultFormType) {
    webbForm = <WebbRecurringForm isUpdate={false} formData={formData} />;
  } else {
    webbForm = <WebbOneTimeForm isUpdate={false} formData={formData} />;
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <SwitchTab />
      <div className="flex justify-center">{webbForm}</div>
      <Tooltip anchorSelect=".type-switch" place="right">
        {isDefaultFormType ? "Recurring" : "One Time"}
      </Tooltip>
    </div>
  );
}
