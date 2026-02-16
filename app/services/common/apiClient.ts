import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../auth/tokenService';
import { normalizeRequestData } from '@/lib/number';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://digikara.back.adiaweb.dev/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach Token & Log Request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Normalize params and data
    if (config.params) {
      config.params = normalizeRequestData(config.params);
    }

    if (config.data) {
      config.data = normalizeRequestData(config.data);
    }

    if (process.env.NODE_ENV === 'development') {
      console.group(`🚀 API Request: [${config.method?.toUpperCase()}] ${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Payload:', config.data);
      console.groupEnd();
    }

    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor: Global Error Handling & Log Response
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`✅ API Response: [${response.status}] ${response.config.url}`);
      console.log('Data:', response.data);
      console.groupEnd();
    }
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const message =
      (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred';

    if (process.env.NODE_ENV === 'development') {
      console.group(
        `🔴 API Error: [${error.response?.status || 'Unknown'}] ${error.config?.url}`,
      );
      console.error('Message:', message);
      console.groupEnd();
    }

    return Promise.reject({
      success: false,
      message,
      status: error.response?.status,
      originalError: error,
    });
  },
);

// Typed API Client Wrapper
const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config) as Promise<T>,
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config) as Promise<T>,
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config) as Promise<T>,
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config) as Promise<T>,
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config) as Promise<T>,
};

export default apiClient;
