// frontend/src/shared/services/apiClient.js
import axios from 'axios';

// Check for both common naming conventions to ensure the production endpoint maps correctly
const rawBaseURL = 
  import.meta.env.VITE_API_BASE_URL ||  
  'https://road-damage-monitoring-backend.onrender.com/api/v1';

// Dynamic string check: Ensures that no matter what URL is provided, it terminates gracefully with a trailing slash
const BASE_URL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  // No default Content-Type here on purpose: axios auto-sets
  // 'application/json' for plain objects and 'multipart/form-data'
  // (with the correct boundary) for FormData uploads.
  timeout: 60000, // Extended to 60 seconds to comfortably survive Render's Free Tier container wake-up delay
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
    const rawDetail = error.response?.data?.detail;
    let message = 'A critical network handshake anomaly occurred.';

    if (typeof rawDetail === 'string') {
      // Normal case: backend sent a plain error message
      message = rawDetail;
    } else if (Array.isArray(rawDetail)) {
      // FastAPI validation errors (422) come back as an array of
      // { loc, msg, type } objects, not a string.
      message = rawDetail.map((d) => d.msg).join(', ');
    } else if (rawDetail && typeof rawDetail === 'object') {
      message = JSON.stringify(rawDetail);
    }

    const parsedError = {
      message,
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