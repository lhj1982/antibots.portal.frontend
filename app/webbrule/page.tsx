"use client";
import React, { useState } from "react";
import WebbOneTimeForm from "@/app/components/WebbOneTimeForm";
import WebbRecurringForm from "@/app/components/WebbRecurringForm";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Tooltip } from "react-tooltip";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url("data:image/svg+xml,%3Csvg t='1697527695269' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7737' width='20' height='20'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='%23202425' opacity='.01' p-id='7738'%3E%3C/path%3E%3Cpath d='M501.998933 624.401067a34.133333 34.133333 0 0 1-48.264533 0l-112.128-112.128a688.059733 688.059733 0 0 0-15.9744-15.2576C288.324267 462.062933 239.581867 416.426667 244.462933 332.117333c2.901333-49.2544 13.0048-90.077867 22.3232-118.340266 4.949333-15.086933-10.3424-29.866667-23.552-21.0944-67.857067 44.919467-137.728 130.048-159.914666 196.164266-26.692267 79.633067-30.173867 244.292267 88.439466 362.939734l77.2096 77.380266a34.133333 34.133333 0 0 1 0 48.2304l-49.152 49.152a17.066667 17.066667 0 0 0 12.049067 29.149867H546.133333a34.133333 34.133333 0 0 0 34.133334-34.133333v-334.267734a17.066667 17.066667 0 0 0-29.149867-12.049066l-49.117867 49.117866z' fill='%23FF7744' p-id='7739'%3E%3C/path%3E%3Cpath d='M522.001067 399.598933a34.133333 34.133333 0 0 1 48.264533 0l112.128 112.128c4.9152 4.9152 10.308267 9.966933 15.9744 15.2576 37.307733 34.952533 86.050133 80.5888 81.169067 164.864a468.957867 468.957867 0 0 1-22.3232 118.340267c-4.949333 15.086933 10.3424 29.866667 23.552 21.0944 67.857067-44.919467 137.728-130.048 159.914666-196.164267 26.692267-79.633067 30.173867-244.292267-88.439466-362.939733l-77.2096-77.380267a34.133333 34.133333 0 0 1 0-48.2304l49.152-49.152A17.066667 17.066667 0 0 0 812.1344 68.266667H477.866667a34.133333 34.133333 0 0 0-34.133334 34.133333v334.267733a17.066667 17.066667 0 0 0 29.149867 12.049067l49.117867-49.117867z' fill='%23FFAA44' p-id='7740'%3E%3C/path%3E%3C/svg%3E")`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url("data:image/svg+xml,%3Csvg t='1697528259172' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='34234' width='27' height='27'%3E%3Cpath d='M499.014483 162.803002c44.582327 0 87.802877 8.719468 128.461648 25.916767 39.298018 16.621871 74.602855 40.428395 104.931574 70.758138 30.329743 30.329743 54.136268 65.633556 70.758138 104.931574 17.197298 40.658771 25.916767 83.879321 25.916767 128.461648s-8.719468 87.802877-25.916767 128.461648c-16.621871 39.298018-40.428395 74.602855-70.758138 104.931574-30.329743 30.329743-65.633556 54.136268-104.931574 70.758138-40.658771 17.197298-83.879321 25.916767-128.461648 25.916767-44.582327 0-87.802877-8.719468-128.461648-25.916767-39.298018-16.621871-74.602855-40.428395-104.931574-70.758138-30.329743-30.329743-54.136268-65.633556-70.758138-104.931574-17.197298-40.658771-25.916767-83.879321-25.916767-128.461648s8.719468-87.802877 25.916767-128.461648c16.621871-39.298018 40.428395-74.602855 70.758138-104.931574 30.329743-30.329743 65.633556-54.136268 104.931574-70.758138C411.212631 171.52247 454.433181 162.803002 499.014483 162.803002M499.014483 110.559911c-211.144038 0-382.311217 171.166156-382.311217 382.311217s171.166156 382.311217 382.311217 382.311217 382.311217-171.166156 382.311217-382.311217S710.159545 110.559911 499.014483 110.559911L499.014483 110.559911z' fill='%23f68475' p-id='34235'%3E%3C/path%3E%3Cpath d='M497.106972 291.553387l48.981993 0 0 413.399665-64.655739 0c0-78.369755 0-177.617702 0-297.804251-24.827345 18.306174-59.45027 36.582655-103.840105 54.859136l0-62.696009C442.89084 371.881848 482.718211 335.972915 497.106972 291.553387z' fill='%23f68475' p-id='34236'%3E%3C/path%3E%3C/svg%3E")`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function WebbRule() {
  const [defaultFormType, setDefaultFormType] = useState(false);

  let webbForm;
  if (defaultFormType) {
    webbForm = <WebbRecurringForm isUpdate={false}/>;
  } else {
    webbForm = <WebbOneTimeForm isUpdate={false}/>;
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full h-20 bg-slate-200 flex">
        <FormGroup className="pt-4 pl-4">
          <FormControlLabel
            className="type-switch"
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            onChange={(e: any) => setDefaultFormType(e.target.checked)}
            label={<h1 className="text-black">Change Task Type</h1>}
          />
        </FormGroup>
      </div>
      <div className="flex justify-center">{webbForm}</div>
      <Tooltip anchorSelect=".type-switch" place="right">
        {defaultFormType ? "Recurring" : "One Time"}
      </Tooltip>
    </div>
  );
}
