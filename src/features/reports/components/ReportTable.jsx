// frontend/src/features/reports/components/ReportTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/formatDate';
import { getSeverityBadgeClass } from '../utils/severityUtils';
import { getStatusBadgeClass } from '../utils/statusUtils';
import { REPORT_STATUS_LABELS } from '../../../shared/utils/constants';
import { useAuth } from '../../auth/context/AuthContext';
import reportService from '../services/reportService';

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

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12 border border-slate-800 border-dashed rounded-xl bg-slate-950/20">
        <p className="text-xs text-slate-500 font-mono">No telemetry files matching active filter parameters.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950 border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Index Token</th>
              <th className="px-6 py-4">Classification</th>
              <th className="px-6 py-4">Priority Status</th>
              <th className="px-6 py-4">Lifecycle</th>
              <th className="px-6 py-4">GIS Coordinates</th>
              <th className="px-6 py-4">Logged Stamp</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-xs text-slate-300 font-medium">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                  #{String(report.id).substring(0, 8)}
                </td>
                <td className="px-6 py-4 font-bold text-white">{report.type}</td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded text-slate-950 ${getSeverityBadgeClass(report.severity)}`}>
                    {report.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {isAdmin ? (
                    <select
                      value={report.status || 'pending'}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className={`text-[10px] font-bold uppercase tracking-wide rounded px-2 py-1 border border-slate-800 bg-slate-900 text-white cursor-pointer focus:outline-none`}
                    >
                      {Object.entries(REPORT_STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded text-slate-950 ${getStatusBadgeClass(report.status)}`}>
                      {REPORT_STATUS_LABELS[report.status] || 'Pending Review'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                  {parseFloat(report.latitude).toFixed(4)}, {parseFloat(report.longitude).toFixed(4)}
                </td>
                <td className="px-6 py-4 text-slate-400">{formatDate(report.created_at)}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/reports/${report.id}`}
                    className="inline-block bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors"
                  >
                    Analyze
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;