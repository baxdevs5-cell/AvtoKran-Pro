export type Manufacturer = 'Liebherr' | 'Grove' | 'Tadano' | 'XCMG';

export interface Crane {
  id: string;
  name: string;
  manufacturer: Manufacturer;
  capacityTons: number;
  boomLengthMeters: number | string; // Verified or "Modelga qarab farq qiladi"
  jibLengthMeters?: string;
  axles: number;
  enginePower: string;
  weightTon: number | string;
  maxHookHeight?: string;
  applications: string[];
  description: string;
  image: string;
  fallbackGradient: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  idealFor: string;
  iconName: 'truck' | 'building' | 'wrench' | 'hammer' | 'shield-check';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CalculatorRates {
  baseHourlyRate: number; // in UZS (demo rate)
  shiftMultiplier: number;
  perKmRate: number;
  riggingStaffCost: number;
}

export interface ContactMessage {
  fullName: string;
  phone: string;
  serviceType: string;
  craneModel: string;
  details: string;
  submittedAt: string;
}
