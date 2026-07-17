// frontend/src/shared/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { RoadMarkIcon, GithubIcon, LinkedInIcon, MailIcon } from './Icons';

const BUILD_NUMBER = '20260717.4';
const VERSION = 'v1.0.0-Beta';

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Deploy Run', to: '/upload' },
      { label: 'GIS Map', to: '/map' },
      { label: 'Analytics', to: '/analytics' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Municipal Corporations', to: '/' },
      { label: 'Smart Cities', to: '/' },
      { label: 'Public Works Departments', to: '/' },
      { label: 'Highway Authorities', to: '/' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'AI Detection Engine', to: '/' },
      { label: 'GIS Intelligence', to: '/' },
      { label: 'Severity Classification', to: '/' },
      { label: 'REST API', href: 'https://github.com' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://github.com' },
      { label: 'API Reference', href: 'https://github.com' },
      { label: 'System Architecture', href: 'https://github.com' },
      { label: 'Release Notes', href: 'https://github.com' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About RoadAnomalyAI', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Blog', to: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/' },
      { label: 'System Status', to: '/' },
      { label: 'Report an Issue', href: 'https://github.com' },
      { label: 'Contact Support', to: '/' },
    ],
  },
];

const FooterLink = ({ link }) => {
  const className = 'text-[12px] text-slate-500 hover:text-sky-400 transition-colors duration-200 hover:translate-x-0.5 inline-block';
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  );
};

/**
 * Universal application footer — premium enterprise layout with grouped
 * navigation, social/contact links, and build metadata.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-3.5">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Brand + copyright */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <RoadMarkIcon className="w-4 h-4 text-sky-400" />
            </span>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-tight">RoadAnomalyAI</p>
              <p className="text-[11px] text-slate-600">
                &copy; {currentYear} RoadAnomalyAI. All rights reserved.
              </p>
            </div>
          </div>

          {/* Social + legal + status */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors hover-lift"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors hover-lift"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@roadanomalyai.io"
                aria-label="Email"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors hover-lift"
              >
                <MailIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="w-px h-5 bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-4 text-[11px] text-slate-600">
              <Link to="/" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-slate-300 transition-colors">Terms</Link>
            </div>

            <div className="w-px h-5 bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                OPERATIONAL
              </span>
              <span>{VERSION}</span>
              <span className="text-slate-700">·</span>
              <span>Build {BUILD_NUMBER}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
