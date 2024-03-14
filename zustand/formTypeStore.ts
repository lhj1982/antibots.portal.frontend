import { create } from "zustand";

type FormTypeStore = {
  isDefaultFormType: boolean;
  setFormType: (isDefaultFormType: boolean) => void
}

export const useFormTypeStore = create<FormTypeStore>((set) => ({
  isDefaultFormType: false,
  setFormType: (isDefaultFormType: boolean) => {
    set(() => ({ isDefaultFormType }));
  },
}));
