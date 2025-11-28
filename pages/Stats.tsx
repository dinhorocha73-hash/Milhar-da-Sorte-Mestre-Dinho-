import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getStats } from '../services/storageService';
import { StatsData } from '../types';

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="px-1">
        <h2 className="text-xl font-bold text-white">Estatísticas</h2>
        <p className="text-xs text-emerald-400">Baseado no seu histórico local.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-lucky-800 p-4 rounded-xl border border-lucky-700 text-center">
            <h3 className="text-emerald-400 text-xs uppercase font-bold">Total Cálculos</h3>
            <p className="text-3xl font-bold text-white mt-1">{stats.totalCalculations}</p>
        </div>
        <div className="bg-lucky-800 p-4 rounded-xl border border-lucky-700 text-center">
            <h3 className="text-emerald-400 text-xs uppercase font-bold">Mais Frequente</h3>
            <p className="text-lg font-bold text-gold-400 mt-2 truncate">
                {stats.mostFrequentThousands[0]?.name || '-'}
            </p>
        </div>
      </div>

      {/* Chart: Last Digit Frequency */}
      <div className="bg-lucky-800 p-4 rounded-xl border border-lucky-700">
        <h3 className="text-white font-semibold mb-4 text-sm">Frequência do Último Dígito</h3>
        <div className="h-48 w-full">
            {stats.totalCalculations > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.lastDigitFrequency}>
                        <XAxis 
                            dataKey="name" 
                            stroke="#059669" 
                            tick={{fill: '#34d399', fontSize: 10}}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip 
                            cursor={{fill: '#064e3b'}}
                            contentStyle={{ backgroundColor: '#022c22', borderColor: '#059669', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {stats.lastDigitFrequency.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value > 2 ? '#fbbf24' : '#059669'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-emerald-600 text-xs">
                    Dados insuficientes. Faça alguns cálculos!
                </div>
            )}
        </div>
      </div>

      {/* Top Thousands */}
      <div className="bg-lucky-800 p-4 rounded-xl border border-lucky-700">
          <h3 className="text-white font-semibold mb-4 text-sm">Top 5 Milhares Gerados</h3>
          <div className="space-y-3">
             {stats.mostFrequentThousands.length > 0 ? stats.mostFrequentThousands.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center text-sm">
                     <span className="font-mono text-gold-400 font-bold text-lg">{item.name}</span>
                     <div className="flex items-center space-x-2">
                        <div className="h-2 bg-lucky-900 rounded-full w-24 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${(item.value / stats.totalCalculations) * 100}%`}}></div>
                        </div>
                        <span className="text-emerald-500 w-4 text-right">{item.value}</span>
                     </div>
                 </div>
             )) : (
                <p className="text-xs text-emerald-600">Nenhum dado ainda.</p>
             )}
          </div>
      </div>
    </div>
  );
};

export default Stats;