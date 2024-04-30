"use client";
import { launchEntryLocationData } from "@/lib/chartData";
import { useEffect } from "react";

const PieChart = () => {
    useEffect(()=> {
        const fetchData = async () => {
            await launchEntryLocationData();
        }
        fetchData();
    })
    return <h1>Pie Chart</h1>
}

export default PieChart;