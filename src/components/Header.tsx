import React from 'react';
import { Bookmark, Sparkles, Compass, Grid, Calendar, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'matrix' | 'date-finder' | 'guide';
  onSelectTab: (tab: 'calculator' | 'matrix' | 'date-finder' | 'guide') => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  onOpenSaved,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07090e]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div 
          onClick={() => onSelectTab('calculator')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-slate-100 uppercase group-hover:text-amber-200 transition-colors">
            ZODIAC MATCH
          </span>
        </div>

        {/* Navigation Zone */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <button
            onClick={() => onSelectTab('calculator')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-white/10 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Kalkulator</span>
          </button>

          <button
            onClick={() => onSelectTab('matrix')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-white/10 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Matriks Zodiak</span>
          </button>

          <button
            onClick={() => onSelectTab('date-finder')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'date-finder'
                ? 'bg-white/10 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Cari Zodiak</span>
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-white/10 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Panduan Kosmik</span>
          </button>
        </nav>

        {/* Action Zone: Saved Pairs Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSaved}
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            title="Lihat pasangan zodiak tersimpan"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Tersimpan</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center justify-center font-semibold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden border-t border-white/5 px-2 py-1.5 flex items-center justify-around bg-[#06080e]/95 text-xs">
        <button
          onClick={() => onSelectTab('calculator')}
          className={`py-1 px-2.5 rounded transition-colors ${
            activeTab === 'calculator' ? 'text-amber-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Kalkulator
        </button>
        <button
          onClick={() => onSelectTab('matrix')}
          className={`py-1 px-2.5 rounded transition-colors ${
            activeTab === 'matrix' ? 'text-amber-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Matriks
        </button>
        <button
          onClick={() => onSelectTab('date-finder')}
          className={`py-1 px-2.5 rounded transition-colors ${
            activeTab === 'date-finder' ? 'text-amber-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Cari Zodiak
        </button>
        <button
          onClick={() => onSelectTab('guide')}
          className={`py-1 px-2.5 rounded transition-colors ${
            activeTab === 'guide' ? 'text-amber-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Panduan
        </button>
      </div>
    </header>
  );
};
