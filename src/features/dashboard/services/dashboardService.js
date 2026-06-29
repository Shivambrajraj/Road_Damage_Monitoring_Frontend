// frontend/src/features/dashboard/services/dashboardService.js
import apiClient from '../../../shared/services/apiClient';

const dashboardService = {
  getDashboardStats: async () => {
    return await apiClient.get('/dashboard/stats');
  }
};

export default dashboardService;