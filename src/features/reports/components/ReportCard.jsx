// frontend/src/features/reports/components/ReportCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/formatDate';
import { getSeverityBorderClass, getSeverityBadgeClass } from '../utils/severityUtils';

const ReportCard = ({ report }) => {
  const { id, type, severity, created_at, latitude, longitude } = report;

  return (
    <div className={`bg-slate-950 border border-slate-800/80 rounded-xl p-5 border-l-4 ${getSeverityBorderClass(severity)} shadow-md hover:border-slate-700 transition-all space-y-4`}>
      
      {/* Structural Card Heading Block */}
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-white tracking-tight">{type}</h4>
          <p className="text-[10px] text-slate-500 font-mono">ID: {String(id).substring(0, 8)}...</p>
        </div>
        <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded text-slate-950 ${getSeverityBadgeClass(severity)}`}>
          {severity}
        </span>
      </div>

      {/* Geospatial Coordinate Vector Sub-block */}
      <div className="bg-slate-900/50 rounded-lg p-2.5 font-mono text-[10px] text-slate-400 grid grid-cols-2 gap-1.5 border border-slate-900">
        <div><span className="text-slate-600">LAT:</span> {parseFloat(latitude).toFixed(4)}</div>
        <div><span className="text-slate-600">LNG:</span> {parseFloat(longitude).toFixed(4)}</div>
      </div>

      {/* Lower Meta Interaction Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[11px]">
        <span className="text-slate-500">{formatDate(created_at).split(',')[0]}</span>
        <Link
          to={`/reports/${id}`}
          className="text-sky-400 hover:text-sky-300 font-bold tracking-wide transition-colors"
        >
          Inspect Matrix →
        </Link>
      </div>

    </div>
  );
};

export default ReportCard;