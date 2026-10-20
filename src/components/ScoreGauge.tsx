import React from 'react';
import { Heart, Users, Home, MessageSquare, Flame, Bookmark, Share2, Check } from 'lucide-react';
import { MatchAnalysis } from '../types/zodiac';

interface ScoreGaugeProps {
  match: MatchAnalysis;
  isSaved: boolean;
  onToggleSave: () => void;
  onOpenShare: () => void;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  match,
  isSaved,
  onToggleSave,
  onOpenShare,
}) => {
  const { scores, aspectName, aspectVibe, elementSynergy, title } = match;
  const overall = scores.overall;

  // Determine score tier and color
  let tierLabel = 'Cukup Cocok';
  let gaugeColor = '#38bdf8'; // sky
  let glowColor = 'rgba(56, 189, 248, 0.3)';

  if (overall >= 90) {
    tierLabel = 'Harmoni Kosmik Sempurna';
    gaugeColor = '#f59e0b'; // amber
    glowColor = 'rgba(245, 158, 11, 0.35)';
  } else if (overall >= 80) {
    tierLabel = 'Sangat Serasi & Selaras';
    gaugeColor = '#10b981'; // emerald
    glowColor = 'rgba(16, 185, 129, 0.35)';
  } else if (overall >= 70) {
    tierLabel = 'Menarik dengan Penyesuaian';
    gaugeColor = '#818cf8'; // indigo
    glowColor = 'rgba(129, 140, 248, 0.35)';
  } else {
    tierLabel = 'Gesekan Dinamis & Pertumbuhan';
    gaugeColor = '#f43f5e'; // rose
    glowColor = 'rgba(244, 63, 94, 0.35)';
  }

  // SVG Circular calculation
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:p-8 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: gaugeColor }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 items-center">
        {/* Left: Radiant Gauge */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring Meter */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Stroke */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={gaugeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: `drop-shadow(0 0 8px ${glowColor})`,
                }}
              />
            </svg>

            {/* Inner Center Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                {overall}%
              </span>
              <span className="text-[11px] tracking-wider uppercase text-slate-400 mt-0.5">
                Kecocokan
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full border"
              style={{
                color: gaugeColor,
                backgroundColor: `${gaugeColor}15`,
                borderColor: `${gaugeColor}40`,
              }}
            >
              {tierLabel}
            </span>
          </div>
        </div>

        {/* Right: Dynamic Description & Multi-Aspect Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1.5">
              <span className="text-amber-300 font-medium">{aspectName}</span>
              <span>·</span>
              <span>{aspectVibe}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {elementSynergy}
            </p>
          </div>

          {/* 5 Aspect Metric Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Love */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-rose-300 font-medium">
                  <Heart className="w-3.5 h-3.5" /> Asmara & Cinta
                </span>
                <span className="font-semibold text-slate-200 tabular-nums">{scores.love}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scores.love}%` }}
                />
              </div>
            </div>

            {/* Friendship */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-sky-300 font-medium">
                  <Users className="w-3.5 h-3.5" /> Pertemanan & Sahabat
                </span>
                <span className="font-semibold text-slate-200 tabular-nums">{scores.friendship}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scores.friendship}%` }}
                />
              </div>
            </div>

            {/* Family & Domestic */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                  <Home className="w-3.5 h-3.5" /> Keluarga & Kerjasama
                </span>
                <span className="font-semibold text-slate-200 tabular-nums">{scores.family}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scores.family}%` }}
                />
              </div>
            </div>

            {/* Communication */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <MessageSquare className="w-3.5 h-3.5" /> Komunikasi & Pikiran
                </span>
                <span className="font-semibold text-slate-200 tabular-nums">{scores.communication}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scores.communication}%` }}
                />
              </div>
            </div>

            {/* Chemistry / Spark (Spans 2 columns on sm+) */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 sm:col-span-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-purple-300 font-medium">
                  <Flame className="w-3.5 h-3.5" /> Keintiman & Daya Tarik Emosional (Chemistry)
                </span>
                <span className="font-semibold text-slate-200 tabular-nums">{scores.chemistry}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scores.chemistry}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/5">
            <button
              onClick={onToggleSave}
              className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all flex items-center gap-2 ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isSaved ? 'Tersimpan di Favorit' : 'Simpan Pasangan Ini'}</span>
            </button>

            <button
              onClick={onOpenShare}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Lihat &amp; Bagikan Kartu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
