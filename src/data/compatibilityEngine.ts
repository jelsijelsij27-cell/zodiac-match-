import { ZodiacSignInfo, MatchAnalysis, RealLifeScenario } from '../types/zodiac';
import { ZODIAC_SIGNS } from './zodiacSigns';

export function calculateCompatibility(sign1: ZodiacSignInfo, sign2: ZodiacSignInfo): MatchAnalysis {
  const index1 = ZODIAC_SIGNS.findIndex((s) => s.id === sign1.id);
  const index2 = ZODIAC_SIGNS.findIndex((s) => s.id === sign2.id);

  const rawDiff = Math.abs(index1 - index2);
  const signDistance = Math.min(rawDiff, 12 - rawDiff);

  let aspectType: MatchAnalysis['aspectType'] = 'trine';
  let aspectName = 'Trin (Trine - 120°)';
  let aspectVibe = 'Aliran Harmoni Alami';

  // Base scores by geometric aspect
  let baseOverall = 75;
  let baseLove = 75;
  let baseFriendship = 80;
  let baseFamily = 75;
  let baseCommunication = 75;
  let baseChemistry = 75;

  if (signDistance === 0) {
    aspectType = 'conjunction';
    aspectName = 'Konjungsi (Conjunction - 0°)';
    aspectVibe = 'Cermin Jiwa & Kesamaan Alami';
    baseOverall = 86;
    baseLove = 84;
    baseFriendship = 92;
    baseFamily = 82;
    baseCommunication = 88;
    baseChemistry = 85;
  } else if (signDistance === 1) {
    aspectType = 'quincunx';
    aspectName = 'Semisekstil (30°)';
    aspectVibe = 'Evolusi & Pembelajaran Saling Mengisi';
    baseOverall = 72;
    baseLove = 73;
    baseFriendship = 76;
    baseFamily = 74;
    baseCommunication = 70;
    baseChemistry = 77;
  } else if (signDistance === 2) {
    aspectType = 'sextile';
    aspectName = 'Sekstil (Sextile - 60°)';
    aspectVibe = 'Sahabat Karib & Dukungan Positif';
    baseOverall = 89;
    baseLove = 88;
    baseFriendship = 95;
    baseFamily = 86;
    baseCommunication = 92;
    baseChemistry = 85;
  } else if (signDistance === 3) {
    aspectType = 'square';
    aspectName = 'Kuadrat (Square - 90°)';
    aspectVibe = 'Gesekan Dinamis & Ketertarikan Magnetik';
    baseOverall = 69;
    baseLove = 76;
    baseFriendship = 70;
    baseFamily = 68;
    baseCommunication = 66;
    baseChemistry = 88;
  } else if (signDistance === 4) {
    aspectType = 'trine';
    aspectName = 'Trin (Trine - 120°)';
    aspectVibe = 'Koneksi Jiwa Se-Elemen';
    baseOverall = 94;
    baseLove = 93;
    baseFriendship = 94;
    baseFamily = 91;
    baseCommunication = 92;
    baseChemistry = 90;
  } else if (signDistance === 5) {
    aspectType = 'quincunx';
    aspectName = 'Quincunx (Inconjunct - 150°)';
    aspectVibe = 'Teka-Teki Menarik & Penyesuaian Dewasa';
    baseOverall = 70;
    baseLove = 72;
    baseFriendship = 72;
    baseFamily = 73;
    baseCommunication = 68;
    baseChemistry = 79;
  } else if (signDistance === 6) {
    aspectType = 'opposition';
    aspectName = 'Oposisi (Opposition - 180°)';
    aspectVibe = 'Polaritas Yin & Yang yang Saling Menggenapi';
    baseOverall = 87;
    baseLove = 90;
    baseFriendship = 85;
    baseFamily = 84;
    baseCommunication = 82;
    baseChemistry = 95;
  }

  // Modulate based on elements
  const e1 = sign1.element;
  const e2 = sign2.element;

  let elementSynergy = '';
  if (e1 === e2) {
    elementSynergy = `Harmoni Elemen Sejenis (${sign1.elementNameId} & ${sign2.elementNameId})`;
    baseOverall = Math.min(98, baseOverall + 6);
    baseCommunication = Math.min(98, baseCommunication + 6);
  } else if (
    (e1 === 'fire' && e2 === 'air') ||
    (e1 === 'air' && e2 === 'fire')
  ) {
    elementSynergy = 'Simbiosis Api & Udara: Inspiratif, Kreatif & Bersemangat';
    baseChemistry = Math.min(98, baseChemistry + 7);
    baseCommunication = Math.min(98, baseCommunication + 6);
    baseOverall = Math.min(96, baseOverall + 4);
  } else if (
    (e1 === 'earth' && e2 === 'water') ||
    (e1 === 'water' && e2 === 'earth')
  ) {
    elementSynergy = 'Simbiosis Tanah & Air: Subur, Mengayomi & Penuh Rasa Aman';
    baseFamily = Math.min(98, baseFamily + 8);
    baseLove = Math.min(98, baseLove + 6);
    baseOverall = Math.min(97, baseOverall + 5);
  } else if (
    (e1 === 'fire' && e2 === 'water') ||
    (e1 === 'water' && e2 === 'fire')
  ) {
    elementSynergy = 'Dinamika Api & Air: Gairah Panas vs Kedalaman Batin';
    baseChemistry = Math.min(96, baseChemistry + 8);
    baseCommunication = Math.max(58, baseCommunication - 6);
  } else if (
    (e1 === 'earth' && e2 === 'air') ||
    (e1 === 'air' && e2 === 'earth')
  ) {
    elementSynergy = 'Dinamika Tanah & Udara: Realisme Praktis Bertemu Visi Konseptual';
    baseCommunication = Math.max(60, baseCommunication - 3);
    baseFamily = Math.min(92, baseFamily + 4);
  } else if (
    (e1 === 'fire' && e2 === 'earth') ||
    (e1 === 'earth' && e2 === 'fire')
  ) {
    elementSynergy = 'Dinamika Api & Tanah: Kecepatan Inisiatif Bertemu Pondasi Kokoh';
    baseFamily = Math.min(94, baseFamily + 5);
    baseChemistry = Math.min(92, baseChemistry + 3);
  }

  // Ensure deterministic polish within reasonable limits
  const scores = {
    overall: Math.min(98, Math.max(55, baseOverall)),
    love: Math.min(99, Math.max(55, baseLove)),
    friendship: Math.min(99, Math.max(55, baseFriendship)),
    family: Math.min(98, Math.max(55, baseFamily)),
    communication: Math.min(98, Math.max(52, baseCommunication)),
    chemistry: Math.min(99, Math.max(58, baseChemistry)),
  };

  // Generate pair dynamic title & content
  const title = getPairTitle(sign1, sign2, aspectType);
  const overviewSummary = getOverviewSummary(sign1, sign2, aspectType, scores.overall);
  const loveInsight = getLoveInsight(sign1, sign2, aspectType);
  const friendshipInsight = getFriendshipInsight(sign1, sign2);
  const familyInsight = getFamilyInsight(sign1, sign2);
  const conflictInsight = getConflictInsight(sign1, sign2);
  const scenarios = getScenarios(sign1, sign2);
  const { adviceSign1, adviceSign2 } = getIndividualAdvice(sign1, sign2);
  const affirmation = getAffirmation(sign1, sign2);

  return {
    sign1,
    sign2,
    scores,
    aspectType,
    aspectName,
    aspectVibe,
    title,
    elementSynergy,
    overviewSummary,
    loveInsight,
    friendshipInsight,
    familyInsight,
    conflictInsight,
    scenarios,
    adviceSign1,
    adviceSign2,
    affirmation,
  };
}

