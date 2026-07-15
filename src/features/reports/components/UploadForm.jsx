// frontend/src/features/reports/components/UploadForm.jsx
import React, { useState } from 'react';
import ImagePreview from './ImagePreview';
import LocationPicker from './LocationPicker';
import Button from '../../../shared/components/Button';
import { ANOMALY_TYPES, SEVERITY_LEVELS } from '../../../shared/utils/constants';

const UploadForm = ({ onSubmit, isSubmitting }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [fields, setFields] = useState({
    type: ANOMALY_TYPES.POTHOLE,
    severity: SEVERITY_LEVELS.LOW
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const dataPayload = new FormData();
    dataPayload.append('image', selectedFile);
    dataPayload.append('type', fields.type);
    dataPayload.append('severity', fields.severity);
    dataPayload.append('latitude', coords.latitude || '22.5251'); // Fallback to localized values
    dataPayload.append('longitude', coords.longitude || '75.9208');

    onSubmit(dataPayload);
  };

  return (
    <form onSubmit={handleFormSubmission} className="space-y-6 bg-slate-900/40 backdrop-blur-md border border-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl">
      
      {/* 1. UPGRADED UPLOAD REGION */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Road Damage Photo</label>
        
        {selectedFile ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            {/* Live AI Scanner Animation (Triggered only during submission) */}
            {isSubmitting && (
              <div className="absolute inset-0 z-10 bg-sky-500/10 pointer-events-none overflow-hidden">
                {/* Vertical Laser Line */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scanner absolute top-0" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                  <span className="bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs px-3 py-1.5 rounded-lg shadow-lg font-bold tracking-wider animate-pulse uppercase">
                    Analyzing Road Features...
                  </span>
                </div>
              </div>
            )}
            <ImagePreview file={selectedFile} onClear={handleClear} />
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-800/80 hover:border-sky-500/40 bg-slate-950/20 hover:bg-slate-950/40 rounded-xl transition-all duration-200 cursor-pointer group">
            <div className="text-center p-6 space-y-3">
              <span className="text-3xl block group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">📸</span>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-200">Upload street photo or snapshot</span>
                <span className="block text-xs text-slate-500">Supports JPG, PNG up to 10MB</span>
              </div>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
          </label>
        )}
      </div>

      {/* 2. DENSE FIELD CONFIGURATIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Classification</label>
          <select 
            name="type" 
            value={fields.type} 
            onChange={handleFieldChange} 
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all outline-none"
          >
            {Object.entries(ANOMALY_TYPES).map(([key, val]) => (
              <option key={key} value={val}>{val}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Severity Level</label>
          <select 
            name="severity" 
            value={fields.severity} 
            onChange={handleFieldChange} 
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all outline-none uppercase tracking-wide font-mono"
          >
            {Object.entries(SEVERITY_LEVELS).map(([key, val]) => (
              <option key={key} value={val}>{val}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. MAP/LOCATION MODULE */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Geographic Coordinates</label>
        <LocationPicker onSelectCoords={(selected) => setCoords(selected)} />
      </div>

      {/* 4. SUBMIT ACTION */}
      <Button 
        type="submit" 
        disabled={isSubmitting || !selectedFile} 
        className="w-full justify-center py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-all text-sm tracking-wide"
      >
        {isSubmitting ? 'Analyzing Road Image...' : 'Submit Damage Report'}
      </Button>

    </form>
  );
};

export default UploadForm;