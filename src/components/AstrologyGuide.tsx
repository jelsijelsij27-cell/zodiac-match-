import React from 'react';
import { Flame, Mountain, Wind, Droplets, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ELEMENT_DESCRIPTIONS } from '../data/zodiacSigns';

export const AstrologyGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Panduan Filosofi &amp; Sains Astrologi Modern
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Zodiac Match dirancang berdasarkan harmoni 4 Elemen, 3 Modalitas, dan Geometri Aspek Astrologi. Pahami fondasinya untuk membaca hubungan secara lebih bijaksana dan mendalam.
        </p>
      </div>

      {/* 4 Elements Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-white">
            01. Empat Elemen Alam &amp; Kimia Hubungan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fire */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Flame className="w-4 h-4" />
              <span>Elemen Api (Aries, Leo, Sagitarius)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ELEMENT_DESCRIPTIONS.fire.description}
            </p>
            <div className="text-[11px] text-amber-300/80 pt-1">
              <strong>Simbiosis Ideal:</strong> Sangat hidup bersama Udara; membutuhkan Tanah untuk tidak terbakar habis.
            </div>
          </div>

          {/* Earth */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Mountain className="w-4 h-4" />
              <span>Elemen Tanah (Taurus, Virgo, Capricorn)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ELEMENT_DESCRIPTIONS.earth.description}
            </p>
            <div className="text-[11px] text-emerald-300/80 pt-1">
              <strong>Simbiosis Ideal:</strong> Sangat subur bersama Air; menyeimbangkan gelombang emosi menjadi stabilitas.
            </div>
          </div>

          {/* Air */}
          <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/20 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Wind className="w-4 h-4" />
              <span>Elemen Udara (Gemini, Libra, Aquarius)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ELEMENT_DESCRIPTIONS.air.description}
            </p>
            <div className="text-[11px] text-sky-300/80 pt-1">
              <strong>Simbiosis Ideal:</strong> Memantik Api untuk terus menyala; menyegarkan rutinitas hubungan.
            </div>
          </div>

          {/* Water */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
              <Droplets className="w-4 h-4" />
              <span>Elemen Air (Cancer, Scorpio, Pisces)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ELEMENT_DESCRIPTIONS.water.description}
            </p>
            <div className="text-[11px] text-purple-300/80 pt-1">
              <strong>Simbiosis Ideal:</strong> Mengalir alami bersama Tanah; memberikan kehangatan jiwa dan empati.
            </div>
          </div>
        </div>
      </div>

      {/* 3 Modalities Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-white">
            02. Tiga Modalitas: Bagaimana Cara Merespons Masalah
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 space-y-2">
            <h4 className="font-semibold text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Kardinal (Inisiator)
            </h4>
            <span className="text-[11px] text-slate-400 block">Aries, Cancer, Libra, Capricorn</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pemulai aksi dan pembawa visi awal. Saat menghadapi tantangan, mereka langsung mengambil inisiatif untuk bergerak maju atau memimpin solusi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 space-y-2">
            <h4 className="font-semibold text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Tetap / Fixed (Stabilisator)
            </h4>
            <span className="text-[11px] text-slate-400 block">Taurus, Leo, Scorpio, Aquarius</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pondasi kesetiaan dan konsistensi. Mereka menjaga komitmen tetap kokoh hingga akhir, namun rentan bersikap keras kepala jika dipaksa berubah tiba-tiba.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 space-y-2">
            <h4 className="font-semibold text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Berubah / Mutable (Adaptor)
            </h4>
            <span className="text-[11px] text-slate-400 block">Gemini, Virgo, Sagitarius, Pisces</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jembatan fleksibilitas dan kompromi. Sangat luwes menyesuaikan diri dengan situasi baru, menjadi penengah saat terjadi ketegangan antara dua pihak.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy & Wise Advice */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-base font-serif">
          <HeartHandshake className="w-5 h-5" />
          <span>Filosofi Penggunaan Zodiac Match</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Astrologi bukanlah vonis takdir yang kaku, melainkan sebuah <strong>peta cermin kepribadian</strong>. Skor kecocokan 65% tidak berarti hubungan akan gagal, sama halnya skor 95% tidak menjamin bebas dari masalah tanpa usaha.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Kunci hubungan yang abadi selalu bertumpu pada <strong>komunikasi yang jujur, rasa saling menghormati, dan kedewasaan emosional</strong> untuk merayakan perbedaan satu sama lain. Gunakan Zodiac Match sebagai sarana menyenangkan untuk lebih memahami pasangan, sahabat, dan keluargamu!
        </p>
      </div>
    </div>
  );
};
