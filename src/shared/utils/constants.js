// frontend/src/shared/utils/constants.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const ANOMALY_TYPES = {
  POTHOLE: 'Pothole',
  CRACK: 'Longitudinal Crack',
  RUTTING: 'Rutting'
};

export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};