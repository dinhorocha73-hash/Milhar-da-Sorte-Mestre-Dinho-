import React, { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite } from '../services/storageService';
import { CalculationResult } from '../types';
import ResultCard from '../components/ResultCard';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<CalculationResult[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleFavorite = (res: CalculationResult) => {
    const newFavs = toggleFavorite(res);
    setFavorites(newFavs);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white px-1">Meus Favoritos</h2>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-lucky-800/30 rounded-2xl border border-dashed border-lucky-700">
          <p className="text-emerald-500 mb-2">Sem favoritos ainda.</p>
          <p className="text-xs text-emerald-600">Salve seus melhores palpites para ver aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {favorites.map((item, idx) => (
            <ResultCard 
              key={item.id} 
              result={item} 
              isFavorite={true}
              onToggleFavorite={handleFavorite}
              delay={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;