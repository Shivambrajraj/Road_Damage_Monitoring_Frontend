// frontend/src/shared/components/Skeleton.jsx
import React from 'react';

/** Base shimmer block. Composable primitive for all skeleton variants. */
export const SkeletonBlock = ({ className = '', style }) => (
  <div className={`relative overflow-hidden bg-slate-900 rounded-md ${className}`} style={style}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-800/60 to-transparent" />
  </div>
);

export const SkeletonStatsCard = () => (
  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
    <div className="flex items-center justify-between">
      <SkeletonBlock className="h-3 w-24" />
      <SkeletonBlock className="h-9 w-9 rounded-xl" />
    </div>
    <SkeletonBlock className="h-7 w-16" />
    <SkeletonBlock className="h-2.5 w-28" />
  </div>
);

export const SkeletonCard = ({ lines = 3 }) => (
  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-3">
    <SkeletonBlock className="h-4 w-1/2" />
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBlock key={i} className={`h-2.5 ${i % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 5 }) => (
  <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl overflow-hidden">
    <div className="border-b border-slate-900 bg-slate-950 px-6 py-4 flex gap-6">
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonBlock key={i} className="h-2.5 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="px-6 py-4 flex gap-6 border-b border-slate-900/60 last:border-0">
        {Array.from({ length: cols }).map((_, c) => (
          <SkeletonBlock key={c} className="h-3 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

const CHART_BAR_HEIGHTS = [40, 65, 50, 80, 55, 90, 45, 70, 60, 85, 50, 75];

export const SkeletonChart = ({ height = 'h-56' }) => (
  <div className={`bg-slate-950 border border-slate-800/80 rounded-2xl p-5 ${height} flex items-end gap-2`}>
    {CHART_BAR_HEIGHTS.map((h, i) => (
      <SkeletonBlock key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
    ))}
  </div>
);

export const SkeletonImage = ({ className = 'h-56 w-full' }) => (
  <SkeletonBlock className={`${className} rounded-2xl`} />
);

export const SkeletonDetectionResult = () => (
  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
    <SkeletonBlock className="h-40 w-full rounded-xl" />
    <div className="flex gap-2">
      <SkeletonBlock className="h-6 w-20 rounded-full" />
      <SkeletonBlock className="h-6 w-24 rounded-full" />
    </div>
    <SkeletonBlock className="h-3 w-2/3" />
  </div>
);

export const SkeletonMapPanel = () => (
  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 h-96 space-y-3">
    <SkeletonBlock className="h-4 w-32" />
    <SkeletonBlock className="h-full w-full rounded-xl" />
  </div>
);
