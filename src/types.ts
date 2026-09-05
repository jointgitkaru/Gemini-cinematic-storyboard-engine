export type TabType = 
  | 'pipeline' 
  | 'storyboard-5x3' 
  | 'scale-2x2' 
  | 'character-sheet' 
  | 'depth-3x3' 
  | 'styles' 
  | 'protocols-docs';

export type StyleRegisterKey = 'register-a' | 'register-b' | 'register-c';

export interface StyleRegister {
  id: StyleRegisterKey;
  name: string;
  subtitle: string;
  tag: string;
  aspectRatio: string;
  description: string;
  lockedContent: string;
  keyFeatures: string[];
}

export interface StoryboardPanel {
  panelNumber: number;
  timecode: string;
  caption: string;
  framing: string;
  visualNote: string;
}

export interface ScaleCalculatorState {
  subjectName: string;
  verifiedHeight: number | '';
  verifiedLength: number | '';
  verifiedWidth: number | '';
  verifiedDepth: number | '';
  additionalNotes: string;
  views: string[];
  unit: 'cm' | 'm' | 'in';
}

export interface CharacterSheetState {
  characterId: string;
  name: string;
  alias: string;
  role: string;
  species: string;
  ageRange: string;
  revision: string;
  referenceSource: string;
  signatureProps: string;
  primaryExpressions: string[];
  microExpressions: string[];
  postures: string[];
  handStudies: string[];
  palette: { label: string; hex: string }[];
  includeHands: boolean;
  voiceNotes: string;
  designNotes: string;
}

export interface DepthShot {
  number: number;
  position: string;
  title: string;
  framing: string;
  narrativeRole: string;
  actionDescription: string;
  depthRule: string;
}
