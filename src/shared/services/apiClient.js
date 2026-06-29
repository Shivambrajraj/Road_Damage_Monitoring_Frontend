// frontend/src/shared/services/apiClient.js
import axios from 'axios';

// Fallback to local development endpoint if VITE environment variables aren't loaded yet
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15-second deadline safely accommodating slower ML image processing turnarounds
});

// REQUEST INTERCEPTOR: Silently inject secure Authorization tokens into all protected vectors
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Unifies payload unwrapping and structures global error logs cleanly
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const parsedError = {
      message: error.response?.data?.detail || 'A critical network handshake anomaly occurred.',
      status: error.response?.status || 500,
    };

    // Automatically clear local session remnants if authorization expires natively on the server
    if (parsedError.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(parsedError);
  }
);

export default apiClient;