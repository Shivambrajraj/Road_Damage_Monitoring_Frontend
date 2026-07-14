// frontend/src/shared/components/Icons.jsx
// Hand-drawn line icon set — replaces emoji glyphs across the app.
import React from 'react';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const RoadMarkIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 3 4 21" />
    <path d="M17 3l3 18" />
    <path d="M12 3v2.5M12 8.5v2.5M12 13.5v2.5M12 18.5V21" />
  </svg>
);

export const MenuIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const AlertTriangleIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 4 3 20h18L12 4Z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export const StackIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 16l9 5 9-5" />
  </svg>
);