"use client";
import FunnelChart from "@/app/components/FunnelChart";
import LaunchChartForm from "@/app/components/LaunchChartForm";
import { chartFormData } from "@/type";
import { useState } from "react";

const FunnelPage = () => {
  const totalWinners = 2000;
  const totalEntries = 718523;
  const totalSelected = 3387;
  const totalValidEntries = 718523;
  const notSelectedEntries = totalValidEntries - totalSelected;
  const invalidEntries = totalEntries - totalValidEntries;

  const [formData, setFormData] = useState<chartFormData>({ launchId: "" });

  const handleChartProps = (input: chartFormData) => {
    setFormData(input);
  };

  return (
    <div className="w-full h-full">
      <LaunchChartForm handleChartProps={handleChartProps} launchIdOnly />
      <div className="w-full h-full flex items-center justify-center">
        <FunnelChart
          completed={totalWinners}
          entries={totalEntries}
          invalidEntries={invalidEntries}
          notSelectedEntries={notSelectedEntries}
          selected={totalSelected}
          validEntries={totalValidEntries}
          showFailures
          test={900000}
        />
      </div>
    </div>
  );
};

export default FunnelPage;
