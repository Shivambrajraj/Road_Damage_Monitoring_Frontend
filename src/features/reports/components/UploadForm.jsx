// frontend/src/features/reports/components/UploadForm.jsx
import React, { useRef, useState } from 'react';
import ImagePreview from './ImagePreview';
import LocationPicker from './LocationPicker';
import Button from '../../../shared/components/Button';
import { ANOMALY_TYPES, SEVERITY_LEVELS } from '../../../shared/utils/constants';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const UploadForm = ({ onSubmit, isSubmitting }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [fields, setFields] = useState({
    type: ANOMALY_TYPES.POTHOLE,
    severity: SEVERITY_LEVELS.LOW,
  });
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError('Unsupported file type — please use JPG, PNG, or WEBP.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError('That image is over 10MB — try a smaller file or a compressed export.');
      return;
    }
    setFileError('');
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (isSubmitting) return;
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFileError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Add a photo before submitting the report.');
      return;
    }

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

      {/* 1. UPLOAD REGION — click or drag & drop */}
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
          <label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer group ${
              isDragging
                ? 'border-sky-400 bg-sky-500/10'
                : 'border-slate-800/80 hover:border-sky-500/40 bg-slate-950/20 hover:bg-slate-950/40'
            }`}
          >
            <div className="text-center p-6 space-y-3">
              <span className="text-3xl block group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                {isDragging ? '📥' : '📸'}
              </span>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-200">
                  {isDragging ? 'Drop it right here' : 'Drag & drop, or click to upload'}
                </span>
                <span className="block text-xs text-slate-500">JPG, PNG, or WEBP up to 10MB</span>
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}

        {fileError && (
          <p className="text-[11px] text-red-400 font-medium flex items-center gap-1.5">
            <span>⚠</span> {fileError}
          </p>
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
