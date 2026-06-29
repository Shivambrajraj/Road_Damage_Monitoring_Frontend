// frontend/src/features/dashboard/components/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, description }) => {
  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-3 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-xl bg-slate-900 w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800/50">
          {icon}
        </span>
      </div>
      <div className="space-y-0.5">
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {description && <p className="text-[10px] text-slate-500 font-mono">{description}</p>}
      </div>
    </div>
  );
};

export default StatsCard;