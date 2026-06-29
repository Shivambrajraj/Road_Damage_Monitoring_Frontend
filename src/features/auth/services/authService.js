// frontend/src/features/auth/services/authService.js
import apiClient from '../../../shared/services/apiClient';

const authService = {
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },
  
  register: async (credentials) => {
    return await apiClient.post('/auth/register', credentials);
  }
};

export default authService;