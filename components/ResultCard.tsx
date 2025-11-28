import React, { useState } from 'react';
import { Copy, Star, Share2, Check } from 'lucide-react';
import { CalculationResult } from '../types';

interface ResultCardProps {
  result: CalculationResult;
  onToggleFavorite?: (result: CalculationResult) => void;
  isFavorite?: boolean;
  delay?: number; // Animation delay index
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onToggleFavorite, isFavorite, delay = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `🍀 Mestre Dinho: ${result.base} \n➡️ ${result.milhar1} | ${result.milhar2} | ${result.milhar3} | ${result.milhar4}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
     const text = `🍀 Palpite do Mestre Dinho 🍀\n\nBase: *${result.base}*\n\n🎯 ${result.milhar1}\n🎯 ${result.milhar2}\n🎯 ${result.milhar3}\n🎯 ${result.milhar4}\n\n#MilharDaSorte`;
     if (navigator.share) {
       try {
         await navigator.share({
           title: 'Milhar da Sorte',
           text: text,
         });
       } catch (err) {
         handleCopy();
       }
     } else {
       handleCopy();
     }
  };

  const thousands = [result.milhar1, result.milhar2, result.milhar3, result.milhar4];

  return (
    <div 
      className="bg-lucky-800 rounded-xl p-4 shadow-lg border border-lucky-700 relative overflow-hidden mb-4 animate-[fadeIn_0.5s_ease-out_forwards]"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      {/* Glow effect */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Base</span>
          <h3 className="text-2xl font-bold text-white font-mono tracking-widest">{result.base}</h3>
        </div>
        <div className="flex space-x-2">
          {onToggleFavorite && (
            <button 
              onClick={() => onToggleFavorite(result)}
              className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-gold-400 bg-gold-400/10' : 'text-emerald-400 hover:bg-lucky-700'}`}
            >
              <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          )}
          <button 
            onClick={handleShare}
            className="p-2 rounded-full text-emerald-400 hover:bg-lucky-700 transition-colors"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {thousands.map((milhar, idx) => (
          <div key={idx} className="bg-lucky-900/50 p-2 rounded-lg border border-lucky-600/50 text-center relative group">
             <span className="text-[10px] text-emerald-500/70 absolute top-1 left-2">#{idx + 1}</span>
             <span className="text-xl font-bold text-gold-400 font-mono tracking-widest">{milhar}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex justify-between items-center text-xs text-emerald-500/60">
        <span>{new Date(result.timestamp).toLocaleDateString()}</span>
        <span className="font-mono text-[10px] opacity-50">ID: {result.id.slice(0,6)}</span>
      </div>
    </div>
  );
};

export default ResultCard;