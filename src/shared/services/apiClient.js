// frontend/src/shared/services/apiClient.js
import axios from 'axios';

// Fallback to local development endpoint if VITE environment variables aren't loaded yet
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  // No default Content-Type here on purpose: axios auto-sets
  // 'application/json' for plain objects and 'multipart/form-data'
  // (with the correct boundary) for FormData uploads. Hardcoding
  // 'application/json' here used to override that and break file uploads.
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
    const rawDetail = error.response?.data?.detail;
    let message = 'A critical network handshake anomaly occurred.';

    if (typeof rawDetail === 'string') {
      // Normal case: backend sent a plain error message
      message = rawDetail;
    } else if (Array.isArray(rawDetail)) {
      // FastAPI validation errors (422) come back as an array of
      // { loc, msg, type } objects, not a string. Rendering that array
      // directly as a React child crashes the page, so flatten it here.
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