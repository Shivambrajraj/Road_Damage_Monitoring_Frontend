// frontend/src/features/dashboard/components/FilterBar.jsx
import React from 'react';
import { ANOMALY_TYPES, SEVERITY_LEVELS, REPORT_STATUS_LABELS } from '../../../shared/utils/constants';

const FilterBar = ({ 
  selectedType, 
  onTypeChange, 
  selectedSeverity, 
  onSeverityChange, 
  selectedStatus, 
  onStatusChange, 
  onReset 
}) => {
  return (
    <div className="w-full bg-slate-950 border border-slate-800/50 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
        
        {/* Type Subset Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Class:</span>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-sky-500"
          >
            <option value="">All Variations</option>
            {Object.values(ANOMALY_TYPES).map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>

        {/* Severity Priority Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Priority:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-sky-500 uppercase font-semibold text-[11px]"
          >
            <option value="">All Priorities</option>
            {Object.values(SEVERITY_LEVELS).map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>

        {/* Status Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-sky-500"
          >
            <option value="">All Statuses</option>
            {Object.entries(REPORT_STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Clear Filter Control Block */}
      <button
        onClick={onReset}
        className="text-[11px] font-bold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/50 px-4 py-2 rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
      >
        Flush Filters
      </button>
    </div>
  );
};

export default FilterBar;