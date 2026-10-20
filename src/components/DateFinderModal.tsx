import React, { useState } from 'react';
import { Calendar, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ZodiacSignInfo } from '../types/zodiac';
import { getZodiacFromDate } from '../data/zodiacSigns';

interface DateFinderModalProps {
  onSetSign1: (sign: ZodiacSignInfo) => void;
  onSetSign2: (sign: ZodiacSignInfo) => void;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export const DateFinderModal: React.FC<DateFinderModalProps> = ({
  onSetSign1,
  onSetSign2,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(3); // March default
  const [selectedDay, setSelectedDay] = useState<number>(25);
  const [lastAssignedSlot, setLastAssignedSlot] = useState<number | null>(null);

  // Maximum days for the selected month
  const getMaxDays = (m: number) => {
    if (m === 2) return 29;
    if ([4, 6, 9, 11].includes(m)) return 30;
    return 31;
  };

  const detectedSign = getZodiacFromDate(selectedMonth, selectedDay);

  const handleSetSlot = (slot: 1 | 2) => {
    if (slot === 1) onSetSign1(detectedSign);
    if (slot === 2) onSetSign2(detectedSign);
    setLastAssignedSlot(slot);
    setTimeout(() => setLastAssignedSlot(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6 text-amber-400" />
          <span>Detektor Zodiak Tanggal Lahir</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tidak yakin apa zodiak kamu atau pasanganmu? Pilih tanggal lahir di bawah ini untuk mencari zodiak, elemen, dan sifat alaminya secara instan.
        </p>
      </div>

      {/* Date Input Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Month Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Bulan Kelahiran
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => {
                const newMonth = Number(e.target.value);
                setSelectedMonth(newMonth);
                const max = getMaxDays(newMonth);
                if (selectedDay > max) setSelectedDay(max);
              }}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}. {name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tanggal (Hari)
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
            >
              {Array.from({ length: getMaxDays(selectedMonth) }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  Tanggal {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Card */}
        <div className="pt-4 border-t border-white/10">
          <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 relative overflow-hidden">
            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-25"
              style={{ backgroundColor: detectedSign.colorAccent }}
            />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-serif text-4xl border shrink-0 shadow-lg"
                style={{
                  borderColor: `${detectedSign.colorAccent}50`,
                  backgroundColor: `${detectedSign.colorAccent}20`,
                  color: detectedSign.colorAccent,
                }}
              >
                {detectedSign.glyph}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {detectedSign.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border bg-white/5 border-white/10 text-slate-300">
                    Elemen {detectedSign.elementNameId}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border bg-white/5 border-white/10 text-slate-300">
                    {detectedSign.modalityNameId}
                  </span>
                </div>

                <p className="text-xs text-amber-300 font-medium">
                  Rentang Tanggal: {detectedSign.dateRange} · Planet Pelindung: {detectedSign.ruler}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {detectedSign.tagline}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {detectedSign.strengths.map((str, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 mt-4 border-t border-white/10">
              <button
                onClick={() => handleSetSlot(1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {lastAssignedSlot === 1 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Telah Diset sebagai Zodiak 1</span>
                  </>
                ) : (
                  <>
                    <span>Jadikan Zodiak 1 (Saya)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </>
                )}
              </button>

              <button
                onClick={() => handleSetSlot(2)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {lastAssignedSlot === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Telah Diset sebagai Zodiak 2</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Jadikan Zodiak 2 (Pasangan) &amp; Cek Match</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
