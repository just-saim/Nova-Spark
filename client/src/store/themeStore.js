import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
      },

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },

      initTheme: () => {
        const stored = localStorage.getItem('novaspark-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = stored ? JSON.parse(stored).state.theme : (systemDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      }
    }),
    { name: 'novaspark-theme', partialize: (state) => ({ theme: state.theme }) }
  )
);
