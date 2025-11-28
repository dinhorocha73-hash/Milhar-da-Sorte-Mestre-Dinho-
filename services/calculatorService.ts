import { CalculationResult } from '../types';

// Helper to pad number to 4 digits
const pad = (num: number): string => {
  return num.toString().padStart(4, '0');
};

export const calculateMilhares = (baseInput: string): CalculationResult => {
  // Ensure input is sanitized
  const baseNum = parseInt(baseInput.replace(/\D/g, ''), 10);
  
  if (isNaN(baseNum)) {
    throw new Error("Número inválido");
  }

  // Formula 1: base * 11 % 10000
  const m1 = (baseNum * 11) % 10000;

  // Formula 2: base * 21 % 10000
  const m2 = (baseNum * 21) % 10000;

  // Formula 3: Math.floor(base / 25) % 10000
  const m3 = Math.floor(baseNum / 25) % 10000;

  // Formula 4: (base + 2025) % 10000
  const m4 = (baseNum + 2025) % 10000;

  return {
    id: crypto.randomUUID(),
    base: pad(baseNum),
    milhar1: pad(m1),
    milhar2: pad(m2),
    milhar3: pad(m3),
    milhar4: pad(m4),
    timestamp: Date.now(),
    isFavorite: false,
  };
};

export const batchCalculate = (inputs: string[]): CalculationResult[] => {
  const results: CalculationResult[] = [];
  inputs.forEach(input => {
    try {
      if (input.trim().length > 0) {
        results.push(calculateMilhares(input));
      }
    } catch (e) {
      console.error(`Erro ao calcular para ${input}`);
    }
  });
  return results;
};

export const calculateCruzDoDia = () => {
  const today = new Date().getDate();
  // Regra clássica: Dia + 3
  const base = today + 3;

  // Se base for menor que 10, pad com 0 (ex: 8 vira 08). 
  // Se for maior (ex: 28), usa 2 e 8.
  const d1 = base >= 10 ? Math.floor(base / 10) : 0; // Dezena
  const d2 = base % 10; // Unidade
  
  // Próximos números somando 3 à unidade anterior
  const d3 = (d2 + 3) % 10;
  const d4 = (d3 + 3) % 10;

  // Cruz:
  //    d1
  // d4    d2
  //    d3
  
  return {
    top: d1,
    right: d2,
    bottom: d3,
    left: d4,
    // Gera milhares combinando os números em sentido horário e anti-horário
    suggestions: [
      `${d1}${d2}${d3}${d4}`,
      `${d4}${d1}${d2}${d3}`,
      `${d1}${d4}${d3}${d2}`,
      `${d2}${d3}${d4}${d1}`
    ]
  };
};