function getPairTitle(s1: ZodiacSignInfo, s2: ZodiacSignInfo, aspect: string): string {
  if (s1.id === s2.id) {
    return `Kaca Kembar ${s1.name}: Resonansi Jiwa yang Identik`;
  }
  if (aspect === 'opposition') {
    return `Dua Kutub Magnetik: Tarikan Kuat yang Saling Melengkapi`;
  }
  if (aspect === 'trine') {
    return `Aliran Selaras: Harmoni Kosmik Tanpa Hambatan`;
  }
  if (aspect === 'sextile') {
    return `Kemitraan Hangat: Sahabat Terbaik Sekaligus Pelindung`;
  }
  if (aspect === 'square') {
    return `Sparks of Fire: Daya Tarik Menantang Penuh Gairah`;
  }
  return `Pertemuan Dua Dunia: Pelajaran Berharga Saling Meluaskan Cakrawala`;
}

function getOverviewSummary(s1: ZodiacSignInfo, s2: ZodiacSignInfo, aspect: string, score: number): string {
  if (s1.id === s2.id) {
    return `Ketika dua individu berzodiak ${s1.name} bersatu, mereka seperti bercermin pada satu sama lain. Pemahaman intuitif terhadap kebiasaan, ritme emosi, dan cara berpikir terjadi secara spontan. Tantangan utamanya adalah ketika kedua sifat keras kepala atau kelemahan bawaan muncul secara bersamaan, sehingga butuh satu pihak yang secara sadar mengalah demi menjaga keharmonisan.`;
  }

  if (s1.element === s2.element) {
    return `Hubungan antara ${s1.name} dan ${s2.name} diberkahi oleh ikatan elemen ${s1.elementNameId} yang serupa. Keduanya berbicara dalam 'frekuensi batin' yang sama: ritme hidup, cara merespon stres, dan kebutuhan dasar mereka berjalan seirama. Komunikasi terasa mengalir alami tanpa perlu banyak penerjemahan emosional.`;
  }

  if (
    (s1.element === 'fire' && s2.element === 'air') ||
    (s1.element === 'air' && s2.element === 'fire')
  ) {
    return `Kombinasi ${s1.name} dan ${s2.name} adalah paduan klasik Api dan Udara. Udara menghembuskan ide-ide segar dan perspektif baru, sementara Api memberikan keberanian, gairah, dan energi eksekusi. Bersama-sama, mereka tidak pernah kehabisan topik obrolan dan selalu memicu rasa percaya diri satu sama lain.`;
  }

  if (
    (s1.element === 'earth' && s2.element === 'water') ||
    (s1.element === 'water' && s2.element === 'earth')
  ) {
    return `Pasangan ${s1.name} dan ${s2.name} mencerminkan perpaduan Tanah dan Air yang sangat menyuburkan. Tanah memberikan stabilitas, perlindungan, dan ketenangan yang dibutuhkan oleh Air, sedangkan Air menyiram kelembutan, kasih sayang, dan kepekaan intuisi ke dalam dunia Tanah yang praktis.`;
  }

  return `Hubungan antara ${s1.name} (${s1.elementNameId}) dan ${s2.name} (${s2.elementNameId}) mempertemukan dua gaya hidup yang berbeda namun memikat. Di balik perbedaan sudut pandang, terdapat peluang pertumbuhan pribadi yang sangat besar ketika keduanya memilih untuk saling mendengarkan ketimbang memaksakan kebenaran masing-masing.`;
}

