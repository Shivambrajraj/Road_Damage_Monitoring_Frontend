// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-16 py-4">
      
      {/* HERO SECTION: Primary Brand Callout */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-8 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full text-sky-400 text-xs font-semibold tracking-wide uppercase">
          <span>🚀 Next-Generation Infrastructure Inspection</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Automated Road Anomaly <br />
          <span className="bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Detection & Analytics
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
          Leverage deep learning models to identify, classify, and map structural surface failures, potholes, and cracks in real time.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-sky-500/15 transition-all text-sm tracking-wide"
            >
              Enter Command Console →
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-sky-500/15 transition-all text-sm tracking-wide"
              >
                Access Portal
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700/80 text-slate-200 font-semibold px-8 py-3.5 rounded-lg border border-slate-700 transition-all text-sm"
              >
                Explore Platform Capabilities
              </a>
            </>
          )}
        </div>
      </section>

      <hr className="border-slate-800/60 max-w-7xl mx-auto" />

      {/* CORE CAPABILITIES GRID MATRIX */}
      <section id="features" className="space-y-12 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Engineered for Municipal Operations
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive pipeline bridging computer vision with geographic information systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all group">
            <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-sky-500/20 transition-colors">
              🧠
            </div>
            <h3 className="text-base font-bold text-white mb-2">Computer Vision Inference</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom trained convolutional architecture built to perform high-confidence classification profiles on surface defects from mobile video arrays.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all group">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-indigo-500/20 transition-colors">
              📍
            </div>
            <h3 className="text-base font-bold text-white mb-2">GIS Spatiotemporal Mapping</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically extract GPS EXIF metadata coordinates from media files to instantly plot severity vectors onto dynamic mapping layouts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all group">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-emerald-500/20 transition-colors">
              📊
            </div>
            <h3 className="text-base font-bold text-white mb-2">Predictive Asset Budgeting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate structural anomaly metrics into high-level analytic dashboards to accurately track deterioration indices over time.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;