// frontend/src/pages/UploadPage.jsx
import React, { useState } from 'react';
import { useUpload } from '../features/reports/hooks/useUpload';
import UploadForm from '../features/reports/components/UploadForm';
import DetectionResult from '../features/reports/components/DetectionResult';
import ErrorMessage from '../shared/components/ErrorMessage';

const UploadPage = () => {
  const { uploadPayload, isSubmitting, error, success } = useUpload();
  const [modelOutput, setModelOutput] = useState(null);

  const handleInferenceExecution = async (formData) => {
    try {
      const response = await uploadPayload(formData);
      if (response && response.detection) {
        setModelOutput(response.detection);
      }
    } catch (err) {
      console.error("Pipeline analytics aborted:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-2">
      <div className="text-center space-y-1 py-4">
        <h1 className="text-2xl font-black text-white tracking-tight uppercase">Launch Analytics Run</h1>
        <p className="text-xs text-slate-500 font-mono">Stream asset image buffers into neural network parameters</p>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-mono text-center">
          ✓ Telemetry log run recorded and cataloged in cloud indexes safely.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UploadForm onSubmit={handleInferenceExecution} isSubmitting={isSubmitting} />
        </div>
        <div>
          {modelOutput ? (
            <DetectionResult result={modelOutput} />
          ) : (
            <div className="border border-slate-800 border-dashed rounded-2xl p-6 text-center text-xs text-slate-600 font-mono h-48 flex items-center justify-center">
              Awaiting payload deployment...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;