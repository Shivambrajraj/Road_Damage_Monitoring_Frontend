import apiClient from '../../../shared/services/apiClient';

const reportService = {
  getReports: async (filters = {}) => {
    return await apiClient.get('/reports', { params: filters });
  },

  createReport: async (formData) => {
    return await apiClient.post('/reports', formData);
  },

  updateStatus: async (reportId, status) => {
    return await apiClient.patch(`/reports/${reportId}/status`, { status });
  },
};

export default reportService;