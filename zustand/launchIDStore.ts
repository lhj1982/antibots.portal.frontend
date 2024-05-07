import { create } from "zustand";

type LaunchIDStore = {
  launchId: string;
  setLaunchId: (launchId: string) => void;
};

export const useLaunchIDStore = create<LaunchIDStore>((set) => ({
  launchId: "537024e5-791f-372d-9565-4f49e4e49db0",
  setLaunchId: (launchId) => {
    set(() => ({ launchId }));
  },
}));