function getLoveInsight(s1: ZodiacSignInfo, s2: ZodiacSignInfo, aspect: string) {
  const isTrineOrSextile = aspect === 'trine' || aspect === 'sextile';
  return {
    description: isTrineOrSextile
      ? `Dalam ranah asmara, ${s1.name} dan ${s2.name} merasakan kenyamanan emosional yang tinggi sejak awal perkenalan. Ketertarikan berkembang secara organik karena ada rasa saling menghargai privasi dan cara mencintai satu sama lain.`
      : `Dalam percintaan, tarikan magnetis antara ${s1.name} dan ${s2.name} seringkali dipicu oleh rasa penasaran terhadap misteri atau kepribadian yang berbeda. Hubungan ini penuh dinamika seru dan tidak pernah membosankan.`,
    chemistrySpark: `${s1.name} terpikat oleh ${s2.strengths[0].toLowerCase()}, sedangkan ${s2.name} sangat mengagumi cara ${s1.name} yang ${s1.strengths[0].toLowerCase()}.`,
    greenFlags: [
      `Keduanya saling memberi ruang untuk menjadi diri sendiri tanpa kepura-puraan`,
      `Saling mendukung impian dan ambisi pribadi masing-masing`,
      `Apresiasi tulus terhadap kontribusi kecil pasangan dalam keseharian`,
    ],
    redFlags: [
      `Memendam uneg-uneg terlalu lama hingga meledak menjadi perdebatan besar`,
      `Mencoba mengubah watak dasar pasangan agar sesuai dengan ekspektasi pribadi`,
      `Salah menafsirkan waktu sendiri (me-time) sebagai tanda berkurangnya rasa cinta`,
    ],
    dateNightIdea: `Makan malam santai di tempat beratap terbuka (rooftop) dengan pemandangan lampu kota atau langit malam, dilanjutkan obrolan intim membicarakan rencana masa depan.`,
  };
}

