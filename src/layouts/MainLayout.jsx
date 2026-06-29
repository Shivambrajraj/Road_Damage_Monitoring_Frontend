// frontend/src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Primary Global Header Anchor Navigation Matrix */}
      <Navbar />

      {/* Dynamic Viewport View Slot */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-2 sm:p-6 min-h-[calc(100vh-12rem)]">
          <Outlet />
        </div>
      </main>

      {/* Administrative System Footer */}
      <footer className="bg-slate-950 border-t border-slate-900/60 py-6 text-center text-[11px] text-slate-600 font-mono tracking-wide">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 RoadAnomalyAI — Infrastructure Inspection Platform</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              CORE WORKSPACE STABLE
            </span>
            <span className="text-slate-700">|</span>
            <span>v1.0.0-Beta</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MainLayout;
