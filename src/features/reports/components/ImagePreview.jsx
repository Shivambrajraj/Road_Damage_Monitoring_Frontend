// frontend/src/features/reports/components/ImagePreview.jsx
import React from 'react';

/**
 * Visual verification element holding frame objects before transmission
 */
const ImagePreview = ({ file, onClear }) => {
  if (!file) return null;

  // Derive local memory tracking index stream
  const objectUrl = URL.createObjectURL(file);

  return (
    <div className="relative w-full aspect-video bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group">
      
      {/* Target Asset Frame */}
      <img
        src={objectUrl}
        alt="Operational Surface Asset Scan"
        className="w-full h-full object-cover"
        onLoad={() => URL.revokeObjectURL(objectUrl)} // Prevent resource memory leaks
      />

      {/* Frame Removal Triggers */}
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          onClick={onClear}
          className="bg-red-500/90 hover:bg-red-500 text-slate-950 font-black text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Flush Data Frame
        </button>
      </div>

    </div>
  );
};

export default ImagePreview;