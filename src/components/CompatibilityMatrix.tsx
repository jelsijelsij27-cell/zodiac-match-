import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Users } from 'lucide-react';
import { ZodiacSignInfo } from '../types/zodiac';
import { ZODIAC_SIGNS } from '../data/zodiacSigns';
import { calculateCompatibility } from '../data/compatibilityEngine';

interface CompatibilityMatrixProps {
  onSelectPair: (sign1: ZodiacSignInfo, sign2: ZodiacSignInfo) => void;
}

export const CompatibilityMatrix: React.FC<CompatibilityMatrixProps> = ({ onSelectPair }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[0]);

  // Compute all matches for this sign
  const allMatches = ZODIAC_SIGNS.map((other) => {
    const analysis = calculateCompatibility(selectedSign, other);
    return {
      otherSign: other,
      analysis,
      overall: analysis.scores.overall,
      love: analysis.scores.love,
      friendship: analysis.scores.friendship,
    };
  }).sort((a, b) => b.overall - a.overall);

  const soulmates = allMatches.filter((m) => m.overall >= 88);
  const harmonious = allMatches.filter((m) => m.overall >= 78 && m.overall < 88);
  const growth = allMatches.filter((m) => m.overall < 78);

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'text-amber-300 bg-amber-500/15 border-amber-500/30';
    if (score >= 80) return 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30';
    if (score >= 70) return 'text-sky-300 bg-sky-500/15 border-sky-500/30';
    return 'text-rose-300 bg-rose-500/15 border-rose-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Matriks Kecocokan 12 Zodiak
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Pilih zodiak untuk melihat peta harmoni lengkap dengan semua tanda zodiak lainnya. Klik kartu untuk menganalisis secara detail di kalkulator.
        </p>
      </div>

      {/* Horizontal Sign Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ZODIAC_SIGNS.map((s) => {
          const isCurrent = s.id === selectedSign.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSign(s)}
              className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-2 shrink-0 ${
                isCurrent
                  ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-md'
                  : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="font-serif text-base" style={{ color: s.colorAccent }}>{s.glyph}</span>
              <span className="text-xs font-semibold whitespace-nowrap">{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Sign Summary Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-2xl border"
            style={{
              borderColor: `${selectedSign.colorAccent}40`,
              backgroundColor: `${selectedSign.colorAccent}15`,
              color: selectedSign.colorAccent,
            }}
          >
            {selectedSign.glyph}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-white">{selectedSign.name}</h3>
              <span className="text-xs text-slate-400 font-medium">({selectedSign.elementNameId} · {selectedSign.dateRange})</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{selectedSign.tagline}</p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-4 shrink-0">
          <div>
            <span className="text-slate-500 block">Planet Pelindung</span>
            <span className="text-slate-200 font-semibold">{selectedSign.ruler}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="text-slate-500 block">Modalitas</span>
            <span className="text-slate-200 font-semibold">{selectedSign.modalityNameId.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Category 1: Soulmates & Highest Harmony */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif text-base font-bold text-white">
            Pasangan Jiwa &amp; Harmoni Tertinggi (88% - 100%)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {soulmates.map(({ otherSign, analysis, overall, love, friendship }) => (
            <div
              key={otherSign.id}
              onClick={() => onSelectPair(selectedSign, otherSign)}
              className="group cursor-pointer p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all shadow-md space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-serif" style={{ color: otherSign.colorAccent }}>
                    {otherSign.glyph}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-white group-hover:text-amber-200 transition-colors">
                      {selectedSign.name} + {otherSign.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Elemen {otherSign.elementNameId}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border tabular-nums ${getScoreBadge(overall)}`}>
                  {overall}%
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {analysis.title}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-rose-300">
                    <Heart className="w-3 h-3" /> {love}%
                  </span>
                  <span className="flex items-center gap-1 text-sky-300">
                    <Users className="w-3 h-3" /> {friendship}%
                  </span>
                </div>
                <span className="text-amber-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                  Analisis <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category 2: Harmonious & Balanced */}
      <div className="space-y-3 pt-2">
        <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
          <span>Kemitraan Hangat &amp; Seimbang (78% - 87%)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {harmonious.map(({ otherSign, analysis, overall, love, friendship }) => (
            <div
              key={otherSign.id}
              onClick={() => onSelectPair(selectedSign, otherSign)}
              className="group cursor-pointer p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-400/50 hover:bg-slate-800/80 transition-all shadow-md space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-serif" style={{ color: otherSign.colorAccent }}>
                    {otherSign.glyph}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-white group-hover:text-emerald-200 transition-colors">
                      {selectedSign.name} + {otherSign.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Elemen {otherSign.elementNameId}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border tabular-nums ${getScoreBadge(overall)}`}>
                  {overall}%
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {analysis.title}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-rose-300">
                    <Heart className="w-3 h-3" /> {love}%
                  </span>
                  <span className="flex items-center gap-1 text-sky-300">
                    <Users className="w-3 h-3" /> {friendship}%
                  </span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                  Analisis <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category 3: Growth & Dynamics */}
      {growth.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="font-serif text-base font-bold text-white">
            Hubungan Dinamis &amp; Pembelajaran Dewasa (&lt; 78%)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {growth.map(({ otherSign, analysis, overall, love, friendship }) => (
              <div
                key={otherSign.id}
                onClick={() => onSelectPair(selectedSign, otherSign)}
                className="group cursor-pointer p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-400/50 hover:bg-slate-800/80 transition-all shadow-md space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl font-serif" style={{ color: otherSign.colorAccent }}>
                      {otherSign.glyph}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm text-white group-hover:text-sky-200 transition-colors">
                        {selectedSign.name} + {otherSign.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Elemen {otherSign.elementNameId}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border tabular-nums ${getScoreBadge(overall)}`}>
                    {overall}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {analysis.title}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-300">
                      <Heart className="w-3 h-3" /> {love}%
                    </span>
                    <span className="flex items-center gap-1 text-sky-300">
                      <Users className="w-3 h-3" /> {friendship}%
                    </span>
                  </div>
                  <span className="text-sky-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                    Analisis <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
