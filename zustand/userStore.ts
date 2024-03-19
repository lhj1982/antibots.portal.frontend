import { create } from "zustand";

type UserStore = {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: "H i",
  email: "User@nike.com",
  setUsername: (username: string) => {
    set(() => ({ username }));
  },
  setEmail: (email: string) => {
    set(() => ({ email }));
  },
}));