function getFriendshipInsight(s1: ZodiacSignInfo, s2: ZodiacSignInfo) {
  return {
    description: `Sebagai teman, ${s1.name} dan ${s2.name} memiliki chemistry yang kuat untuk menjadi rekan bertukar cerita. Mereka bisa saling menyeimbangkan energi saat salah satu sedang terjatuh atau butuh dorongan semangat.`,
    activityIdea: `Jalan-jalan menjelajahi tempat baru, mencoba kuliner unik yang belum pernah dicoba, atau menghadiri konser/festival kreatif bersama.`,
    strengths: [
      `Selalu ada saat situasi darurat tanpa banyak tanya`,
      `Mampu tertawa bersama menertawakan hal konyol kehidupan`,
      `Tidak saling bersaing, melainkan saling merayakan pencapaian`,
    ],
  };
}

function getFamilyInsight(s1: ZodiacSignInfo, s2: ZodiacSignInfo) {
  return {
    description: `Dalam ranah keluarga, rumah tangga, atau kerja sama profesional, pasangan ${s1.name} & ${s2.name} membentuk tim yang fungsional apabila pembagian peran dilakukan secara jelas sejak awal.`,
    householdDynamic: `${s1.name} cenderung fokus pada ${s1.element === 'fire' || s1.element === 'air' ? 'energi inisiatif dan menjaga atmosfer rumah tetap ceria' : 'manajemen keteraturan dan keamanan finansial'}, sementara ${s2.name} mengisi ruang dengan ${s2.element === 'water' || s2.element === 'earth' ? 'kehangatan pengayoman dan kepekaan kebutuhan bersama' : 'solusi cepat dan ide-ide kreatif'}.`,
    workCollaboration: `Dalam pekerjaan, jika ${s1.name} dan ${s2.name} berkolaborasi, mereka dapat menghasilkan karya luar biasa asalkan tidak saling berebut panggung dan saling mengakui keahlian spesifik masing-masing.`,
  };
}

function getConflictInsight(s1: ZodiacSignInfo, s2: ZodiacSignInfo) {
  return {
    triggerPoints: [
      `Perbedaan tempo: ${s1.name} (${s1.modalityNameId.split(' ')[0]}) dan ${s2.name} (${s2.modalityNameId.split(' ')[0]}) memiliki kecepatan yang berbeda dalam memproses masalah`,
      `Gaya komunikasi: Terlalu blak-blakan vs terlalu sensitif / memendam perasaan`,
      `Pengambilan keputusan saat berada di bawah tekanan stres tinggi`,
    ],
    goldenRecipe: `Beri jeda 15-30 menit saat tensi meninggi sebelum melanjutkan pembicaraan. Fokus pada kata 'aku merasa...' ketimbang 'kamu selalu...'. Ingat bahwa kalian berdua berada di tim yang sama melawan masalah, bukan melawan satu sama lain.`,
  };
}

