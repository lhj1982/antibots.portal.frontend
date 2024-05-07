"use client";
import FunnelChart from "@/app/components/FunnelChart";
import LaunchChartForm from "@/app/components/LaunchChartForm";
import { launchEntryFunnelChart } from "@/lib/chartData";
import { chartFormData } from "@/type";
import { useLaunchIDStore } from "@/zustand/launchIDStore";
import { useEffect, useState } from "react";

type FunnelData = {
  "wafEntries": number,
  "entries": number,
  "validEntries": number,
  "selected": number,
  "winners": number
}

const FunnelPage = () => {
  const { setLaunchId } = useLaunchIDStore();
  const launchId = useLaunchIDStore((state)=> state.launchId);
  const [data, setData] = useState({} as FunnelData);

  useEffect(()=>{
    const fetchData = async () => {
      const res = await launchEntryFunnelChart(launchId);
      setData(res);
      console.log(res);
    }
    fetchData();
  },[launchId]);

  const totalWinners = data.winners;
  const totalEntries = data.entries;
  const totalSelected = data.selected;
  const totalValidEntries = data.validEntries;
  const notSelectedEntries = totalValidEntries - totalSelected;
  const invalidEntries = totalEntries - totalValidEntries;
  const totalWafEntries = data.wafEntries;

  return (
    <div className="w-full h-full">
      <LaunchChartForm handleStateUpdate={setLaunchId} launchIdOnly />
      <div className="w-full h-full flex items-center justify-center">
        <FunnelChart
          completed={totalWinners}
          entries={totalEntries}
          invalidEntries={invalidEntries}
          notSelectedEntries={notSelectedEntries}
          selected={totalSelected}
          validEntries={totalValidEntries}
          showFailures
          wafEntries={totalWafEntries}
        />
      </div>
    </div>
  );
};

export default FunnelPage;
