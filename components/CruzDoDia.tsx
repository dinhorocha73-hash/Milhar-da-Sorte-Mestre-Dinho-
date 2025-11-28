import React, { useEffect, useState } from 'react';
import { calculateCruzDoDia } from '../services/calculatorService';
import { Copy } from 'lucide-react';

const CruzDoDia: React.FC = () => {
  const [data, setData] = useState<ReturnType<typeof calculateCruzDoDia> | null>(null);

  useEffect(() => {
    setData(calculateCruzDoDia());
  }, []);

  const copySuggestion = (num: string) => {
    navigator.clipboard.writeText(num);
    // Feedback visual poderia ser adicionado aqui, mas manteremos simples
  };

  if (!data) return null;

  return (
    <div className="bg-lucky-800 rounded-2xl p-5 border border-lucky-700 shadow-xl mt-8 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            ✝️ Cruz do Dia
          </h3>
          <p className="text-xs text-emerald-500">Baseada no dia {new Date().getDate()}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Visual da Cruz */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 bg-lucky-900 rounded-full border border-gold-500/30 flex items-center justify-center shadow-inner">
               <span className="text-emerald-700 text-xs">Dia</span>
             </div>
          </div>
          
          {/* Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <span className="text-lucky-900 font-bold text-xl font-mono">{data.top}</span>
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <span className="text-lucky-900 font-bold text-xl font-mono">{data.right}</span>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <span className="text-lucky-900 font-bold text-xl font-mono">{data.bottom}</span>
          </div>

          {/* Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <span className="text-lucky-900 font-bold text-xl font-mono">{data.left}</span>
          </div>
        </div>

        {/* Sugestões geradas */}
        <div className="flex-1 w-full">
            <p className="text-xs text-emerald-400 uppercase font-semibold mb-2 text-center md:text-left">Palpites da Cruz</p>
            <div className="grid grid-cols-2 gap-2">
                {data.suggestions.map((num, idx) => (
                    <button 
                        key={idx}
                        onClick={() => copySuggestion(num)}
                        className="bg-lucky-900/50 border border-lucky-600 hover:border-gold-500/50 p-2 rounded-lg flex items-center justify-between group transition-all active:scale-95"
                    >
                        <span className="font-mono text-white font-bold tracking-widest">{num}</span>
                        <Copy size={12} className="text-emerald-600 group-hover:text-gold-400" />
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CruzDoDia;