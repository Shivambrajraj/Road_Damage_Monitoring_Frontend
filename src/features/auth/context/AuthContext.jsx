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
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({ username: email }));
      setIsAuthenticated(true);
      setUser({ username: email });
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

const register = async (email, password) => {
  try {
    const data = await authService.register({ 
      email: email, 
      username: email, 
      password: password 
    });
    return true;
  } catch (err) {
    throw new Error(err.response?.data?.detail || 'Account registration sequence failed.');
  }
};

  return (
    // FIX 2: Added 'register' into the provider values stream so pages can capture it
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be nested inside an AuthProvider.');
  return context;
};