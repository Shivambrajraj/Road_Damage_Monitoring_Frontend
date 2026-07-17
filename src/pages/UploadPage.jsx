// frontend/src/pages/UploadPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpload } from '../features/reports/hooks/useUpload';
import UploadForm from '../features/reports/components/UploadForm';
import DetectionResult from '../features/reports/components/DetectionResult';
import ErrorMessage from '../shared/components/ErrorMessage';
import EmptyState from '../shared/components/EmptyState';
import { CheckCircleIcon, ScanIcon } from '../shared/components/Icons';

const TIPS = [
  'Frame the damage head-on and fill most of the shot for the sharpest read.',
  'Shoot in daylight where possible — glare and heavy shadow reduce confidence.',
  'Allow GPS access so the report lands on the map at the right spot.',
];

const UploadPage = () => {
  const { uploadPayload, isSubmitting, error, success } = useUpload();
  const [modelOutput, setModelOutput] = useState(null);
  const [lastReportId, setLastReportId] = useState(null);

  const handleInferenceExecution = async (formData) => {
    try {
      const response = await uploadPayload(formData);
      if (response && response.detection) {
        setModelOutput(response.detection);
      }
      if (response && response.id) {
        setLastReportId(response.id);
      }
    } catch (err) {
      console.error('Pipeline analytics aborted:', err);
    }
  };

  return (
    <div className="space-y-6 p-2">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-black text-white tracking-tight uppercase">Launch Analytics Run</h1>
        <p className="text-xs text-slate-500 font-mono">Stream a road image into the detection pipeline and get an instant read</p>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-mono flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 shrink-0" />
            Report recorded and cataloged in the system index.
          </span>
          {lastReportId && (
            <Link
              to={`/reports/${lastReportId}`}
              className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wide text-[10px] transition-colors shrink-0"
            >
              View Report →
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UploadForm onSubmit={handleInferenceExecution} isSubmitting={isSubmitting} />
        </div>

        <div className="space-y-4">
          {modelOutput ? (
            <DetectionResult result={modelOutput} />
          ) : (
            <EmptyState
              icon="scan"
              compact
              title="Awaiting deployment"
              description="Submit an image on the left to run AI detection and see results here."
            />
          )}

          {/* Tips panel — fills otherwise empty sidebar space and helps first-time uploaders */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <ScanIcon className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Tips for a clean read</h4>
            </div>
            <ul className="space-y-2">
              {TIPS.map((tip) => (
                <li key={tip} className="text-[11px] text-slate-500 leading-relaxed pl-3 border-l border-slate-800">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
