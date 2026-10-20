import React from 'react';
import { Home, Plus, PlusCircle, Calculator, Shield, MapPin, Bug } from 'lucide-react';
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
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto flex max-w-xl items-stretch justify-between rounded-2xl border border-line bg-surface px-1.5 py-1.5 shadow-dock">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          const isSpecial = item.screen === 'NEW_AUDIT';

          if (isSpecial) {
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className="group flex flex-1 flex-col items-center justify-end rounded-xl py-1"
                title="Nuevo Aseguramiento MIPE"
              >
                <span className="-mt-8 flex h-12 w-12 items-center justify-center rounded-full border-4 border-surface bg-forest-700 text-white shadow-fab transition group-hover:bg-forest-800 group-active:scale-95">
                  <Plus className="h-5 w-5 stroke-[2.5]" />
                </span>
                <span className="mt-1 text-[11px] font-semibold leading-none text-forest-800">
                  Asegurar
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 transition-colors ${
                isActive ? 'text-forest-800' : 'text-ink-muted hover:text-ink'
              }`}
            >
              <span
                className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-forest-100' : 'group-hover:bg-surface-sunken'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span
                className={`text-[11px] leading-none tracking-tight ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
