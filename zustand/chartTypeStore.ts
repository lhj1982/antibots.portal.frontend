import { create } from "zustand";

type ChartTypeStore = {
  isDefaultChartType: boolean;
  setChartType: (isDefaultChartType: boolean) => void
}

export const useChartTypeStore = create<ChartTypeStore>((set) => ({
  isDefaultChartType: true,
  setChartType: (isDefaultChartType: boolean) => {
    set(() => ({ isDefaultChartType }));
  },
}));