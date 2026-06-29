// frontend/src/pages/ReportDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../shared/services/apiClient';
import LoadingSpinner from '../shared/components/LoadingSpinner';

const ReportDetailsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await apiClient.get(`/reports/details/${id}`);
        setReport(data);
      } catch (err) {
        setError(err.message || 'Unable to retrieve data for the specified inspection vector.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  if (loading) return <LoadingSpinner message="Extracting computer vision coordinates..." />;

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm max-w-2xl mx-auto my-8">
        ⚠️ {error}
      </div>
    );
  }

  const severityColor = 
    report?.severity === 'high' ? 'border-l-(--severity-high)' : 
    report?.severity === 'medium' ? 'border-l-(--severity-medium)' : 
    'border-l-(--severity-low)';

  const badgeBackground = 
    report?.severity === 'high' ? 'bg-(--severity-high)' : 
    report?.severity === 'medium' ? 'bg-(--severity-medium)' : 
    'bg-(--severity-low)';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Return Navigation Anchor */}
      <div className="flex items-center space-x-2">
        <Link to="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors">
          ← Back to Operational Deck
        </Link>
      </div>

      {/* Primary Report Core Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Deep Learning Inference Source Display (7/12 Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Analyzed Imagery Vector</h3>
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <img 
                src={report?.image_url || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200'} 
                alt="AI Anomaly Bounding Overlay" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Geospatial & Classification Metrics (5/12 Width) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Metadata Overview Card */}
          <div className={`bg-slate-950/30 border border-slate-800 p-6 rounded-2xl border-l-4 ${severityColor}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Report ID: {String(report?.id ?? '').substring(0, 12)}</span>
              <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider text-white ${badgeBackground}`}>
                {report?.severity} Status
              </span>
            </div>

            <h2 className="text-xl font-black text-white tracking-tight mt-4">Structural Evaluation Summary</h2>
            
            <div className="mt-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Capture Timeline</span>
                <span className="text-slate-200 font-mono">{report?.created_at ? new Date(report.created_at).toLocaleString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Latitude Vector</span>
                <span className="text-slate-200 font-mono font-bold text-white">{report?.latitude?.toFixed(6) || '0.000000'} N</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Longitude Vector</span>
                <span className="text-slate-200 font-mono font-bold text-white">{report?.longitude?.toFixed(6) || '0.000000'} E</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-slate-400 font-medium">Target Classification</span>
                <span className="text-sky-400 font-bold uppercase tracking-wider">{report?.type || 'Surface Fracture'}</span>
              </div>
            </div>
          </div>

          {/* Model Inference Probability Log */}
          <div className="bg-slate-950/30 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-white tracking-tight uppercase">Neural Classification Confidences</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-medium">Model Confidence Bound</span>
                  <span className="text-sky-400 font-mono font-bold">{(report?.confidence || 0.92) * 100}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(report?.confidence || 0.92) * 100}%` }}
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