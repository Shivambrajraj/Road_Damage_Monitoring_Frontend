// frontend/src/shared/components/Input.jsx
import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-sky-500'
        }`}
      />
      {error && <p className="text-[11px] text-red-400 font-medium font-mono">⚠️ {error}</p>}
    </div>
  );
};

export default Input;