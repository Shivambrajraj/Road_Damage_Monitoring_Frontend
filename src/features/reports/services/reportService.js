// frontend/src/features/reports/services/reportService.js
import apiClient from '../../../shared/services/apiClient';

const reportService = {
  getReports: async (filters = {}) => {
    return await apiClient.get('/reports', { params: filters });
  },

  createReport: async (formData) => {
    // FIX #5: Headers object omitted to allow custom automated boundaries configuration
    return await apiClient.post('/reports', formData);
  }
};

export default reportService;