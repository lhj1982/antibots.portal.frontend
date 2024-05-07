import { create } from "zustand";

type LaunchIDStore = {
  launchId: string;
  setLaunchId: (launchId: string) => void;
};

export const useLaunchIDStore = create<LaunchIDStore>((set) => ({
  launchId: "",
  setLaunchId: (launchId) => {
    set(() => ({ launchId }));
    console.log("STATE launchId UPDATED!");
  },
}));
