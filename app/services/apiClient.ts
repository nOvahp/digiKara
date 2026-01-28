
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from './tokenService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://digikara.back.adiaweb.dev/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return direct data to simplify calls
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        // Optional: Redirect to login or dispatch a global event
        // window.location.href = '/login'; 
      }
    }
    
    // Normalize error message
    const message = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
    console.error(`API Error [${error.config?.url}]:`, message);
    
    return Promise.reject({ 
      success: false, 
      message, 
      status: error.response?.status,
      originalError: error 
    });
  }
);

export default apiClient;

