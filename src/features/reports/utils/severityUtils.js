// frontend/src/features/reports/utils/severityUtils.js

/**
 * Returns the matching Tailwind v4 custom property property for border styling
 */
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
 * Returns the matching Tailwind v4 custom property for background color indicators
 */
export const getSeverityBadgeClass = (severity) => {
  switch (String(severity).toLowerCase()) {
    case 'high':
      return 'bg-(--severity-high)';
    case 'medium':
      return 'bg-(--severity-medium)';
    case 'low':
    default:
      return 'bg-(--severity-low)';
  }
};