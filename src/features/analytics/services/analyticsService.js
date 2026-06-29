// frontend/src/features/analytics/services/analyticsService.js
import apiClient from '../../../shared/services/apiClient';

const analyticsService = {
  getAnalyticsSummary: async () => {
    return await apiClient.get('/analytics/summary');
  }
};

export default analyticsService;