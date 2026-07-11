// frontend/src/routes/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import LoadingSpinner from '../shared/components/LoadingSpinner';

// Client-side gate for the admin section. This only controls what the UI
// shows/hides — every admin API call is independently re-checked against
// `is_admin` on the backend (see verify_admin_privileges), so this can't
// be bypassed to gain real access, only to see the admin nav link.
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <LoadingSpinner message="Checking administrative clearance..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default AdminRoute;