"use client";
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-extension-gmap";
import { useLoadScript } from "@react-google-maps/api";
import { launchEntryLocationData } from "@/lib/chartData";
import geoCoording from "@/geo.json";
import { useLaunchIDStore } from "@/zustand/launchIDStore";

interface GeoCoordMap {
  [name: string]: [number, number];
}

const ScatterMap = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState<any>([]);

  const launchIdState = useLaunchIDStore((state) => state.launchId);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAp-Koaq2mnOesg_aUVDLVJ2-z7sRlEApo",
    libraries: ["marker", "places"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await launchEntryLocationData(launchIdState);
        setData(res);
      } catch (err) {
        console.error("Error fetching geo data:", err);
      }
    };
    fetchData();
  }, [launchIdState]);

  useEffect(() => {
    if (data.length >= 0 && isLoaded) {
      const geoCoordMap = geoCoording as unknown as GeoCoordMap;

      const convertData = (data: any) => {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      const option = {
        gmap: {
          center: [103.39, 36.9],
          zoom: 5,
          renderOnMoving: true,
          echartsLayerZIndex: 3000,
          roam: true,
          mapId: "f72634be886956d4",
        },
        emphasis: {
          focus: "self",
        },
        tooltip: {
          trigger: "item",
        },
        animation: true,
        series: [
          {
            name: "Entry Count",
            type: "scatter",
            coordinateSystem: "gmap",
            data: convertData(data),
            symbolSize: (val: any) => {
              {
                let size = val[2];
                size = Math.max(0, Math.min(200, size));
                if (size >= 100000) {
                  return size / 10000;
                } else if (size >= 10000) {
                  return size / 1000;
                } else if (size >= 1000) {
                  return size / 100;
                } else if (size >= 100) {
                  return size / 10;
                }else if (size <100 && size >= 10){
                  return size / 5;
                } else {
                  return size;
                }
              }
            },
            encode: {
              value: 2,
              lng: 0,
              lat: 1,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            itemStyle: {
              color: "#115FFA",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "gmap",
            data: convertData(
              data
                .sort(
                  (
                    a: { name: string; value: number },
                    b: { name: string; value: number }
                  ) => b.value - a.value
                )
                .slice(0, 6)
            ),
            symbolSize: (val: any) => {
              {
                let size = val[2];
                size = Math.max(0, Math.min(200, size));
                if (size >= 100000) {
                  return size / 10000;
                } else if (size >= 10000) {
                  return size / 1000;
                } else if (size >= 1000) {
                  return size / 100;
                } else if (size >= 100) {
                  return size / 10;
                }else if (size <100 && size >= 10){
                  return size / 3;
                } else {
                  return size;
                }
              }
            },
            encode: {
              value: 2,
              lng: 0,
              lat: 1,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#FCC628",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
      const initChart = () => {
        const chart = echarts.init(chartRef.current);
        chart.setOption(option);

        const model = (chart as any).getModel();
        const gmap = model.getComponent("gmap").getGoogleMap();
        const markerOptions = {
          position: gmap.getCenter(),
          map: gmap,
        };
        const marker = new google.maps.marker.AdvancedMarkerElement(
          markerOptions
        );
      };
      if (isLoaded) {
        initChart();
      }
    }
  }, [isLoaded, data]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default ScatterMap;
