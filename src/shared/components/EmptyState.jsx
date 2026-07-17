// frontend/src/shared/components/EmptyState.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderOpenIcon, UploadCloudIcon, ScanIcon, GlobeIcon, TrendUpIcon, InboxIcon,
} from './Icons';

const ICONS = {
  folder: FolderOpenIcon,
  upload: UploadCloudIcon,
  scan: ScanIcon,
  globe: GlobeIcon,
  trend: TrendUpIcon,
  inbox: InboxIcon,
};

/**
 * Professional empty-state block used across the dashboard, reports, map,
 * and analytics views instead of leaving blank cards. Always nudges the
 * user toward a next action via an optional CTA.
 */
const EmptyState = ({
  icon = 'folder',
  title = 'Nothing here yet',
  description = 'There is no data to display right now.',
  ctaLabel,
  ctaTo,
  onCtaClick,
  compact = false,
}) => {
  const Icon = ICONS[icon] || FolderOpenIcon;

  const cta = ctaLabel ? (
    ctaTo ? (
      <Link
        to={ctaTo}
        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {ctaLabel}
      </Link>
    ) : (
      <button
        onClick={onCtaClick}
        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {ctaLabel}
      </button>
    )
  ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/30 ${compact ? 'py-8 px-4' : 'py-16 px-6'}`}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-sky-500/10 blur-xl rounded-full" />
        <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
          <Icon className="w-6 h-6 text-sky-400" />
        </div>
      </div>
      <h3 className="text-sm font-bold text-slate-200 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 mt-1.5 max-w-sm leading-relaxed">{description}</p>
      {cta && <div className="mt-5">{cta}</div>}
    </motion.div>
  );
};

export default EmptyState;
