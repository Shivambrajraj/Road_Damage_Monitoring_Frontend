// frontend/src/features/reports/components/DetectionResult.jsx
import React from 'react';

/**
 * Renders spatial coordinate tags along with machine learning precision logs
 */
const DetectionResult = ({ result }) => {
  if (!result) return null;

  const { confidence, bounding_box, class_name } = result;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-slate-400 font-bold uppercase tracking-wider">Inference Output Logs</span>
        <span className="bg-sky-500/10 text-sky-400 font-bold px-2 py-0.5 rounded border border-sky-500/20">
          {(confidence * 100).toFixed(1)}% Certainty
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        <div>
          <span className="text-slate-500 block">Identified Variant:</span>
          <span className="font-sans font-bold text-white">{class_name || 'Unknown Anomaly'}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Structural Vector:</span>
          <span className="text-slate-400">
            {bounding_box ? `[${bounding_box.join(', ')}]` : 'No Bounds Exported'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetectionResult;