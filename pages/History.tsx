import React, { useState, useEffect } from 'react';
import { Trash2, Search, Download } from 'lucide-react';
import { getHistory, clearHistory, toggleFavorite, getFavorites } from '../services/storageService';
import { CalculationResult } from '../types';
import ResultCard from '../components/ResultCard';

const History: React.FC = () => {
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [favorites, setFavorites] = useState<CalculationResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setHistory(getHistory());
    setFavorites(getFavorites());
  }, []);

  const handleClear = () => {
    if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleFavorite = (res: CalculationResult) => {
    const newFavs = toggleFavorite(res);
    setFavorites(newFavs);
  };

  const isFav = (id: string) => favorites.some(f => f.id === id);

  const filteredHistory = history.filter(item => 
    item.base.includes(searchTerm) || 
    item.milhar1.includes(searchTerm) ||
    item.milhar2.includes(searchTerm)
  );

  const exportCSV = () => {
    const headers = "Data,Base,Milhar1,Milhar2,Milhar3,Milhar4\n";
    const rows = history.map(h => 
      `${new Date(h.timestamp).toISOString()},${h.base},${h.milhar1},${h.milhar2},${h.milhar3},${h.milhar4}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_mestre_dinho_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-white">Histórico</h2>
        <div className="flex space-x-2">
             <button onClick={exportCSV} className="p-2 text-emerald-400 hover:bg-lucky-800 rounded-lg">
                <Download size={20} />
            </button>
            <button onClick={handleClear} className="p-2 text-red-400 hover:bg-lucky-800 rounded-lg">
                <Trash2 size={20} />
            </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Buscar número..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-lucky-800 border border-lucky-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-emerald-600 focus:border-gold-500 outline-none"
        />
        <Search className="absolute left-3 top-3.5 text-emerald-600" size={18} />
      </div>

      <div className="space-y-4 mt-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-emerald-500/50">
            <p>Nenhum cálculo encontrado.</p>
          </div>
        ) : (
          filteredHistory.map((item, idx) => (
            <ResultCard 
              key={item.id} 
              result={item} 
              isFavorite={isFav(item.id)}
              onToggleFavorite={handleFavorite}
              delay={idx > 5 ? 0 : idx}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default History;