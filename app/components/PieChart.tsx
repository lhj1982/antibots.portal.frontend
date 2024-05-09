"use client";
import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import * as echarts from "echarts";
import React, { useEffect, useState } from "react";
import { launchEntryLocationData } from "@/lib/chartData";
import { useLaunchIDStore } from "@/zustand/launchIDStore";

const PieChart = () => {
  const [option, setOption] = useState<any>({});
  const launchId = useLaunchIDStore((state)=> state.launchId);
  useEffect(() => {
    const fetchData = async () => {
      const res = await launchEntryLocationData(launchId);
      const topTen = res?.slice(0, 10);
      let echartsOption = {
        title: {
          text: "Launch Entry Location Top 10",
          left: "center",
          top: 20,
        },
        legend: {
          top: "bottom",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: topTen,
          },
        ],
      };
      setOption(echartsOption);
    };
    fetchData();
  },[launchId]);

  return (
    <div className="w-full h-full">
      <ReactECharts
        option={option}
        lazyUpdate={true}
        style={{ height: "80%" }}
      />
    </div>
  );
};

export default PieChart;
