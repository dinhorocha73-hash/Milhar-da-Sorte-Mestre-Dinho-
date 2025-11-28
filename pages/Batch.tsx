import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { batchCalculate } from '../services/calculatorService';
import { CalculationResult } from '../types';

const Batch: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleRunBatch = () => {
    if (!inputText) return;
    const inputs = inputText.split(/[\n, ]+/).filter(s => s.length === 4);
    if (inputs.length === 0) {
        alert("Insira números de 4 dígitos");
        return;
    }
    const res = batchCalculate(inputs);
    setResults(res);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="px-1">
        <h2 className="text-xl font-bold text-white">Modo Em Lote</h2>
        <p className="text-xs text-emerald-400 mt-1">Gere palpites para múltiplos números de uma vez.</p>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <textarea
          className="w-full h-32 bg-lucky-800 border-2 border-lucky-700 focus:border-gold-500 rounded-xl p-4 text-white font-mono placeholder-emerald-700/50 outline-none resize-none"
          placeholder="Digite os números de 4 dígitos separados por espaço ou nova linha...&#10;Exemplo:&#10;2034&#10;5921&#10;1102"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <button
          onClick={handleRunBatch}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Play size={18} fill="currentColor" />
          <span>Gerar Tabela</span>
        </button>

        {/* Results Table */}
        {results.length > 0 && (
          <div className="flex-1 overflow-auto rounded-xl border border-lucky-700 bg-lucky-800/50 mt-4">
            <table className="w-full text-left text-sm text-emerald-100">
              <thead className="bg-lucky-900 text-emerald-400 uppercase text-xs font-semibold sticky top-0">
                <tr>
                  <th className="px-4 py-3">Base</th>
                  <th className="px-4 py-3">M 1</th>
                  <th className="px-4 py-3">M 2</th>
                  <th className="px-4 py-3">M 3</th>
                  <th className="px-4 py-3">M 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lucky-700">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-lucky-700/50">
                    <td className="px-4 py-2 font-bold text-gold-400">{r.base}</td>
                    <td className="px-4 py-2 font-mono">{r.milhar1}</td>
                    <td className="px-4 py-2 font-mono">{r.milhar2}</td>
                    <td className="px-4 py-2 font-mono">{r.milhar3}</td>
                    <td className="px-4 py-2 font-mono">{r.milhar4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;