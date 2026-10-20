import React, { useState } from 'react';
import {
  Heart,
  Users,
  Home,
  AlertTriangle,
  Lightbulb,
  Compass,
  CheckCircle2,
  XCircle,
  Sparkles,
  Quote,
} from 'lucide-react';
import { MatchAnalysis } from '../types/zodiac';

interface MatchDetailTabsProps {
  match: MatchAnalysis;
}

export const MatchDetailTabs: React.FC<MatchDetailTabsProps> = ({ match }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'love' | 'friendship' | 'family' | 'scenarios' | 'advice'>('overview');

  const {
    sign1,
    sign2,
    overviewSummary,
    loveInsight,
    friendshipInsight,
    familyInsight,
    conflictInsight,
    scenarios,
    adviceSign1,
    adviceSign2,
    affirmation,
  } = match;

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Segmented Tab Controls */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/10 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ringkasan Harmoni</span>
        </button>

        <button
          onClick={() => setActiveTab('love')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'love'
              ? 'bg-rose-500/20 text-rose-300 shadow-sm border border-rose-500/30'
              : 'text-slate-400 hover:text-rose-300 hover:bg-white/5'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Cinta &amp; Asmara</span>
        </button>

        <button
          onClick={() => setActiveTab('friendship')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'friendship'
              ? 'bg-sky-500/20 text-sky-300 shadow-sm border border-sky-500/30'
              : 'text-slate-400 hover:text-sky-300 hover:bg-white/5'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Pertemanan &amp; Sahabat</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'family'
              ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30'
              : 'text-slate-400 hover:text-emerald-300 hover:bg-white/5'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Keluarga &amp; Kolaborasi</span>
        </button>

        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'scenarios'
              ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/30'
              : 'text-slate-400 hover:text-amber-300 hover:bg-white/5'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Skenario Nyata</span>
        </button>

        <button
          onClick={() => setActiveTab('advice')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'advice'
              ? 'bg-purple-500/20 text-purple-300 shadow-sm border border-purple-500/30'
              : 'text-slate-400 hover:text-purple-300 hover:bg-white/5'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Tips Harmonisasi</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                Dinamika Hubungan {sign1.name} &amp; {sign2.name}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {overviewSummary}
              </p>
            </div>

            {/* Chemistry Spark Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent border border-amber-500/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                Percikan Kimiawi Batin (Chemistry Spark)
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {loveInsight.chemistrySpark}
              </p>
            </div>

            {/* Affirmation Box */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Afirmasi Harmoni Bersama
                </span>
                <p className="text-sm italic text-amber-200/90 leading-relaxed font-serif">
                  "{affirmation}"
                </p>
              </div>
            </div>

            {/* Quick Trait Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-serif" style={{ color: sign1.colorAccent }}>{sign1.glyph}</span>
                  <h4 className="font-semibold text-sm text-white">{sign1.name} dalam Hubungan</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {sign1.loveStyle}
                </p>
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-slate-400 block">Kekuatan Utama:</span>
                  <div className="flex flex-wrap gap-1">
                    {sign1.strengths.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-serif" style={{ color: sign2.colorAccent }}>{sign2.glyph}</span>
                  <h4 className="font-semibold text-sm text-white">{sign2.name} dalam Hubungan</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {sign2.loveStyle}
                </p>
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-slate-400 block">Kekuatan Utama:</span>
                  <div className="flex flex-wrap gap-1">
                    {sign2.strengths.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LOVE & ROMANCE */}
        {activeTab === 'love' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-300 flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Asmara &amp; Hubungan Romantis
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {loveInsight.description}
              </p>
            </div>

            {/* Date Night Idea */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 block mb-1">
                Ide Kencan Ideal Berdua
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {loveInsight.dateNightIdea}
              </p>
            </div>

            {/* Green & Red Flags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Green Flags */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Green Flags (Kekuatan Hubungan)</span>
                </div>
                <ul className="space-y-2">
                  {loveInsight.greenFlags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flags / Pitfalls */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Area Waspada (Potensi Gesekan)</span>
                </div>
                <ul className="space-y-2">
                  {loveInsight.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-rose-400 font-bold">!</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FRIENDSHIP */}
        {activeTab === 'friendship' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-sky-400" />
                Dinamika Pertemanan &amp; Sahabat Karib
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {friendshipInsight.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 block mb-1">
                Aktivitas Nongkrong Paling Seru
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {friendshipInsight.activityIdea}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3">
              <h4 className="font-semibold text-sm text-white">Alasan Mengapa Kalian Klik Sebagai Sahabat:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {friendshipInsight.strengths.map((str, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
                    <span className="font-semibold text-amber-300 block mb-1">0{idx + 1}. Kelebihan</span>
                    {str}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAMILY & WORK */}
        {activeTab === 'family' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-emerald-400" />
                Keluarga, Rumah Tangga &amp; Kolaborasi Kerja
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {familyInsight.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block">
                  Dinamika Rumah Tangga &amp; Keseharian
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {familyInsight.householdDynamic}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 block">
                  Kerjasama Tim &amp; Proyek Pekerjaan
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {familyInsight.workCollaboration}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REAL-LIFE SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Simulasi Skenario Nyata Kehidupan
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Bagaimana {sign1.name} dan {sign2.name} biasanya bereaksi dalam momen-momen nyata sehari-hari:
              </p>
            </div>

            <div className="space-y-4">
              {scenarios.map((scen, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-white">
                      {scen.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    "{scen.situation}"
                  </p>

                  <div className="p-3 rounded-lg bg-black/20 text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-200 block mb-1">Dinamika Perilaku:</span>
                    {scen.dynamic}
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                    <span className="font-semibold text-emerald-300 block mb-1">Kunci Solusi Praktis:</span>
                    {scen.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HARMONY ADVICE */}
        {activeTab === 'advice' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-purple-300 flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-purple-400" />
                Resep Emas &amp; Tips Harmonisasi
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Panduan praktis agar ikatan antara {sign1.name} dan {sign2.name} semakin kuat dan langgeng:
              </p>
            </div>

            {/* Individual Advice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg" style={{ color: sign1.colorAccent }}>{sign1.glyph}</span>
                  <h4 className="font-semibold text-sm text-white">Saran untuk {sign1.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {adviceSign1}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg" style={{ color: sign2.colorAccent }}>{sign2.glyph}</span>
                  <h4 className="font-semibold text-sm text-white">Saran untuk {sign2.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {adviceSign2}
                </p>
              </div>
            </div>

            {/* Conflict Resolution Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pemicu Gesekan &amp; Aturan Emas Saat Bertengkar</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {conflictInsight.triggerPoints.map((tp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{tp}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                <span className="font-semibold text-amber-300 block mb-0.5">Aturan Emas (Golden Rule):</span>
                {conflictInsight.goldenRecipe}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
