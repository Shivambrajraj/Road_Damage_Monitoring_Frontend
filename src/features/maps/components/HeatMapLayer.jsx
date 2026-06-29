// frontend/src/features/maps/components/HeatMapLayer.jsx
import React from 'react';

const HeatMapLayer = ({ densityPoints = [] }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
      <div className="flex items-center space-x-2">
        <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
        <span className="text-slate-300">Spatiotemporal Radii Filter: Active</span>
      </div>
      <span className="text-slate-500 text-[10px]">{densityPoints.length} High-Density Hotspots Indexed</span>
    </div>
  );
};

export default HeatMapLayer;