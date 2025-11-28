import { CalculationResult, StatsData } from '../types';

const HISTORY_KEY = 'mestre_dinho_history_v1';
const FAVORITES_KEY = 'mestre_dinho_favorites_v1';
const MAX_HISTORY = 100;

export const getHistory = (): CalculationResult[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveToHistory = (result: CalculationResult) => {
  const current = getHistory();
  // Add to top, slice to max
  const updated = [result, ...current].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const getFavorites = (): CalculationResult[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (result: CalculationResult): CalculationResult[] => {
  const current = getFavorites();
  const exists = current.find(i => i.id === result.id);
  
  let updated;
  if (exists) {
    updated = current.filter(i => i.id !== result.id);
  } else {
    updated = [{ ...result, isFavorite: true }, ...current];
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
};

export const getStats = (): StatsData => {
  const history = getHistory();
  
  // Last Digit Frequency
  const lastDigitCounts = Array(10).fill(0);
  const thousandsCounts: Record<string, number> = {};

  const processMilhar = (m: string) => {
    const lastDigit = parseInt(m.slice(-1));
    if (!isNaN(lastDigit)) lastDigitCounts[lastDigit]++;
    
    thousandsCounts[m] = (thousandsCounts[m] || 0) + 1;
  };

  history.forEach(item => {
    processMilhar(item.milhar1);
    processMilhar(item.milhar2);
    processMilhar(item.milhar3);
    processMilhar(item.milhar4);
  });

  const lastDigitFrequency = lastDigitCounts.map((val, idx) => ({
    name: idx.toString(),
    value: val
  }));

  // Top 5 thousands
  const mostFrequentThousands = Object.entries(thousandsCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  return {
    totalCalculations: history.length,
    lastDigitFrequency,
    mostFrequentThousands
  };
};