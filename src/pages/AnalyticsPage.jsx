// frontend/src/pages/AnalyticsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import analyticsService from '../features/analytics/services/analyticsService';
import AnalyticsSummary from '../features/analytics/components/AnalyticsSummary';
import StatsCard from '../features/dashboard/components/StatsCard';
import EmptyState from '../shared/components/EmptyState';
import { SkeletonChart, SkeletonCard, SkeletonStatsCard } from '../shared/components/Skeleton';
import { StackIcon, AlertTriangleIcon, TrendUpIcon, RefreshIcon } from '../shared/components/Icons';

const FALLBACK_DATA = {
  severity: { low: 45, medium: 32, high: 14 },
  trends: [
    { month: 'Jan', count: 8 },
    { month: 'Feb', count: 14 },
    { month: 'Mar', count: 19 },
    { month: 'Apr', count: 22 },
    { month: 'May', count: 35 },
    { month: 'Jun', count: 42 },
  ],
};

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAnalyticsMatrix = useCallback(async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getAnalyticsSummary();
      setAnalyticsData(data);
      setUsingFallback(false);
    } catch (err) {
      console.warn('Using default client-side analytics matrices.');
      setAnalyticsData(null);
      setUsingFallback(true);
    } finally {
      setLastUpdated(new Date());
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsMatrix();
  }, [fetchAnalyticsMatrix]);

  const displayData = analyticsData || FALLBACK_DATA;
  const { severity = {}, trends = [] } = displayData;
  const totalDetections = (severity.low || 0) + (severity.medium || 0) + (severity.high || 0);
  const hasData = totalDetections > 0 || trends.length > 0;

  const latestMonth = trends[trends.length - 1];
  const prevMonth = trends[trends.length - 2];
  const momChange = latestMonth && prevMonth && prevMonth.count > 0
    ? Math.round(((latestMonth.count - prevMonth.count) / prevMonth.count) * 100)
    : null;

  const headerBlock = (
    <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 className="text-xl font-black text-white tracking-tight uppercase">System Diagnostics Analytics</h1>
        <p className="text-xs text-slate-500 font-mono">Time-series overview tracking long-term degradation velocities</p>
      </div>
      <div className="flex items-center gap-3">
        {lastUpdated && !loading && (
          <span className="text-[10px] text-slate-600 font-mono hidden sm:block">
            Synced {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <button
          type="button"
          onClick={fetchAnalyticsMatrix}
          disabled={loading}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 border border-slate-800 text-slate-300 text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <RefreshIcon className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6 p-2">
        {headerBlock}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonStatsCard /><SkeletonStatsCard /><SkeletonStatsCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonCard lines={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-2">
      {headerBlock}

      {usingFallback && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2.5 rounded-xl text-[11px] font-mono flex items-center gap-2">
          <AlertTriangleIcon className="w-3.5 h-3.5 shrink-0" />
          Live analytics service is unreachable — showing sample data so you can preview the layout.
        </div>
      )}

      {!hasData ? (
        <EmptyState
          icon="trend"
          title="No detection data yet"
          description="Once reports start coming in, severity trends and monthly detection counts will appear here."
          ctaLabel="Upload a Report"
          ctaTo="/upload"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              title="Total Detections"
              value={totalDetections}
              icon={<StackIcon className="w-4 h-4 text-sky-400" />}
              description="Across all logged reports"
            />
            <StatsCard
              title="High Priority"
              value={severity.high || 0}
              icon={<AlertTriangleIcon className="w-4 h-4 text-red-400" />}
              description={totalDetections ? `${Math.round(((severity.high || 0) / totalDetections) * 100)}% of total` : '—'}
            />
            <StatsCard
              title={latestMonth ? `${latestMonth.month} Detections` : 'This Month'}
              value={latestMonth ? latestMonth.count : 0}
              icon={<TrendUpIcon className="w-4 h-4 text-emerald-400" />}
              description="Vs. previous month"
              trend={momChange !== null ? `${momChange > 0 ? '+' : ''}${momChange}%` : undefined}
            />
          </div>

          <AnalyticsSummary analyticsData={displayData} />
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
