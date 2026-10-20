import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Heart, Users, Flame } from 'lucide-react';
import { MatchAnalysis } from '../types/zodiac';

interface ShareCardModalProps {
  match: MatchAnalysis;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ match, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { sign1, sign2, scores, title, aspectVibe, loveInsight, affirmation } = match;

  const handleCopyText = async () => {
    const textToCopy = `🌌 ZODIAC MATCH RESULT
✨ ${sign1.glyph} ${sign1.name} & ${sign2.glyph} ${sign2.name}
📊 Skor Harmoni: ${scores.overall}% (${aspectVibe})
💫 "${title}"

❤️ Asmara: ${scores.love}%
👥 Pertemanan: ${scores.friendship}%
🔥 Chemistry: ${scores.chemistry}%

💬 Percikan Jiwa: ${loveInsight.chemistrySpark}
🌟 Afirmasi: "${affirmation}"

Cek kecocokan zodiakmu di Zodiac Match!`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b0f19] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-white">Kartu Harmoni Kosmik</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Visual Celestial Card Preview */}
        <div
          id="cosmic-share-card"
          className="relative rounded-2xl p-6 bg-gradient-to-b from-[#111726] to-[#07090e] border border-amber-500/30 shadow-2xl text-center space-y-4 overflow-hidden"
        >
          {/* Subtle star particle simulation */}
          <div className="absolute inset-0 cosmic-stars-layer opacity-40 pointer-events-none" />

          {/* Top Label */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 text-xs text-amber-300/90 font-serif tracking-widest uppercase">
            <span>ZODIAC MATCH</span>
            <span>·</span>
            <span>KOSMIK HARMONI</span>
          </div>

          {/* Dual Glyphs in Glowing Rings */}
          <div className="relative z-10 flex items-center justify-center gap-4 py-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif text-3xl border shadow-lg"
              style={{
                borderColor: `${sign1.colorAccent}60`,
                backgroundColor: `${sign1.colorAccent}20`,
                color: sign1.colorAccent,
              }}
            >
              {sign1.glyph}
            </div>

            <div className="text-amber-400 font-serif text-xl font-bold">+</div>

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif text-3xl border shadow-lg"
              style={{
                borderColor: `${sign2.colorAccent}60`,
                backgroundColor: `${sign2.colorAccent}20`,
                color: sign2.colorAccent,
              }}
            >
              {sign2.glyph}
            </div>
          </div>

          {/* Names & Score */}
          <div className="relative z-10 space-y-1">
            <h4 className="font-serif text-xl font-bold text-white tracking-wide">
              {sign1.name} &amp; {sign2.name}
            </h4>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-serif text-sm font-semibold">
              Kecocokan {scores.overall}%
            </div>
          </div>

          {/* Title Quote */}
          <p className="relative z-10 text-xs italic text-slate-300 font-serif max-w-sm mx-auto">
            "{title}"
          </p>

          {/* 3 Metric Pills */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="flex items-center justify-center gap-1 text-rose-300 text-[11px] mb-0.5">
                <Heart className="w-3 h-3" /> Asmara
              </span>
              <span className="font-bold text-white tabular-nums">{scores.love}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="flex items-center justify-center gap-1 text-sky-300 text-[11px] mb-0.5">
                <Users className="w-3 h-3" /> Sahabat
              </span>
              <span className="font-bold text-white tabular-nums">{scores.friendship}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="flex items-center justify-center gap-1 text-purple-300 text-[11px] mb-0.5">
                <Flame className="w-3 h-3" /> Chemistry
              </span>
              <span className="font-bold text-white tabular-nums">{scores.chemistry}%</span>
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Teks Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Teks Ringkasan (WhatsApp/Bio)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
