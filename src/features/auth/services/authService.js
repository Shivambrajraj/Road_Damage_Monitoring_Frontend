// frontend/src/features/auth/services/authService.js
import apiClient from '../../../shared/services/apiClient';

const authService = {
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },

  // Step 1 of registration: email a 6-digit code to the user
  sendOtp: async (email) => {
    return await apiClient.post('/auth/send-otp', { email });
  },

  // Step 2 of registration: check the code the user typed in.
  // Returns { verification_token } used by register() below.
  verifyOtp: async (email, otp) => {
    return await apiClient.post('/auth/verify-otp', { email, otp });
  },

  // Step 3 of registration: create the account. Requires the
  // verification_token proving the email OTP step already passed.
  register: async (credentials) => {
    return await apiClient.post('/auth/register', credentials);
  },
};

export default authService;