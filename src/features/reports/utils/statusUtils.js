// frontend/src/features/reports/utils/statusUtils.js

/**
 * Returns the dynamic Tailwind v4 custom property for status background colors
 */
export const getStatusBadgeClass = (status) => {
  const key = String(status || 'pending').toLowerCase();
  return `bg-(--status-${key})`;
};
