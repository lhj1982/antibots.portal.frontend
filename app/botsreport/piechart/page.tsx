"use client";
import BarChart from "@/app/components/BarChart";
import LaunchChartForm from "@/app/components/LaunchChartForm";
import PieChart from "@/app/components/PieChart";
import { launchEntryLocationData } from "@/lib/chartData";
import { useEffect, useState } from "react";

type chartFormData = {
    "launchId" : string,
    "chartType" : string
}

const PieChartPage = () => {
    const [formData, setFormData] = useState<chartFormData>({launchId:'',chartType:"pie"});

    const handleChartProps = (input: chartFormData) => {
        setFormData(input);
    }

  return (
    <div className="w-full h-full">
      <LaunchChartForm handleChartProps = {handleChartProps}/>
      { formData?.chartType === "pie" && <PieChart/>}
      { formData?.chartType === "bar" && <BarChart/>}
    </div>
  );
};

export default PieChartPage;
