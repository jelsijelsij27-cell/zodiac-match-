import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { SavedMatch, ZodiacSignInfo } from '../types/zodiac';
import { getSignById } from '../data/zodiacSigns';
import { calculateCompatibility } from '../data/compatibilityEngine';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedMatches: SavedMatch[];
  onSelectPair: (sign1: ZodiacSignInfo, sign2: ZodiacSignInfo) => void;
  onDeleteMatch: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedMatches,
  onSelectPair,
  onDeleteMatch,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0a0e18] border-l border-white/10 h-full p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Top bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">Pasangan Tersimpan</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                {savedMatches.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of saved pairs */}
          <div className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
            {savedMatches.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                  <Sparkles className="w-5 h-5 text-amber-400/60" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300">Belum Ada Pasangan Disimpan</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Klik tombol <strong>'Simpan Pasangan Ini'</strong> di halaman kalkulator untuk menyimpan kecocokan zodiak favoritmu.
                </p>
              </div>
            ) : (
              savedMatches.map((saved) => {
                const s1 = getSignById(saved.sign1Id);
                const s2 = getSignById(saved.sign2Id);
                const analysis = calculateCompatibility(s1, s2);

                return (
                  <div
                    key={saved.id}
                    className="group relative p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 shadow-md"
                  >
                    <div
                      onClick={() => {
                        onSelectPair(s1, s2);
                        onClose();
                      }}
                      className="cursor-pointer flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                          {s1.glyph} {s1.name} &amp; {s2.glyph} {s2.name}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold tabular-nums">
                          {analysis.scores.overall}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        {analysis.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          onSelectPair(s1, s2);
                          onClose();
                        }}
                        className="p-1.5 rounded-lg text-amber-400 hover:bg-white/10 transition-colors"
                        title="Buka Analisis"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteMatch(saved.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clear All Footer */}
        {savedMatches.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={onClearAll}
              className="w-full py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors flex items-center justify-center gap-1.5 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Semua Riwayat Tersimpan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
