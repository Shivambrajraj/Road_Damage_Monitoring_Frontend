// frontend/src/shared/utils/formatDate.js

/**
 * Formats an ISO string or Date object into a readable localized string.
 * @param {string|Date} dateString 
 * @returns {string} Formatted date text
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};