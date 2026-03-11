import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  language: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      language: 'zh',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'yibu-storage',
    }
  )
);
