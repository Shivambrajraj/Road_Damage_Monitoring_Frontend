// frontend/src/features/auth/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login({ username: email, password });

    if (data && data.access_token) {
      const sessionUser = { username: data.username || email, isAdmin: !!data.is_admin };
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(sessionUser));
      setIsAuthenticated(true);
      setUser(sessionUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Step 1: request an OTP be emailed to this address
  const sendOtp = async (email) => {
    return await authService.sendOtp(email);
  };

  // Step 2: verify the code the user typed. Returns the verification_token
  // string needed to finish registration.
  const verifyOtp = async (email, otp) => {
    const data = await authService.verifyOtp(email, otp);
    return data.verification_token;
  };

  // Step 3: create the account using the OTP-verified token, then log in.
  const register = async (email, password, verificationToken) => {
    try {
      const data = await authService.register({
        email,
        username: email,
        password,
        verification_token: verificationToken,
      });

      if (data && data.access_token) {
        const sessionUser = { username: data.username || email, isAdmin: !!data.is_admin };
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(sessionUser));
        setIsAuthenticated(true);
        setUser(sessionUser);
      }
      return true;
    } catch (err) {
      throw new Error(err.message || 'Account registration sequence failed.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isAdmin: !!user?.isAdmin,
        login,
        register,
        sendOtp,
        verifyOtp,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be nested inside an AuthProvider.');
  return context;
};