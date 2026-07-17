// frontend/src/features/dashboard/components/StatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../../../shared/components/AnimatedCounter';

const StatsCard = ({ title, value, icon, description, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-3 hover:border-slate-700 hover:shadow-sky-500/5 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-xl bg-slate-900 w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800/50">
          {icon}
        </span>
      </div>
      <div className="space-y-0.5">
        <h3 className="text-2xl font-black text-white tracking-tight">
          <AnimatedCounter value={value} />
        </h3>
        <div className="flex items-center gap-2">
          {description && <p className="text-[10px] text-slate-500 font-mono">{description}</p>}
          {trend && (
            <span className={`text-[10px] font-bold ${trend.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
