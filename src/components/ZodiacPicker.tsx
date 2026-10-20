import React, { useState } from 'react';
import { ArrowLeftRight, Shuffle, Check, X, Sparkles } from 'lucide-react';
import { ZodiacSignInfo } from '../types/zodiac';
import { ZODIAC_SIGNS } from '../data/zodiacSigns';

interface ZodiacPickerProps {
  sign1: ZodiacSignInfo;
  sign2: ZodiacSignInfo;
  onSelectSign1: (sign: ZodiacSignInfo) => void;
  onSelectSign2: (sign: ZodiacSignInfo) => void;
  onSwapSigns: () => void;
  onRandomize: () => void;
}

export const ZodiacPicker: React.FC<ZodiacPickerProps> = ({
  sign1,
  sign2,
  onSelectSign1,
  onSelectSign2,
  onSwapSigns,
  onRandomize,
}) => {
  const [selectingSlot, setSelectingSlot] = useState<1 | 2 | null>(null);
  const [elementFilter, setElementFilter] = useState<'all' | 'fire' | 'earth' | 'air' | 'water'>('all');

  const filteredSigns = elementFilter === 'all'
    ? ZODIAC_SIGNS
    : ZODIAC_SIGNS.filter((s) => s.element === elementFilter);

  const handlePickSign = (sign: ZodiacSignInfo) => {
    if (selectingSlot === 1) {
      onSelectSign1(sign);
    } else if (selectingSlot === 2) {
      onSelectSign2(sign);
    }
    setSelectingSlot(null);
  };

  const getElementBadgeColor = (el: string) => {
    switch (el) {
      case 'fire':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'earth':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'air':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'water':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="relative w-full">
      {/* Dual Selector Display */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
        {/* Sign 1 Card */}
        <div
          onClick={() => setSelectingSlot(1)}
          className="group relative cursor-pointer rounded-2xl p-5 border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 hover:border-amber-500/40 transition-all duration-300 shadow-xl overflow-hidden"
        >
          <div
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: sign1.colorAccent }}
          />
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="tracking-wider uppercase font-medium">Zodiak Pertama (Kamu)</span>
            <span className="text-amber-400/80 group-hover:text-amber-300 transition-colors">Ganti ▾</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-serif border shadow-inner transition-transform group-hover:scale-105"
              style={{
                borderColor: `${sign1.colorAccent}40`,
                backgroundColor: `${sign1.colorAccent}15`,
                color: sign1.colorAccent,
              }}
            >
              {sign1.glyph}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {sign1.name}
                </h3>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${getElementBadgeColor(sign1.element)}`}>
                  {sign1.elementNameId}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{sign1.dateRange}</p>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                <span>Planet: {sign1.ruler}</span>
                <span>·</span>
                <span>{sign1.modalityNameId.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Controls (Swap & Shuffle) */}
        <div className="flex md:flex-col items-center justify-center gap-2 py-2">
          <button
            onClick={onSwapSigns}
            className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all shadow-md group"
            title="Tukar Posisi Zodiak"
          >
            <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          <button
            onClick={onRandomize}
            className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all shadow-md group"
            title="Acak Pasangan Kosmik"
          >
            <Shuffle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Sign 2 Card */}
        <div
          onClick={() => setSelectingSlot(2)}
          className="group relative cursor-pointer rounded-2xl p-5 border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 hover:border-amber-500/40 transition-all duration-300 shadow-xl overflow-hidden"
        >
          <div
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: sign2.colorAccent }}
          />
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="tracking-wider uppercase font-medium">Zodiak Kedua (Pasangan / Teman)</span>
            <span className="text-amber-400/80 group-hover:text-amber-300 transition-colors">Ganti ▾</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-serif border shadow-inner transition-transform group-hover:scale-105"
              style={{
                borderColor: `${sign2.colorAccent}40`,
                backgroundColor: `${sign2.colorAccent}15`,
                color: sign2.colorAccent,
              }}
            >
              {sign2.glyph}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {sign2.name}
                </h3>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${getElementBadgeColor(sign2.element)}`}>
                  {sign2.elementNameId}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{sign2.dateRange}</p>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                <span>Planet: {sign2.ruler}</span>
                <span>·</span>
                <span>{sign2.modalityNameId.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Selection Dialog */}
      {selectingSlot !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-white/15 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Pilih Zodiak {selectingSlot === 1 ? 'Pertama' : 'Kedua'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik zodiak yang ingin kamu analisis kecocokannya
                </p>
              </div>
              <button
                onClick={() => setSelectingSlot(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Element Filter Tabs */}
            <div className="flex items-center gap-1 mt-4 p-1 bg-slate-900/80 rounded-lg border border-white/5 text-xs overflow-x-auto">
              <button
                onClick={() => setElementFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  elementFilter === 'all'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Semua (12)
              </button>
              <button
                onClick={() => setElementFilter('fire')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  elementFilter === 'fire'
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                Api (Fire)
              </button>
              <button
                onClick={() => setElementFilter('earth')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  elementFilter === 'earth'
                    ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                Tanah (Earth)
              </button>
              <button
                onClick={() => setElementFilter('air')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  elementFilter === 'air'
                    ? 'bg-sky-500/20 text-sky-300 font-medium'
                    : 'text-slate-400 hover:text-sky-300'
                }`}
              >
                Udara (Air)
              </button>
              <button
                onClick={() => setElementFilter('water')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  elementFilter === 'water'
                    ? 'bg-purple-500/20 text-purple-300 font-medium'
                    : 'text-slate-400 hover:text-purple-300'
                }`}
              >
                Air (Water)
              </button>
            </div>

            {/* Grid of signs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {filteredSigns.map((sign) => {
                const isSelected =
                  (selectingSlot === 1 && sign.id === sign1.id) ||
                  (selectingSlot === 2 && sign.id === sign2.id);

                return (
                  <button
                    key={sign.id}
                    onClick={() => handlePickSign(sign)}
                    className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                        : 'border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-white/20'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-serif shrink-0 border"
                      style={{
                        borderColor: `${sign.colorAccent}40`,
                        backgroundColor: `${sign.colorAccent}15`,
                        color: sign.colorAccent,
                      }}
                    >
                      {sign.glyph}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-slate-100 truncate">
                          {sign.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{sign.dateRange}</p>
                      <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.2 rounded border ${getElementBadgeColor(sign.element)}`}>
                        {sign.elementNameId}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
