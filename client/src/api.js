import axios from 'axios';
import { useAuthStore } from './store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().accessToken;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 Unauthorized, token might be expired. Logout user.
    if (error.response?.status === 401 && !originalRequest._retry) {
      useAuthStore.getState().logout();
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
