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

export const REPORT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const REPORT_STATUS_LABELS = {
  pending: 'Pending Review',
  verified: 'Verified',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  rejected: 'Rejected',
};