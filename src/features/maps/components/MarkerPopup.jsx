// frontend/src/features/maps/components/MarkerPopup.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MarkerPopup = ({ marker, onClose }) => {
  const { id, type, severity, latitude, longitude } = marker;

  return (
    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl shadow-2xl space-y-3 font-mono text-xs w-64 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
        <span className="text-[10px] text-slate-500 font-bold">GRID VECTOR LOCKED</span>
        <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer">✕</button>
      </div>
      <div className="space-y-1">
        <h5 className="font-sans font-black text-white text-sm">{type}</h5>
        <p className="text-[11px] text-slate-400">Priority Level: <span className="text-sky-400 uppercase font-bold">{severity}</span></p>
        <p className="text-[10px] text-slate-600">POS: {parseFloat(latitude).toFixed(4)}, {parseFloat(longitude).toFixed(4)}</p>
      </div>
      <div className="pt-1.5 border-t border-slate-900">
        <Link 
          to={`/reports/${id}`}
          className="block w-full text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2 rounded-lg text-[11px] transition-colors"
        >
          Inspect Core Telemetry
        </Link>
      </div>
    </div>
  );
};

export default MarkerPopup;