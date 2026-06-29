// frontend/src/features/analytics/components/SeverityChart.jsx
import React from 'react';

const SeverityChart = ({ data = { low: 45, medium: 30, high: 15 } }) => {
  const total = data.low + data.medium + data.high || 1;
  
  const segments = [
    { label: 'High Priority', count: data.high, color: 'bg-(--severity-high)', pct: (data.high / total) * 100 },
    { label: 'Medium Priority', count: data.medium, color: 'bg-(--severity-medium)', pct: (data.medium / total) * 100 },
    { label: 'Low Priority', count: data.low, color: 'bg-(--severity-low)', pct: (data.low / total) * 100 }
  ];

  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-6">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Severity Matrix Layout</h4>
        <p className="text-[10px] text-slate-500 font-mono">Density ratio across cataloged vectors</p>
      </div>

      <div className="space-y-4">
        {segments.map((seg) => (
          <div key={seg.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-sans font-semibold">{seg.label}</span>
              <span className="text-slate-500">{seg.count} items ({seg.pct.toFixed(0)}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
              <div 
                className={`${seg.color} h-full rounded-full transition-all duration-500`}
                style={{ width: `${seg.pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityChart;