import { Role } from "@/type";
import { create } from "zustand";

type RoleStore = {
  role: Role;
  setRole: (role: Role) => void;
};

export const useRoleStore = create<RoleStore>((set) => ({
    role: "User" as Role,
    setRole: (role: Role) => {
      window.localStorage.setItem('role', role);
      set(() => ({ role }));
    }
  }));