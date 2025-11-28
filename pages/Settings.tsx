import React from 'react';
import { Shield, Smartphone, Zap } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="px-1">
        <h2 className="text-xl font-bold text-white">Configurações</h2>
      </div>

      {/* Premium Banner */}
      <div className="bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl p-6 text-lucky-900 shadow-lg">
        <div className="flex items-start space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
                <Zap size={24} className="text-white" fill="currentColor" />
            </div>
            <div>
                <h3 className="font-bold text-lg">Seja Premium</h3>
                <p className="text-sm font-medium opacity-80 mt-1">Desbloqueie estatísticas preditivas e modo batch ilimitado.</p>
                <button className="mt-4 bg-lucky-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg active:scale-95 transition-transform">
                    Assinar R$ 4,99/mês
                </button>
            </div>
        </div>
      </div>

      <div className="space-y-2">
          <div className="p-4 bg-lucky-800 rounded-xl flex items-center space-x-4 border border-lucky-700">
              <Shield className="text-emerald-400" />
              <div>
                  <h4 className="text-white font-medium">Privacidade Total</h4>
                  <p className="text-xs text-emerald-500">Seus cálculos ficam apenas neste dispositivo.</p>
              </div>
          </div>
          <div className="p-4 bg-lucky-800 rounded-xl flex items-center space-x-4 border border-lucky-700">
              <Smartphone className="text-emerald-400" />
              <div>
                  <h4 className="text-white font-medium">Modo Offline</h4>
                  <p className="text-xs text-emerald-500">Funciona sem internet.</p>
              </div>
          </div>
      </div>

      <div className="text-center pt-8 pb-4">
          <p className="text-xs text-emerald-600 uppercase tracking-widest font-bold mb-2">Disclaimer Legal</p>
          <p className="text-[10px] text-emerald-600/70 leading-relaxed px-4">
              Este aplicativo é apenas para fins de entretenimento e estratégia matemática. 
              Não garantimos ganhos financeiros. Jogos de azar podem causar dependência. 
              Proibido para menores de 18 anos.
          </p>
          <p className="text-[10px] text-emerald-700 mt-4">v1.0.0 • Mestre Dinho Build</p>
      </div>
    </div>
  );
};

export default Settings;