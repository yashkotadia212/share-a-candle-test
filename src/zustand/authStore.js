import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: {
        email: null,
        token: null,
        userId: null,
        role: null,
      },
      setAuth: (authData) => set({ auth: authData }),
      removeAuth: () =>
        set({
          auth: {
            email: null,
            token: null,
            userId: null,
            role: null,
          },
        }),
    }),
    {
      name: "auth-storage", // name of the item in local storage
      expires: 1 * 60 * 1000, // save data for 7 days
    }
  )
);

export default useAuthStore;
