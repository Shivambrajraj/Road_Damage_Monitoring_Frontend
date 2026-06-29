// frontend/src/shared/components/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-medium font-mono flex items-center gap-2 max-w-2xl mx-auto">
      <span>⚠️ Exception Log:</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;