"use client";
import PieChart from "@/app/components/PieChart";
import { launchEntryLocationData } from "@/lib/chartData";
import { useEffect } from "react";

const PieChartPage = () => {
  return (
    <div className="w-full h-full">
      <PieChart/>
    </div>
  );
};

export default PieChartPage;
