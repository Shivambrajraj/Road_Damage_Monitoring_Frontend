// frontend/src/pages/HomePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import {
  RoadMarkIcon,
  UploadCloudIcon,
  ScanIcon,
  PinIcon,
  GaugeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CameraIcon,
  TrendUpIcon,
  ClockIcon,
  GlobeIcon,
  StackIcon,
} from '../shared/components/Icons';

/* ---------------------------------------------------------
   Small local hook: animates a number up once it becomes
   visible on screen. Purely presentational — no app state.
--------------------------------------------------------- */
const useCountUp = (end, { duration = 1400, decimals = 0, active = false } = {}) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    let raf;
    let startTime = null;

    const tick = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
};

const STATS = [
  { key: 'accuracy', label: 'Detection Accuracy', end: 96.8, decimals: 1, suffix: '%', icon: TrendUpIcon, ring: 'text-sky-400', bg: 'bg-sky-500/10' },
  { key: 'roads', label: 'Roads Scanned', end: 18400, decimals: 0, suffix: ' km', icon: RoadMarkIcon, ring: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { key: 'reports', label: 'Reports Generated', end: 7250, decimals: 0, suffix: '+', icon: StackIcon, ring: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { key: 'cities', label: 'Cities Covered', end: 24, decimals: 0, suffix: '', icon: GlobeIcon, ring: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const FEATURES = [
  {
    icon: CameraIcon,
    iconWrap: 'bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20',
    title: 'Instant Damage Detection',
    desc: 'Upload a photo or a short driving clip and get a clear read on potholes, cracks, and surface wear in seconds — no manual review needed.',
  },
  {
    icon: PinIcon,
    iconWrap: 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20',
    title: 'Automatic Location Tagging',
    desc: 'Every report is pinned to its exact location on the map the moment it is created, so field crews always know exactly where to go.',
  },
  {
    icon: TrendUpIcon,
    iconWrap: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20',
    title: 'Cost & Priority Insights',
    desc: 'See severity and estimated repair cost side by side, so maintenance budgets go where the damage is worst first.',
  },
];

const WORKFLOW = [
  { icon: UploadCloudIcon, title: 'Upload', desc: 'Snap a photo or upload footage from a routine road drive.' },
  { icon: ScanIcon, title: 'Detection', desc: 'The system scans the image and flags potholes, cracks, and wear.' },
  { icon: PinIcon, title: 'GPS Tagging', desc: 'Each finding is stamped with its exact location automatically.' },
  { icon: GaugeIcon, title: 'Dashboard', desc: 'Reports land in your console, sorted and ready for action.' },
];

const RECENT_ROWS = [
  { name: 'MG Road, Sector 4', severity: 'High', time: '2m ago', color: 'bg-red-500' },
  { name: 'Ashok Rajpath', severity: 'Medium', time: '18m ago', color: 'bg-amber-500' },
  { name: 'Gandhi Maidan Loop', severity: 'Low', time: '41m ago', color: 'bg-emerald-500' },
  { name: 'Bailey Road, KM 6', severity: 'High', time: '1h ago', color: 'bg-red-500' },
];

const SEVERITY_BARS = [
  { label: 'Low', value: 38, color: 'bg-emerald-500' },
  { label: 'Medium', value: 42, color: 'bg-amber-500' },
  { label: 'High', value: 20, color: 'bg-red-500' },
];

const StatCard = ({ stat, active, index }) => {
  const Icon = stat.icon;
  const value = useCountUp(stat.end, { decimals: stat.decimals, active });

  return (
    <div
      className="hover-lift bg-slate-950/40 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${stat.bg} ${stat.ring}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-white tracking-tight tabular-nums">
          {value}
          <span className="text-lg">{stat.suffix}</span>
        </p>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const statsSectionRef = useRef(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-20 md:space-y-24 py-2">

      {/* ============================= HERO ============================= */}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-4 lg:pt-8">

        {/* Left: copy + CTAs */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1.5 rounded-full text-sky-400 text-xs font-semibold">
            <ScanIcon className="w-3.5 h-3.5" />
            <span>Live in 24 cities and counting</span>
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Spot road damage
            <br />
            before it becomes{' '}
            <span className="bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              a bigger problem
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
            Upload a photo or a short driving clip and get an instant, reliable read on potholes,
            cracks, and surface wear — pinned to the map and routed straight to your team's dashboard.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-sky-500/15 transition-all text-sm"
              >
                Open Console
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-sky-500/15 transition-all text-sm"
              >
                Get Started
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <a
              href="#workflow"
              className="inline-flex items-center justify-center gap-2 bg-slate-800/70 hover:bg-slate-700/80 text-slate-200 font-semibold px-7 py-3.5 rounded-xl border border-slate-700 transition-all text-sm"
            >
              See how it works
            </a>
          </div>

          <div className="pt-3 flex items-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-500" /> No install required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-500" /> Works from any device
            </span>
          </div>
        </div>

        {/* Right: dashboard / detection preview */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: '140ms' }}>
          {/* ambient glow */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-sky-500/20 rounded-full blur-3xl animate-soft-pulse pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl animate-soft-pulse pointer-events-none" style={{ animationDelay: '1.2s' }} />

          <div className="relative bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* window chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">scan_0417.jpg</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </span>
            </div>

            {/* "photo" area with detection box */}
            <div className="relative m-4 rounded-xl overflow-hidden border border-slate-800 bg-linear-to-br from-slate-800 via-slate-800/60 to-slate-900 h-48 md:h-56">
              {/* road texture strokes */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-x-0 top-1/2 h-1 bg-slate-700 -translate-y-1/2" />
                <div className="absolute inset-y-0 left-6 w-px bg-slate-700" />
                <div className="absolute inset-y-0 right-10 w-px bg-slate-700" />
              </div>
              {/* scanline sweep */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-sky-400/25 to-transparent animate-scanline" />
              {/* bounding box */}
              <div className="absolute left-[24%] top-[38%] w-[46%] h-[38%] border-2 border-red-400/90 rounded-md">
                <span className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                  Pothole · 94%
                </span>
              </div>
            </div>

            {/* info chips */}
            <div className="px-4 pb-4 grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg py-2.5">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Severity</p>
                <p className="text-xs font-bold text-red-400 mt-1">High</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg py-2.5">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Location</p>
                <p className="text-xs font-bold text-slate-200 mt-1">25.6°N, 85.1°E</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg py-2.5">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Est. Cost</p>
                <p className="text-xs font-bold text-emerald-400 mt-1">₹4,200</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= STATS ============================= */}
      <section ref={statsSectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.key} stat={stat} active={statsActive} index={i} />
        ))}
      </section>

      {/* ============================= FEATURES ============================= */}
      <section id="features" className="space-y-10 scroll-mt-24">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Built for real road maintenance teams
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            One simple pipeline that turns a photo into an actionable, located, and priced repair report.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="hover-lift group bg-slate-950/40 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors ${feature.iconWrap}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================= WORKFLOW ============================= */}
      <section id="workflow" className="space-y-10 scroll-mt-24">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            From photo to fixed — in four steps
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            No manual data entry. No spreadsheets. Just point, upload, and let the dashboard do the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKFLOW.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === WORKFLOW.length - 1;
            return (
              <div
                key={step.title}
                className="relative hover-lift bg-slate-950/40 border border-slate-800 rounded-2xl p-5 animate-fade-in-up"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-600">Step {i + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>

                {!isLast && (
                  <ArrowRightIcon className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 w-4 h-4 text-slate-700" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================= SCREENSHOT PREVIEW ============================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            See it the way your team will
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            A live look at the console your maintenance crews open every morning.
          </p>
        </div>

        <div className="animate-fade-in-up bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
          {/* browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-md px-3 py-1 text-[11px] text-slate-500 font-mono max-w-xs">
              app.roadanomaly.ai/dashboard
            </div>
          </div>

          <div className="p-5 md:p-6 grid lg:grid-cols-5 gap-5">
            {/* recent reports */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Recent Reports</h4>
                <span className="text-[10px] text-slate-600 font-mono">Updated just now</span>
              </div>
              <div className="space-y-2">
                {RECENT_ROWS.map((row) => (
                  <div
                    key={row.name}
                    className="hover-lift flex items-center justify-between bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${row.color}`} />
                      <span className="text-sm text-slate-200 font-medium truncate">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" /> {row.time}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {row.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* severity distribution */}
            <div className="lg:col-span-2 bg-slate-950/50 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Severity Mix</h4>
              <div className="space-y-3">
                {SEVERITY_BARS.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 font-medium">{bar.label}</span>
                      <span className="text-slate-500 font-mono">{bar.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color} transition-all duration-700`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-800">
                <GlobeIcon className="w-3.5 h-3.5" />
                Across 24 cities, updated continuously
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FINAL CTA ============================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 px-6 py-12 md:px-16 md:py-16 text-center animate-fade-in-up">
        <div className="absolute -top-16 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Ready to see your roads clearly?
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Join maintenance teams already using the platform to catch damage early and keep repair budgets on track.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/upload"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/15 transition-all text-sm"
              >
                Upload a Report
              </Link>
            ) : (
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/15 transition-all text-sm"
              >
                Access Portal
              </Link>
            )}
            <Link
              to="/map"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/70 hover:bg-slate-700/80 text-slate-200 font-semibold px-8 py-3.5 rounded-xl border border-slate-700 transition-all text-sm"
            >
              View Live Map
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
