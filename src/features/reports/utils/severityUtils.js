// frontend/src/features/reports/utils/statusUtils.js
export const getSeverityBorderClass = (severity) => {
  switch (String(severity).toLowerCase()) {
    case 'high':
      return 'border-l-(--severity-high)';
    case 'medium':
      return 'border-l-(--severity-medium)';
    case 'low':
    default:
      return 'border-l-(--severity-low)';
  }
};

/**
 * Returns the matching Tailwind v4 custom property for background color indicators based on severity
 */
export const getSeverityBadgeClass = (severity) => {
  switch (String(severity).toLowerCase()) {
    case 'high':
      return 'bg-(--severity-high)';
    case 'medium':
      return 'bg-(--severity-medium)';
    case 'low':
    default:
      return 'border-l-(--severity-low)';
  }
};

/**
 * Returns the dynamic Tailwind v4 custom property for status background colors
 */
export const getStatusBadgeClass = (status) => {
  const key = String(status || 'pending').toLowerCase();
  return `bg-(--status-${key})`;
};