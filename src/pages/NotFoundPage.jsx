// frontend/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Structural fallback boundary viewport protecting application routes from dead endpoints
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6 animate-fade-in">
      
      {/* Visual Indicator Block */}
      <div className="space-y-2">
        <div className="text-6xl animate-bounce">🚧</div>
        <h1 className="text-5xl font-black text-white tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-300 tracking-tight">Sector Vector Out of Bounds</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          The administrative path index you requested does not map to any known structural dataset or operational canvas.
        </p>
      </div>

      {/* Redirect Safe Action */}
      <div>
        <Link
          to="/"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-6 py-3 rounded-lg border border-slate-700 transition-all shadow-md"
        >
          ← Return to Landing Sector
        </Link>
      </div>

    </div>
  );
};

export default NotFoundPage;