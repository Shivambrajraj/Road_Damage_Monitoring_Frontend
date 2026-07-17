// frontend/src/features/reports/components/ImagePreview.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Visual verification element holding frame objects before transmission.
 * The object URL is created once per `file` and torn down whenever the
 * file changes or the component unmounts, so we never leak blob URLs
 * across re-renders (e.g. while `isSubmitting` toggles).
 */
const ImagePreview = ({ file, onClear }) => {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!file || !objectUrl) return null;

  const sizeLabel = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-video bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group"
    >
      {/* Target Asset Frame */}
      <img
        src={objectUrl}
        alt="Uploaded road surface scan"
        className="w-full h-full object-cover"
      />

      {/* File meta chip */}
      <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur border border-slate-800 text-[10px] font-mono text-slate-300 px-2 py-1 rounded-md">
        {file.name.length > 22 ? `${file.name.slice(0, 19)}…` : file.name} · {sizeLabel}
      </div>

      {/* Frame Removal Trigger */}
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          onClick={onClear}
          className="bg-red-500/90 hover:bg-red-500 text-slate-950 font-black text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Remove Photo
        </button>
      </div>
    </motion.div>
  );
};

export default ImagePreview;
