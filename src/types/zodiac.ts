export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';
export type ZodiacModality = 'cardinal' | 'fixed' | 'mutable';
export type ZodiacPolarity = 'masculine' | 'feminine';

export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  glyph: string;
  element: ZodiacElement;
  elementNameId: string;
  modality: ZodiacModality;
  modalityNameId: string;
  polarity: ZodiacPolarity;
  ruler: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
  friendshipStyle: string;
  communicationStyle: string;
  colorAccent: string;
  bgGlow: string;
}

export interface CompatibilityAspectScore {
  love: number;
  friendship: number;
  family: number;
  communication: number;
  chemistry: number;
  overall: number;
}

export interface RealLifeScenario {
  title: string;
  situation: string;
  dynamic: string;
  resolution: string;
}

export interface MatchAnalysis {
  sign1: ZodiacSignInfo;
  sign2: ZodiacSignInfo;
  scores: CompatibilityAspectScore;
  aspectType: 'conjunction' | 'sextile' | 'square' | 'trine' | 'quincunx' | 'opposition';
  aspectName: string;
  aspectVibe: string;
  title: string;
  elementSynergy: string;
  overviewSummary: string;
  loveInsight: {
    description: string;
    chemistrySpark: string;
    greenFlags: string[];
    redFlags: string[];
    dateNightIdea: string;
  };
  friendshipInsight: {
    description: string;
    activityIdea: string;
    strengths: string[];
  };
  familyInsight: {
    description: string;
    householdDynamic: string;
    workCollaboration: string;
  };
  conflictInsight: {
    triggerPoints: string[];
    goldenRecipe: string;
  };
  scenarios: RealLifeScenario[];
  adviceSign1: string;
  adviceSign2: string;
  affirmation: string;
}

export interface SavedMatch {
  id: string;
  sign1Id: string;
  sign2Id: string;
  note?: string;
  savedAt: number;
}
