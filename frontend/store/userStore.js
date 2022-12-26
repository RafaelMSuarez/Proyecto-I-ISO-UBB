import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userId: "",
      name: "",
      setId: (userId) => set({ userId }),
      setName: (name) => set({ name }),
    }),
    {
      name: "user",
      getStorage: () => localStorage,
    }
  )
);
