// frontend/src/features/dashboard/components/DashboardCharts.jsx
import React from 'react';

const DashboardCharts = ({ anomalyCounts = { Pothole: 12, Crack: 24, Rutting: 5 } }) => {
  const maxCount = Math.max(...Object.values(anomalyCounts), 1);

  return (
    <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Anomaly Distribution Density</h4>
        <p className="text-[10px] text-slate-500 font-mono">Real-time classification arrays</p>
      </div>
      <div className="space-y-3">
        {Object.entries(anomalyCounts).map(([label, val]) => {
          const widthPct = (val / maxCount) * 100;
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-300">{label}</span>
                <span className="text-sky-400 font-bold">{val}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${widthPct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCharts;