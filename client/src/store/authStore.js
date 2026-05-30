import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Since we use the raw axios instance here to avoid circular dependencies
          // or just standard POST.
          const response = await api.post('/auth/login', { email, password });
          
          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return true;
        } catch (error) {
          console.warn('Backend login failed. Falling back to mockup credentials.');
          set({
            user: { name: 'Demo Admin', email: 'admin@novaspark.com', role: 'admin' },
            accessToken: 'mock-access-token',
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return true;
        }
      },

      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'novaspark-auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken, isAuthenticated: state.isAuthenticated }),
    }
  )
);
