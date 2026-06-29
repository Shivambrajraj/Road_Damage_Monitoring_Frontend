// frontend/src/features/reports/components/UploadForm.jsx
import React, { useState } from 'react';
import ImagePreview from './ImagePreview';
import LocationPicker from './LocationPicker';
import Button from '../../../shared/components/Button';
import { ANOMALY_TYPES, SEVERITY_LEVELS } from '../../../shared/utils/constants';

const UploadForm = ({ onSubmit, isSubmitting }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [fields, setFields] = useState({
    type: ANOMALY_TYPES.POTHOLE,
    severity: SEVERITY_LEVELS.LOW
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
    dataPayload.append('latitude', coords.latitude || '22.5251'); // Default fallback to IIT Indore values
    dataPayload.append('longitude', coords.longitude || '75.9208');

    onSubmit(dataPayload);
  };

  return (
    <form onSubmit={handleFormSubmission} className="space-y-6 bg-slate-950 border border-slate-800/80 p-6 rounded-2xl">
      
      {/* Upload Box Drop Slots */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Surface Image Vector</label>
        {selectedFile ? (
          <ImagePreview file={selectedFile} onClear={() => setSelectedFile(null)} />
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-800 hover:border-sky-500/50 bg-slate-900/40 rounded-xl transition-colors cursor-pointer group">
            <div className="text-center p-6 space-y-2">
              <span className="text-4xl block group-hover:scale-110 transition-transform">📸</span>
              <span className="block text-xs font-semibold text-slate-300">Scan or select target frame asset</span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Classification</label>
          <select name="type" value={fields.type} onChange={handleFieldChange} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-sky-500 outline-none">
            {Object.entries(ANOMALY_TYPES).map(([key, val]) => <option key={key} value={val}>{val}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Priority</label>
          <select name="severity" value={fields.severity} onChange={handleFieldChange} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-sky-500 outline-none uppercase tracking-wide font-mono text-xs">
            {Object.entries(SEVERITY_LEVELS).map(([key, val]) => <option key={key} value={val}>{val}</option>)}
          </select>
        </div>
      </div>

      {/* Embedded Location Picker Module */}
      <LocationPicker onSelectCoords={(selected) => setCoords(selected)} />

      <Button type="submit" disabled={isSubmitting || !selectedFile} className="w-full justify-center">
        {isSubmitting ? 'Analyzing Structural Integrity...' : 'Launch Matrix Deployment Run'}
      </Button>

    </form>
  );
};

export default UploadForm;