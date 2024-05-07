"use client";
import BarChart from "@/app/components/BarChart";
import LaunchChartForm from "@/app/components/LaunchChartForm";
import PieChart from "@/app/components/PieChart";
import { useLaunchIDStore } from "@/zustand/launchIDStore";
import { useChartTypeStore } from "@/zustand/chartTypeStore";


const PieChartPage = () => {
    const { setLaunchId } = useLaunchIDStore();
    const chartTypeState = useChartTypeStore((state)=>state.isDefaultChartType);
  return (
    <div className="w-full h-full">
      <LaunchChartForm handleStateUpdate={setLaunchId} launchIdOnly={false}/>
      { chartTypeState == true && <PieChart/>}
      { chartTypeState == false && <BarChart/>}
    </div>
  );
};

export default PieChartPage;
