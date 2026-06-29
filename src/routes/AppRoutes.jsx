// frontend/src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Blueprint Wrapper Frame
import MainLayout from '../layouts/MainLayout';

// Core Target Viewports / Pages
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import UploadPage from '../pages/UploadPage';
import ReportDetailsPage from '../pages/ReportDetailsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import MapPage from '../pages/MapPage';
import NotFoundPage from '../pages/NotFoundPage';

// Security Gatekeeper Fence
import ProtectedRoute from './ProtectedRoute';

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

        {/* 404 CATCH-ALL PROTECTION TERMINALS */}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;