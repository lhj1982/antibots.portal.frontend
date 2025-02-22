"use client";
import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { launchEntryBarChartData } from "@/lib/chartData";
import { useLaunchIDStore } from "@/zustand/launchIDStore";

const BarChart = () => {
  const [option, setOption] = useState<any>({});
  const launchId = useLaunchIDStore((state)=> state.launchId);
  useEffect(() => {
    const fetchData = async () => {
      const res = await launchEntryBarChartData(10, launchId);
      let echartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: res?.city,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: res?.count,
          },
        ],
      };
      setOption(echartsOption);
    };
    fetchData();
  }, [launchId]);
  return (
    <div className="w-full h-full">
      <ReactECharts
        option={option}
        lazyUpdate={true}
        style={{width:"60%", height: "60%" }}
      />
    </div>
  );
};

export default BarChart;