// frontend/src/features/reports/components/ReportTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/formatDate';
import { REPORT_STATUS_LABELS } from '../../../shared/utils/constants';
import { useAuth } from '../../auth/context/AuthContext';
import reportService from '../services/reportService';
import EmptyState from '../../../shared/components/EmptyState';

const ReportTable = ({ reports, onStatusUpdated }) => {
  const { isAdmin } = useAuth();

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await reportService.updateStatus(reportId, newStatus);
      onStatusUpdated?.();
    } catch (err) {
      console.error('Failed to update report status:', err);
    }
  };

  // Modern badges mapped right inside the component so no external utility files are required
  const severityStyles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const statusStyles = {
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    in_progress: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  if (!reports || reports.length === 0) {
    return (
      <EmptyState
        icon="folder"
        title="No reports found"
        description="No road anomaly reports match your active filters. Try resetting the status, severity, or search parameters — or upload the first image to get started."
        ctaLabel="Upload a Report"
        ctaTo="/upload"
      />
    );
  }

  return (
    <div className="w-full bg-slate-950/40 backdrop-blur-sm border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Damage Type</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Reported</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 text-xs text-slate-300 font-medium">
            {reports.map((report) => {
              const sevKey = report.severity?.toLowerCase() || 'low';
              const statKey = report.status?.toLowerCase() || 'pending';

              return (
                <tr key={report.id} className="group hover:bg-slate-900/40 transition-colors duration-150 border-l-2 border-transparent hover:border-sky-500/60">
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                    #{String(report.id).substring(0, 8)}
                  </td>
                  
                  <td className="px-6 py-4 font-bold text-white text-sm">{report.type}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${severityStyles[sevKey] || severityStyles.low}`}>
                      {report.severity}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <select
                        value={report.status || 'pending'}
                        onChange={(e) => handleStatusChange(report.id, e.target.value)}
                        className="text-[11px] font-bold rounded-lg px-2.5 py-1.5 border border-slate-800 bg-slate-950 text-slate-200 cursor-pointer focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/20 focus:outline-none transition-all"
                      >
                        {Object.entries(REPORT_STATUS_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusStyles[statKey] || statusStyles.pending}`}>
                        {REPORT_STATUS_LABELS[report.status] || 'Pending Review'}
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                    {parseFloat(report.latitude).toFixed(4)}, {parseFloat(report.longitude).toFixed(4)}
                  </td>
                  
                  <td className="px-6 py-4 text-slate-400 text-[11px]">
                    {formatDate(report.created_at)}
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/reports/${report.id}`}
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 hover:border-slate-700 text-sky-400 font-bold px-3 py-1.5 rounded-lg text-[11px] transition-all duration-150"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;