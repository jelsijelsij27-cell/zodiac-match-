import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { ZodiacSignInfo, SavedMatch } from './types/zodiac';
import { ZODIAC_SIGNS } from './data/zodiacSigns';
import { calculateCompatibility } from './data/compatibilityEngine';
import { Header } from './components/Header';
import { ZodiacPicker } from './components/ZodiacPicker';
import { ScoreGauge } from './components/ScoreGauge';
import { MatchDetailTabs } from './components/MatchDetailTabs';
import { CompatibilityMatrix } from './components/CompatibilityMatrix';
import { DateFinderModal } from './components/DateFinderModal';
import { AstrologyGuide } from './components/AstrologyGuide';
import { ShareCardModal } from './components/ShareCardModal';
import { SavedDrawer } from './components/SavedDrawer';

const LOCAL_STORAGE_KEY = 'zodiac_match_saved_pairs';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'matrix' | 'date-finder' | 'guide'>('calculator');
  const [sign1, setSign1] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[0]); // Aries
  const [sign2, setSign2] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[6]); // Libra (Opposite polarity match)

  const [savedMatches, setSavedMatches] = useState<SavedMatch[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load saved matches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedMatches(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = (newList: SavedMatch[]) => {
    setSavedMatches(newList);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  // Calculate compatibility whenever sign1 or sign2 changes
  const matchAnalysis = calculateCompatibility(sign1, sign2);

  // Check if current pair is saved
  const isCurrentSaved = savedMatches.some(
    (m) =>
      (m.sign1Id === sign1.id && m.sign2Id === sign2.id) ||
      (m.sign1Id === sign2.id && m.sign2Id === sign1.id)
  );

  const handleToggleSave = () => {
    if (isCurrentSaved) {
      const updated = savedMatches.filter(
        (m) =>
          !(
            (m.sign1Id === sign1.id && m.sign2Id === sign2.id) ||
            (m.sign1Id === sign2.id && m.sign2Id === sign1.id)
          )
      );
      saveToStorage(updated);
    } else {
      const newMatch: SavedMatch = {
        id: `${sign1.id}-${sign2.id}-${Date.now()}`,
        sign1Id: sign1.id,
        sign2Id: sign2.id,
        savedAt: Date.now(),
      };
      saveToStorage([newMatch, ...savedMatches]);
    }
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedMatches.filter((m) => m.id !== id);
    saveToStorage(updated);
  };

  const handleClearAllSaved = () => {
    saveToStorage([]);
  };

  const handleSwapSigns = () => {
    const temp = sign1;
    setSign1(sign2);
    setSign2(temp);
  };

  const handleRandomize = () => {
    const randomIndex1 = Math.floor(Math.random() * ZODIAC_SIGNS.length);
    let randomIndex2 = Math.floor(Math.random() * ZODIAC_SIGNS.length);
    if (randomIndex2 === randomIndex1) {
      randomIndex2 = (randomIndex2 + 1) % ZODIAC_SIGNS.length;
    }
    setSign1(ZODIAC_SIGNS[randomIndex1]);
    setSign2(ZODIAC_SIGNS[randomIndex2]);
  };

  const handleSelectPairFromMatrix = (s1: ZodiacSignInfo, s2: ZodiacSignInfo) => {
    setSign1(s1);
    setSign2(s2);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 relative selection:bg-amber-400/20 selection:text-amber-200">
      {/* Background Cosmic Star Dust Effect */}
      <div className="fixed inset-0 cosmic-stars-layer opacity-40 pointer-events-none z-0" />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedCount={savedMatches.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* TAB: CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Introduction with Astrolabe Art */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0d121f] via-[#101728] to-[#0d121f] p-6 sm:p-10 shadow-2xl">
              {/* Background ambient nebula image overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-screen"
                style={{
                  backgroundImage: `url(/src/assets/images/zodiac_hero_nebula_1792492927064.jpg)`,
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6 items-center">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Astrologi Kompatibilitas Multidimensi</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
                    Ungkap Harmoni Kosmik Dua Jiwa
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Ketahui kecocokan mendalam dalam <strong>cinta &amp; asmara</strong>, <strong>pertemanan sejati</strong>, serta <strong>keluarga &amp; kerja sama</strong> berdasarkan sains elemen dan modalitas zodiak.
                  </p>
                </div>

                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <img
                    src="/src/assets/images/celestial_zodiac_wheel_1792492926636.jpg"
                    alt="Celestial Astrolabe Emblem"
                    className="w-32 h-32 rounded-full border border-amber-400/30 shadow-xl object-cover hover:rotate-45 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Zodiac Selector Box */}
            <section aria-label="Pemilih Zodiak">
              <ZodiacPicker
                sign1={sign1}
                sign2={sign2}
                onSelectSign1={setSign1}
                onSelectSign2={setSign2}
                onSwapSigns={handleSwapSigns}
                onRandomize={handleRandomize}
              />
            </section>

            {/* Score & Harmony Overview */}
            <section aria-label="Hasil Analisis Harmoni">
              <ScoreGauge
                match={matchAnalysis}
                isSaved={isCurrentSaved}
                onToggleSave={handleToggleSave}
                onOpenShare={() => setIsShareOpen(true)}
              />
            </section>

            {/* Multi-Aspect Relationship Breakdown & Real-Life Scenarios */}
            <section aria-label="Detail Aspek Hubungan">
              <MatchDetailTabs match={matchAnalysis} />
            </section>
          </div>
        )}

        {/* TAB: COMPATIBILITY MATRIX */}
        {activeTab === 'matrix' && (
          <div className="animate-in fade-in duration-300">
            <CompatibilityMatrix onSelectPair={handleSelectPairFromMatrix} />
          </div>
        )}

        {/* TAB: DATE OF BIRTH FINDER */}
        {activeTab === 'date-finder' && (
          <div className="animate-in fade-in duration-300">
            <DateFinderModal
              onSetSign1={(s) => {
                setSign1(s);
                setActiveTab('calculator');
              }}
              onSetSign2={(s) => {
                setSign2(s);
                setActiveTab('calculator');
              }}
            />
          </div>
        )}

        {/* TAB: COSMIC GUIDE */}
        {activeTab === 'guide' && (
          <div className="animate-in fade-in duration-300">
            <AstrologyGuide />
          </div>
        )}
      </main>

      {/* Shareable Card Modal */}
      {isShareOpen && (
        <ShareCardModal
          match={matchAnalysis}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      {/* Saved Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedMatches={savedMatches}
        onSelectPair={(s1, s2) => {
          setSign1(s1);
          setSign2(s2);
          setActiveTab('calculator');
        }}
        onDeleteMatch={handleDeleteSaved}
        onClearAll={handleClearAllSaved}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#04060a] py-8 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-serif font-bold text-slate-200 uppercase tracking-wider text-sm">
              ZODIAC MATCH
            </span>
            <p className="mt-1 text-slate-500">
              Eksplorasi astrologi modern untuk keharmonisan cinta, persahabatan, dan keluarga.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-amber-300 transition-colors"
            >
              Filosofi Astrologi
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('matrix')}
              className="hover:text-amber-300 transition-colors"
            >
              Matriks 12 Zodiak
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('date-finder')}
              className="hover:text-amber-300 transition-colors"
            >
              Cari Zodiak
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
