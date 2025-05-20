import { create } from "zustand";

export enum NavItems {
  BILLING_CENTER = "billing_center",
  SERVICE_DESK = "service_desk",
}

type NavState = {
  activeNav: NavItems | null;
  setActiveNav: (id: NavItems | null) => void;
};

export const useNavStore = create<NavState>((set) => ({
  activeNav: null,
  setActiveNav: (id) => set({ activeNav: id }),
}));
