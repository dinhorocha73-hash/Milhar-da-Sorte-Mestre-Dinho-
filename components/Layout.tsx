import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calculator, History, Star, BarChart3, Settings, Layers } from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Calculator, label: 'Home', route: AppRoute.HOME },
    { icon: Layers, label: 'Batch', route: AppRoute.BATCH },
    { icon: History, label: 'Hist.', route: AppRoute.HISTORY },
    { icon: Star, label: 'Favoritos', route: AppRoute.FAVORITES },
    { icon: BarChart3, label: 'Stats', route: AppRoute.STATS },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-lucky-900 border-x border-lucky-800 shadow-2xl relative">
      {/* Header */}
      <header className="bg-lucky-900/90 backdrop-blur-md sticky top-0 z-50 px-4 py-3 border-b border-lucky-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-lucky-900 font-bold text-lg">
            M
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Mestre Dinho
          </h1>
        </div>
        <button 
          onClick={() => navigate(AppRoute.SETTINGS)}
          className="p-2 text-emerald-400 hover:text-white transition-colors"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-lucky-900 border-t border-lucky-800 pb-safe pt-2 px-2">
        <div className="flex justify-around items-end pb-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route;
            const Icon = item.icon;
            
            return (
              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${
                  isActive 
                    ? 'text-gold-400 -translate-y-2' 
                    : 'text-emerald-500/70 hover:text-emerald-400'
                }`}
              >
                <div className={`p-2 rounded-full mb-1 transition-all ${
                  isActive ? 'bg-lucky-800 shadow-lg shadow-gold-500/10' : ''
                }`}>
                  <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;