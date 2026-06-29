// frontend/src/shared/components/Footer.jsx
import React from 'react';

/**
 * Universal application footer containing metadata footprints and status indicators
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Institutional Copyright Group */}
        <div className="text-xs text-slate-500 font-medium">
          &copy; {currentYear} RoadAnomalyAI. Automated Infrastructure Inspection Analytics.
        </div>

        {/* Dynamic Status Engine Badges */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
              Core Engine Live
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            v1.0.0-Beta
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;