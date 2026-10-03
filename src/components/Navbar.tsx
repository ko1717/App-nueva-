import React from 'react';
import { Home, PlusCircle, Calculator, Shield, MapPin, Bug } from 'lucide-react';
import { AppScreen } from '../types';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const navItems: { screen: AppScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    { screen: 'DASHBOARD', label: 'Inicio', icon: Home },
    { screen: 'NEW_AUDIT', label: 'Asegurar', icon: PlusCircle },
    { screen: 'SPRAY_CALCULATOR', label: 'Calibrar', icon: Calculator },
    { screen: 'AVGUST_CATALOG', label: 'Avgust', icon: Shield },
    { screen: 'PEST_CATALOG', label: 'Plagas', icon: Bug },
    { screen: 'FARM_LOTS', label: 'Lotes', icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          const isSpecial = item.screen === 'NEW_AUDIT';

          if (isSpecial) {
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className="flex flex-col items-center justify-center -mt-5 focus:outline-none group"
                title="Nuevo Aseguramiento MIPE"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#004D20] to-[#007A33] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-105 group-active:scale-95 transition-all">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 mt-0.5">
                  Asegurar
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-emerald-700 font-bold bg-emerald-50/80'
                  : 'text-slate-600 hover:text-slate-800 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-600'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
