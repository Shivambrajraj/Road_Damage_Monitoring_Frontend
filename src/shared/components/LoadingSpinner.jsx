// frontend/src/shared/components/LoadingSpinner.jsx
import React from 'react';

/**
 * A reusable, centralized loading indicator driven by Tailwind animation rings
 */
const LoadingSpinner = ({ message = 'Syncing platform matrix...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      {/* Outer dual-ring spinning track */}
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-slate-700 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Dynamic status read out message */}
      <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;