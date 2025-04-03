import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "Auth-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export {useAuthStore};