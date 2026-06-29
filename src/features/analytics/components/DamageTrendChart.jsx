// frontend/src/features/analytics/components/DamageTrendChart.jsx
import React from 'react';

const DamageTrendChart = ({ trends = [
  { month: 'Jan', count: 12 }, { month: 'Feb', count: 19 }, 
  { month: 'Mar', count: 8 },  { month: 'Apr', count: 15 }, 
  { month: 'May', count: 24 }, { month: 'Jun', count: 31 }
] }) => {
  const maxVal = Math.max(...trends.map(t => t.count), 1);

  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historical Detection Timeline</h4>
        <p className="text-[10px] text-slate-500 font-mono">Month-over-month systemic defect tracking</p>
      </div>

      {/* Grid Canvas */}
      <div className="flex items-end justify-between h-40 pt-4 px-2 bg-slate-900/20 border border-slate-900 rounded-xl">
        {trends.map((item) => {
          const heightPct = (item.count / maxVal) * 100;
          return (
            <div key={item.month} className="flex flex-col items-center space-y-2 w-full group">
              <span className="text-[9px] font-mono font-bold text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.count}
              </span>
              <div 
                className="w-6 sm:w-8 bg-sky-500/20 group-hover:bg-sky-500 border border-sky-500/20 group-hover:border-sky-400/40 rounded-t-md transition-all duration-300"
                style={{ height: `${heightPct}%` }}
              ></div>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DamageTrendChart;