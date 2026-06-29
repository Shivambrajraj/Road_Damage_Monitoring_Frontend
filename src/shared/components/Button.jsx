// frontend/src/shared/components/Button.jsx
import React from 'react';

const Button = ({ children, type = 'button', variant = 'primary', onClick, disabled = false, className = '' }) => {
  const baseStyle = "w-full sm:w-auto text-center font-bold text-xs px-6 py-3 rounded-lg tracking-wide transition-colors cursor-pointer disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/10",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
export { Button };