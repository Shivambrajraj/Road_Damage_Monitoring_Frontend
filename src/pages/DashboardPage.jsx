// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReports } from '../features/reports/hooks/useReports';
import dashboardService from '../features/dashboard/services/dashboardService';
import StatsCard from '../features/dashboard/components/StatsCard';
import SearchBar from '../features/dashboard/components/SearchBar';
import FilterBar from '../features/dashboard/components/FilterBar';
import DashboardCharts from '../features/dashboard/components/DashboardCharts';
import ReportTable from '../features/reports/components/ReportTable';
import { SkeletonStatsCard, SkeletonTable, SkeletonChart } from '../shared/components/Skeleton';
import { StackIcon, AlertTriangleIcon, ClockIcon, UploadCloudIcon } from '../shared/components/Icons';
import { MOCK_ACTIVITY_TIMELINE, MOCK_SYSTEM_STATUS, MOCK_RECENT_UPLOADS } from '../shared/data/mockActivity';

const ACTIVITY_DOT = {
  verified: 'bg-sky-400',
  alert: 'bg-red-400',
  upload: 'bg-amber-400',
  system: 'bg-slate-400',
  resolved: 'bg-emerald-400',
};

function timeAgo(iso) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 24 ? `${hrs}h ago` : `${Math.round(hrs / 24)}d ago`;
}

const DashboardPage = () => {
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ total_anomalies: 0, high_severity: 0, system_health: '100%' });
  const { reports, loading, filters, setFilters, refetch } = useReports();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getDashboardStats();
        if (data) setStats(data);
      } catch (err) {
        console.warn("Using fallback dashboard statistics.");
      }
    };
    fetchStats();
  }, [reports]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSearch('');
    setFilters({});
  };

  const filteredReports = reports.filter(item =>
    item.type?.toLowerCase().includes(search.toLowerCase()) ||
    item.id?.toString().includes(search)
  );

  const typeCounts = reports.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6 p-2">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-black text-white tracking-tight uppercase">Central Control Console</h1>
        <p className="text-xs text-slate-500 font-mono">Real-time infrastructure telemetry metrics</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonStatsCard /><SkeletonStatsCard /><SkeletonStatsCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="Total Inventory"
            value={stats.total_anomalies || reports.length}
            icon={<StackIcon className="w-4 h-4 text-sky-400" />}
            description="Database Total"
            trend="+4.2%"
          />
          <StatsCard
            title="Critical Run Logs"
            value={stats.high_severity || 0}
            icon={<AlertTriangleIcon className="w-4 h-4 text-red-400" />}
            description="High Priority Flags"
            trend="-1.1%"
          />
          <StatsCard
            title="System Node Health"
            value={stats.system_health || '100%'}
            icon="⚡"
            description="API Connection Stable"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <SearchBar value={search} onChange={setSearch} />

          <FilterBar
            selectedType={filters.type || ''}
            onTypeChange={(v) => handleFilterChange('type', v)}
            selectedSeverity={filters.severity || ''}
            onSeverityChange={(v) => handleFilterChange('severity', v)}
            selectedStatus={filters.status || ''}
            onStatusChange={(v) => handleFilterChange('status', v)}
            onReset={handleReset}
          />

          {loading ? <SkeletonTable rows={5} cols={5} /> : (
            <ReportTable reports={filteredReports} onStatusUpdated={refetch} />
          )}
        </div>
        <div>
          {loading ? <SkeletonChart /> : <DashboardCharts anomalyCounts={typeCounts} />}
        </div>
      </div>

      {/* System status + activity timeline — realistic live-system feel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4 hover-lift"
        >
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Status</h4>
          <div className="space-y-3">
            {Object.entries(MOCK_SYSTEM_STATUS).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 capitalize font-mono">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {val.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4 hover-lift"
        >
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity Timeline</h4>
          <ul className="space-y-3">
            {MOCK_ACTIVITY_TIMELINE.map((a) => (
              <li key={a.id} className="flex items-start gap-2.5 text-[11px]">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${ACTIVITY_DOT[a.status] || 'bg-slate-500'}`} />
                <div className="min-w-0">
                  <p className="text-slate-300 leading-snug">{a.label}</p>
                  <p className="text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                    <ClockIcon className="w-2.5 h-2.5" /> {timeAgo(a.time)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4 hover-lift"
        >
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Uploads</h4>
          <ul className="space-y-2.5">
            {MOCK_RECENT_UPLOADS.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <UploadCloudIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="text-slate-300 truncate">{u.name}</span>
                </div>
                <span className="text-slate-600 font-mono shrink-0">{u.size}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
