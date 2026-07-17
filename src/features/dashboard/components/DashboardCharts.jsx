// frontend/src/features/dashboard/components/DashboardCharts.jsx
import React from 'react';
import { motion } from 'framer-motion';
import EmptyState from '../../../shared/components/EmptyState';

const DashboardCharts = ({ anomalyCounts = {} }) => {
  const entries = Object.entries(anomalyCounts);
  const maxCount = Math.max(...Object.values(anomalyCounts.length ? anomalyCounts : { _: 1 }), 1);

  return (
    <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 hover-lift">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Anomaly Distribution Density</h4>
        <p className="text-[10px] text-slate-500 font-mono">Real-time classification arrays</p>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          icon="scan"
          compact
          title="No detections yet"
          description="Upload road images to see the AI-classified anomaly breakdown here."
          ctaLabel="Upload Image"
          ctaTo="/upload"
        />
      ) : (
        <div className="space-y-3">
          {entries.map(([label, val]) => {
            const widthPct = (val / maxCount) * 100;
            return (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-300">{label}</span>
                  <span className="text-sky-400 font-bold">{val}</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardCharts;
