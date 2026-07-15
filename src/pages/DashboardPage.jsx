// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useReports } from '../features/reports/hooks/useReports';
import dashboardService from '../features/dashboard/services/dashboardService';
import StatsCard from '../features/dashboard/components/StatsCard';
import SearchBar from '../features/dashboard/components/SearchBar';
import FilterBar from '../features/dashboard/components/FilterBar';
import DashboardCharts from '../features/dashboard/components/DashboardCharts';
import ReportTable from '../features/reports/components/ReportTable';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import { StackIcon, AlertTriangleIcon } from '../shared/components/Icons';

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

  if (loading) return <LoadingSpinner message="Syncing control console streams..." />;

  // Aggregate current view category distribution counts dynamically
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Inventory" 
          value={stats.total_anomalies || reports.length} 
          icon={<StackIcon className="w-4 h-4 text-sky-400" />} 
          description="Database Total" 
        />
        <StatsCard 
          title="Critical Run Logs" 
          value={stats.high_severity || 0} 
          icon={<AlertTriangleIcon className="w-4 h-4 text-red-400" />} 
          description="High Priority Flags" 
        />
        <StatsCard 
          title="System Node Health" 
          value={stats.system_health || '100%'} 
          icon="⚡" 
          description="API Connection Stable" 
        />
      </div>

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
          
          <ReportTable reports={filteredReports} onStatusUpdated={refetch} />
        </div>
        <div>
          <DashboardCharts anomalyCounts={typeCounts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;