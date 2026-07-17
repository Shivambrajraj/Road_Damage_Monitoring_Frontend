// frontend/src/pages/ReportDetailsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../shared/services/apiClient';
import { SkeletonImage, SkeletonCard } from '../shared/components/Skeleton';
import EmptyState from '../shared/components/EmptyState';
import { getSeverityBorderClass, getSeverityBadgeClass } from '../features/reports/utils/severityUtils';
import { getStatusBadgeClass } from '../features/reports/utils/statusUtils';
import { REPORT_STATUS_LABELS } from '../shared/utils/constants';
import { CopyIcon, CheckCircleIcon, MapIcon, ImageOffIcon } from '../shared/components/Icons';

const ReportDetailsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const fetchReportData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiClient.get(`/reports/details/${id}`);
      setReport(data);
    } catch (err) {
      setError(err.message || 'Unable to retrieve data for the specified inspection vector.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const handleCopyCoords = async () => {
    if (!report) return;
    const text = `${report.latitude?.toFixed(6) ?? '0'}, ${report.longitude?.toFixed(6) ?? '0'}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, the values are still visible on screen.
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 p-2">
        <div className="h-3 w-40 bg-slate-900 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <SkeletonImage className="h-96 w-full" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <SkeletonCard lines={4} />
            <SkeletonCard lines={2} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2">
        <EmptyState
          icon="folder"
          title="Couldn't load this report"
          description={error}
          ctaLabel="Try Again"
          onCtaClick={fetchReportData}
        />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-2">
        <EmptyState
          icon="folder"
          title="Report not found"
          description="This report may have been removed, or the link is out of date."
          ctaLabel="Back to Dashboard"
          ctaTo="/dashboard"
        />
      </div>
    );
  }

  const confidencePct = Math.round(((report.confidence ?? 0.92) * 100) * 10) / 10;

  return (
    <div className="space-y-8 animate-fade-in p-2">

      {/* Return Navigation Anchor */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors">
          ← Back to Operational Deck
        </Link>
        <Link to="/map" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors">
          <MapIcon className="w-3.5 h-3.5" /> View on Map
        </Link>
      </div>

      {/* Primary Report Core Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: Deep Learning Inference Source Display (7/12 Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Analyzed Imagery Vector</h3>
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {imageFailed || !report.image_url ? (
                <div className="w-full aspect-video flex flex-col items-center justify-center gap-2 text-slate-600">
                  <ImageOffIcon className="w-8 h-8" />
                  <span className="text-[11px] font-mono">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={report.image_url}
                  alt="AI anomaly bounding overlay"
                  className="w-full h-auto object-cover"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Geospatial & Classification Metrics (5/12 Width) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Metadata Overview Card */}
          <div className={`bg-slate-950/30 border border-slate-800 p-6 rounded-2xl border-l-4 ${getSeverityBorderClass(report.severity)}`}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Report ID: {String(report.id ?? '').substring(0, 12)}</span>
              <div className="flex items-center gap-1.5">
                {report.status && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-950 ${getStatusBadgeClass(report.status)}`}>
                    {REPORT_STATUS_LABELS[report.status] || report.status}
                  </span>
                )}
                <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider text-slate-950 ${getSeverityBadgeClass(report.severity)}`}>
                  {report.severity || 'low'}
                </span>
              </div>
            </div>

            <h2 className="text-xl font-black text-white tracking-tight mt-4">Structural Evaluation Summary</h2>

            <div className="mt-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Capture Timeline</span>
                <span className="text-slate-200 font-mono">{report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Coordinates</span>
                <span className="flex items-center gap-2">
                  <span className="text-slate-200 font-mono font-bold text-white">
                    {report.latitude?.toFixed(6) ?? '0.000000'}, {report.longitude?.toFixed(6) ?? '0.000000'}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    title="Copy coordinates"
                    className="text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    {copied ? <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  </button>
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-slate-400 font-medium">Target Classification</span>
                <span className="text-sky-400 font-bold uppercase tracking-wider">{report.type || 'Surface Fracture'}</span>
              </div>
            </div>
          </div>

          {/* Model Inference Probability Log */}
          <div className="bg-slate-950/30 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-white tracking-tight uppercase">Neural Classification Confidence</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-medium">Model Confidence Bound</span>
                  <span className="text-sky-400 font-mono font-bold">{confidencePct}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${confidencePct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ReportDetailsPage;
