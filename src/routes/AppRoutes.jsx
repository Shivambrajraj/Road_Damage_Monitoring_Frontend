// frontend/src/routes/AppRoutes.jsx
// frontend/src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Blueprint Wrapper Frame
import MainLayout from '../layouts/MainLayout.jsx';

// Core Target Viewports / Pages
import HomePage from '../pages/HomePage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import UploadPage from '../pages/UploadPage.jsx';
import ReportDetailsPage from '../pages/ReportDetailsPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import AnalyticsPage from '../pages/AnalyticsPage.jsx';
import MapPage from '../pages/MapPage.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

// Security Gatekeeper Fence
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* GLOBAL SYSTEM SHELL CONTAINER */}
      <Route path="/" element={<MainLayout />}>
        
        {/* PUBLIC INTERFACE ANCHORS */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* SECURE PROTECTED PATHWAY SEGMENTS */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="reports/:id" element={<ReportDetailsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="map" element={<MapPage />} />
        </Route>

        {/* ADMIN-ONLY PATHWAY SEGMENTS */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>

        {/* 404 CATCH-ALL PROTECTION TERMINALS */}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;