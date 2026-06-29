// frontend/src/features/dashboard/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "Query data index..." }) => {
  return (
    <div className="relative w-full">
      <span className="absolute left-4 top-3.5 text-slate-500 text-xs">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors font-mono"
      />
    </div>
  );
};

export default SearchBar;