function getScenarios(s1: ZodiacSignInfo, s2: ZodiacSignInfo): RealLifeScenario[] {
  return [
    {
      title: 'Saat Terjadi Perbedaan Pendapat / Bertengkar',
      situation: 'Ketika terjadi salah paham mengenai janji temu atau rencana penting.',
      dynamic: `${s1.name} bereaksi dengan gaya ${s1.elementNameId} (${s1.element === 'fire' ? 'langsung mengutarakan kekecewaan seketika' : s1.element === 'earth' ? 'menahan diri dan menuntut penjelasan masuk akal' : s1.element === 'air' ? 'menganalisis logika argumen' : 'merasakan sakit hati mendalam dan butuh penegasan rasa sayang'}), sementara ${s2.name} merespons dengan ${s2.elementNameId}.`,
      resolution: `Solusi terbaik adalah ${s1.name} menurunkan intonasi bicara dan ${s2.name} memberikan kepastian tanpa menghindar, sehingga kedua pihak merasa didengar secara adil.`,
    },
    {
      title: 'Liburan & Berpetualang Bersama',
      situation: 'Menyusun rencana perjalanan ke luar kota atau liburan akhir pekan.',
      dynamic: `${s1.name} biasanya menginginkan ${s1.element === 'fire' || s1.element === 'air' ? 'aktivitas seru yang spontan tanpa terlalu kaku' : 'itinerary yang jelas, hotel nyaman, dan transportasi aman'}. ${s2.name} melengkapi dengan ${s2.element === 'water' ? 'memilih spot-spot estetik dan kafe bernuansa hangat' : 'mencari info kuliner dan tiket promo terbaik'}.`,
      resolution: `Kombinasikan hari dengan jadwal terstruktur untuk tempat-tempat utama, namun sediakan setengah hari bebas untuk eksplorasi santai tanpa rencana ketat.`,
    },
    {
      title: 'Menentukan Mau Makan Apa Hari Ini',
      situation: 'Momen klasik ketika perut lapar tapi keduanya bingung menentukan menu.',
      dynamic: `${s1.name} sering melempar pilihan 'Terserah kamu', sementara ${s2.name} butuh waktu menimbang opsi rasa atau tempat yang nyaman.`,
      resolution: `Gunakan metode eliminasi 5-2-1: Pihak pertama memberikan 5 opsi restoran, pihak kedua memilih 2 teratas, dan pihak pertama menentukan pilihan akhir dalam hitungan detik. Cepat dan bebas debat!`,
    },
    {
      title: 'Kebiasaan Finansial & Pengeluaran',
      situation: 'Mengatur tabungan bersama atau memutuskan pembelian barang bernilai besar.',
      dynamic: `${s1.element === 'earth' ? s1.name + ' adalah benteng penghematan yang mengutamakan investasi jangka panjang' : s1.name + ' menyukai kenyamanan dan pengalaman hidup bermakna'}. Keseimbangan tercapai ketika ${s2.name} ikut memberikan masukan proporsional.`,
      resolution: `Buat pos keuangan terpisah untuk kebutuhan pokok, tabungan masa depan, dan 'dana senang-senang' berdua yang boleh dihabiskan tanpa rasa bersalah.`,
    },
  ];
}

function getIndividualAdvice(s1: ZodiacSignInfo, s2: ZodiacSignInfo) {
  return {
    adviceSign1: `Untuk ${s1.name}: Pahami bahwa ${s2.name} memiliki kepekaan khas ${s2.elementNameId}. Jangan terburu-buru menuntut reaksi cepat; berikan kehangatan dan apresiasi atas cara ${s2.name} menunjukkan perhatian.`,
    adviceSign2: `Untuk ${s2.name}: Ingat bahwa ${s1.name} mengalir dengan energi ${s1.elementNameId}. Kejujuran lugasnya bukan bertujuan melukaimu, melainkan cara alaminya untuk mencari solusi bersama secara transparan.`,
  };
}

function getAffirmation(s1: ZodiacSignInfo, s2: ZodiacSignInfo): string {
  return `Kami merayakan keunikan masing-masing. Perbedaan antara ${s1.name} dan ${s2.name} bukan dinding pemisah, melainkan jembatan yang memperkaya pemahaman jiwa kami.`;
}
