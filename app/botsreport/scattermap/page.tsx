"use client";
import LaunchChartForm from "@/app/components/LaunchChartForm";
import ScatterMap from "@/app/components/ScatterMap";
import { useLaunchIDStore } from "@/zustand/launchIDStore";

const ScatterMapPage = () => {
  const { setLaunchId } = useLaunchIDStore();

  return (
    <div className="w-full h-full overflow-y-auto">
      <LaunchChartForm handleStateUpdate={setLaunchId} launchIdOnly />
      <ScatterMap />
    </div>
  );
};

export default ScatterMapPage;
