import React, { useState, useEffect } from 'react';
import { AppScreen, MipeAuditEntity, FarmLotEntity, PestCatalogItem, AvgustProductItem } from './types';
import { initialAudits, initialFarmLots, initialAvgustProducts, initialPestCatalog } from './data/sampleData';
import { Navbar } from './components/Navbar';
import { DashboardScreen } from './screens/DashboardScreen';
import { NewAuditScreen } from './screens/NewAuditScreen';
import { AuditDetailScreen } from './screens/AuditDetailScreen';
import { SprayCalculatorScreen } from './screens/SprayCalculatorScreen';
import { AvgustCatalogScreen } from './screens/AvgustCatalogScreen';
import { PestCatalogScreen } from './screens/PestCatalogScreen';
import { FarmLotsScreen } from './screens/FarmLotsScreen';

const AUDITS_STORAGE_KEY = 'avgust_mipe_audits_v1';
const LOTS_STORAGE_KEY = 'avgust_mipe_lots_v1';
const PESTS_STORAGE_KEY = 'avgust_mipe_pests_v2';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('DASHBOARD');
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);
  const [initialPestForAudit, setInitialPestForAudit] = useState<PestCatalogItem | null>(null);
  const [initialProductForAudit, setInitialProductForAudit] = useState<AvgustProductItem | null>(null);

  // Persistent audits state
  const [audits, setAudits] = useState<MipeAuditEntity[]>(() => {
    try {
      const stored = localStorage.getItem(AUDITS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return initialAudits;
  });

  // Persistent lots state
  const [lots, setLots] = useState<FarmLotEntity[]>(() => {
    try {
      const stored = localStorage.getItem(LOTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return initialFarmLots;
  });

  // Persistent pests state
  const [pests, setPests] = useState<PestCatalogItem[]>(() => {
    try {
      const stored = localStorage.getItem(PESTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const existingIds = new Set(parsed.map((p: PestCatalogItem) => p.id));
        const missing = initialPestCatalog.filter((p) => !existingIds.has(p.id));
        return [...parsed, ...missing];
      }
    } catch {
      // ignore
    }
    return initialPestCatalog;
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUDITS_STORAGE_KEY, JSON.stringify(audits));
    } catch {
      // ignore
    }
  }, [audits]);

  useEffect(() => {
    try {
      localStorage.setItem(LOTS_STORAGE_KEY, JSON.stringify(lots));
    } catch {
      // ignore
    }
  }, [lots]);

  useEffect(() => {
    try {
      localStorage.setItem(PESTS_STORAGE_KEY, JSON.stringify(pests));
    } catch {
      // ignore
    }
  }, [pests]);

  const handleSaveAudit = (newAudit: MipeAuditEntity) => {
    // Determine risk status from totalScore
    const riskStatus: 'VERDE' | 'AMARILLO' | 'ROJO' =
      newAudit.totalScore >= 88 ? 'VERDE' : newAudit.totalScore >= 70 ? 'AMARILLO' : 'ROJO';

    // Update or link corresponding lot
    setLots((prevLots) =>
      prevLots.map((lot) => {
        if (
          lot.farmName.trim().toLowerCase() === newAudit.farmName.trim().toLowerCase() &&
          lot.lotName.trim().toLowerCase() === newAudit.lotName.trim().toLowerCase()
        ) {
          return {
            ...lot,
            lastAuditScore: newAudit.totalScore,
            riskStatus,
            lastAuditDate: newAudit.auditDate,
          };
        }
        return lot;
      })
    );

    setAudits((prev) => [newAudit, ...prev]);
    setSelectedAuditId(newAudit.id);
    setInitialPestForAudit(null);
    setInitialProductForAudit(null);
    setCurrentScreen('AUDIT_DETAIL');
  };

  const handleDeleteAudit = (auditId: number) => {
    setAudits((prev) => prev.filter((a) => a.id !== auditId));
    if (selectedAuditId === auditId) {
      setSelectedAuditId(null);
      setCurrentScreen('DASHBOARD');
    }
  };

  const handleAddLot = (
    newLotData: Omit<FarmLotEntity, 'id' | 'lastAuditScore' | 'riskStatus' | 'lastAuditDate'>
  ) => {
    const created: FarmLotEntity = {
      ...newLotData,
      id: Date.now(),
      lastAuditScore: 100,
      riskStatus: 'VERDE',
      lastAuditDate: Date.now(),
    };
    setLots((prev) => [created, ...prev]);
  };

  const handleStartAuditWithPest = (pest: PestCatalogItem) => {
    setInitialPestForAudit(pest);
    setInitialProductForAudit(null);
    setCurrentScreen('NEW_AUDIT');
  };

  const handleSelectProductForAudit = (product: AvgustProductItem) => {
    setInitialProductForAudit(product);
    setInitialPestForAudit(null);
    setCurrentScreen('NEW_AUDIT');
  };

  const handleAddPest = (newPest: PestCatalogItem) => {
    setPests((prev) => [newPest, ...prev]);
  };

  const selectedAudit = audits.find((a) => a.id === selectedAuditId) || audits[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        {currentScreen === 'DASHBOARD' && (
          <DashboardScreen
            audits={audits}
            lots={lots}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectAudit={(id) => {
              setSelectedAuditId(id);
              setCurrentScreen('AUDIT_DETAIL');
            }}
            onStartNewAudit={() => {
              setInitialPestForAudit(null);
              setInitialProductForAudit(null);
              setCurrentScreen('NEW_AUDIT');
            }}
          />
        )}

        {currentScreen === 'NEW_AUDIT' && (
          <NewAuditScreen
            lots={lots}
            products={initialAvgustProducts}
            pests={pests}
            initialPest={initialPestForAudit}
            initialProduct={initialProductForAudit}
            onSaveAudit={handleSaveAudit}
            onCancel={() => {
              setInitialPestForAudit(null);
              setInitialProductForAudit(null);
              setCurrentScreen('DASHBOARD');
            }}
          />
        )}

        {currentScreen === 'AUDIT_DETAIL' && selectedAudit && (
          <AuditDetailScreen
            audit={selectedAudit}
            onBack={() => setCurrentScreen('DASHBOARD')}
            onDelete={handleDeleteAudit}
          />
        )}

        {currentScreen === 'SPRAY_CALCULATOR' && (
          <SprayCalculatorScreen onBack={() => setCurrentScreen('DASHBOARD')} />
        )}

        {currentScreen === 'AVGUST_CATALOG' && (
          <AvgustCatalogScreen
            products={initialAvgustProducts}
            onBack={() => setCurrentScreen('DASHBOARD')}
            onSelectProductForAudit={handleSelectProductForAudit}
          />
        )}

        {currentScreen === 'PEST_CATALOG' && (
          <PestCatalogScreen
            pests={pests}
            onBack={() => setCurrentScreen('DASHBOARD')}
            onStartAuditWithPest={handleStartAuditWithPest}
            onAddPest={handleAddPest}
          />
        )}

        {currentScreen === 'FARM_LOTS' && (
          <FarmLotsScreen
            lots={lots}
            onBack={() => setCurrentScreen('DASHBOARD')}
            onAddLot={handleAddLot}
          />
        )}
      </main>

      {/* Persistent Bottom Nav (always accessible except in full-screen detail and new audit wizard) */}
      {currentScreen !== 'NEW_AUDIT' && currentScreen !== 'AUDIT_DETAIL' && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}
    </div>
  );
}

export default App;
