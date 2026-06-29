// frontend/src/shared/components/Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Content box */}
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white tracking-tight uppercase">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-lg cursor-pointer">
            ✕
          </button>
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;