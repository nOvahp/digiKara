
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../auth/tokenService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://digikara.back.adiaweb.dev/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request Interceptor: Attach Token & Log Request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.group(`🚀 API Request: [${config.method?.toUpperCase()}] ${config.url}`);
    console.log("Headers:", config.headers);
    console.log("Payload:", config.data);
    console.log("Params:", config.params);
    console.groupEnd();

    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling & Log Response
apiClient.interceptors.response.use(
  (response) => {
    console.group(`✅ API Response: [${response.status}] ${response.config.url}`);
    console.log("Data:", response.data);
    console.groupEnd();
    return response.data; // Return direct data to simplify calls
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        // Redirect to login on 401 Unauthorized
        window.location.href = '/login'; 
      }
    }
    
    // Normalize error message
    const message = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
    
    console.group(`​​​​​🔴 API Error: [${error.response?.status || 'Unknown'}] ${error.config?.url}`);
    console.error("Message:", message);
    console.error("Full Error Response:", error.response?.data);
    console.groupEnd();
    
    return Promise.reject({ 
      success: false, 
      message, 
      status: error.response?.status,
      originalError: error 
    });
  }
);

export default apiClient;
