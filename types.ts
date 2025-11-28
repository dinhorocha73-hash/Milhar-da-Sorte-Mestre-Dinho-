export interface CalculationResult {
  base: string;
  milhar1: string;
  milhar2: string;
  milhar3: string;
  milhar4: string;
  timestamp: number;
  id: string;
  isFavorite?: boolean;
}

export interface StatsData {
  totalCalculations: number;
  lastDigitFrequency: { name: string; value: number }[];
  mostFrequentThousands: { name: string; value: number }[];
}

export enum AppRoute {
  HOME = '/',
  HISTORY = '/history',
  FAVORITES = '/favorites',
  BATCH = '/batch',
  STATS = '/stats',
  SETTINGS = '/settings'
}

export interface NavigationItem {
  icon: any;
  label: string;
  route: AppRoute;
}