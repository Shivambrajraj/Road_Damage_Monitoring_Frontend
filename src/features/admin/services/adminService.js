// frontend/src/features/admin/services/adminService.js
import apiClient from '../../../shared/services/apiClient';

const adminService = {
  getStats: async () => {
    return await apiClient.get('/admin/stats');
  },

  getUsers: async () => {
    return await apiClient.get('/admin/users');
  },

  setUserActive: async (userId, isActive) => {
    return await apiClient.patch(`/admin/users/${userId}/active`, null, {
      params: { is_active: isActive },
    });
  },

  setUserAdmin: async (userId, isAdmin) => {
    return await apiClient.patch(`/admin/users/${userId}/admin`, null, {
      params: { is_admin: isAdmin },
    });
  },

  getAllReports: async () => {
    return await apiClient.get('/reports/admin/all');
  },
};

export default adminService;