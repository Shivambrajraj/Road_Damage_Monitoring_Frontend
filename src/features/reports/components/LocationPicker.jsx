// frontend/src/features/reports/components/LocationPicker.jsx
import React from 'react';
import { useGeolocation } from '../../maps/hooks/useGeolocation';

const LocationPicker = ({ onSelectCoords }) => {
  const { coords, error } = useGeolocation();

  const handleCapture = () => {
    if (coords) {
      onSelectCoords({ latitude: coords.latitude, longitude: coords.longitude });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Geospatial Capture Node</span>
        <button
          type="button"
          onClick={handleCapture}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[10px] px-3 py-1.5 rounded transition-colors cursor-pointer"
        >
          Sync Device GPS
        </button>
      </div>
      {error && <p className="text-[10px] text-amber-400 font-mono">⚠️ Telemetry Alert: {error}</p>}
      {!error && coords && (
        <p className="text-[10px] text-slate-500 font-mono">
          Ready to lock target grid: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default LocationPicker;