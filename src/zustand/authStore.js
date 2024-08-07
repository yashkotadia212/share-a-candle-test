import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      auth: { email:null, isAuthorized: false },
      setAuth: (authData) => set({ auth: authData }),
      removeAuth: () => set({ auth: { email:null, isAuthorized: false } }),
    }),
    {
      name: 'auth-storage', // name of the item in local storage
      expires: 1 * 60 * 1000, // save data for 7 days
    }
  )     
);

export default useAuthStore;
