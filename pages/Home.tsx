import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { calculateMilhares } from '../services/calculatorService';
import { saveToHistory, getHistory, toggleFavorite, getFavorites } from '../services/storageService';
import { CalculationResult } from '../types';
import ResultCard from '../components/ResultCard';
import CruzDoDia from '../components/CruzDoDia';

const Home: React.FC = () => {
  const [inputBase, setInputBase] = useState('');
  const [currentResult, setCurrentResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<CalculationResult[]>([]);
  const [recentHistory, setRecentHistory] = useState<CalculationResult[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecentHistory(getHistory().slice(0, 3));
  }, []);

  const handleCalculate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputBase.length !== 4) return;

    setLoading(true);
    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      try {
        const result = calculateMilhares(inputBase);
        saveToHistory(result);
        setCurrentResult(result);
        setRecentHistory(getHistory().slice(0, 3));
        setInputBase(''); // Clear input or keep it? Keep it for correction usually, but clear for next.
        // Let's keep it empty to encourage next input
      } catch (err) {
        alert("Erro ao calcular. Verifique o número.");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleFavorite = (res: CalculationResult) => {
    const newFavs = toggleFavorite(res);
    setFavorites(newFavs);
    // Also update current result state if it matches to show star immediately
    if (currentResult && currentResult.id === res.id) {
        setCurrentResult({ ...currentResult, isFavorite: !currentResult.isFavorite });
    }
  };

  const isFav = (id: string) => favorites.some(f => f.id === id);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-white">
          Gere sua sorte
        </h2>
        <p className="text-emerald-400/80 text-sm mt-1">
          Algoritmo exclusivo Mestre Dinho
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-lucky-800 rounded-2xl p-6 shadow-xl border border-lucky-700/50">
        <form onSubmit={handleCalculate} className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type="tel" // better for mobile numeric keyboard
              value={inputBase}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setInputBase(val);
              }}
              placeholder="0000"
              className="w-full bg-lucky-900 border-2 border-lucky-700 focus:border-gold-500 rounded-xl px-4 py-4 text-center text-4xl font-bold tracking-[0.5em] text-white placeholder-emerald-800/30 outline-none transition-all"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                {inputBase.length === 4 && <span className="text-gold-500 animate-pulse">✨</span>}
            </div>
          </div>
          
          <button
            disabled={inputBase.length < 4 || loading}
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all transform active:scale-95 ${
              inputBase.length === 4 
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-lucky-900 shadow-lg shadow-gold-500/20 hover:brightness-110' 
                : 'bg-lucky-700 text-lucky-900/50 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Calculando...</span>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Revelar Milhares</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Current Result */}
      {currentResult && (
        <div className="mt-8">
           <div className="flex items-center justify-between mb-2 px-2">
             <h3 className="text-white font-semibold">Resultado Atual</h3>
             <button onClick={() => setCurrentResult(null)} className="text-xs text-emerald-500">Limpar</button>
           </div>
           <ResultCard 
             result={currentResult} 
             isFavorite={isFav(currentResult.id)}
             onToggleFavorite={handleFavorite}
           />
        </div>
      )}

      {/* Recent History Teaser */}
      {!currentResult && recentHistory.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2 px-2">
             <h3 className="text-emerald-400 font-medium text-sm uppercase tracking-wider">Recentes</h3>
          </div>
          <div className="space-y-3 opacity-80">
            {recentHistory.map((res, idx) => (
              <div key={res.id} onClick={() => setCurrentResult(res)} className="bg-lucky-800/50 p-3 rounded-lg flex justify-between items-center border border-lucky-700/30 active:bg-lucky-700 transition-colors">
                <span className="font-mono font-bold text-gold-400">{res.base}</span>
                <div className="flex space-x-2 text-xs font-mono text-emerald-300">
                  <span>{res.milhar1}</span>
                  <span>{res.milhar2}</span>
                  <span>...</span>
                </div>
                <ArrowRight size={14} className="text-emerald-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cruz do Dia Section */}
      <CruzDoDia />
    </div>
  );
};

export default Home;