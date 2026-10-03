import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Calculator,
  Shield,
  Bug,
  Filter,
} from 'lucide-react';
import { AvgustHeader } from '../components/AvgustHeader';
import { FarmLotEntity, MipeAuditEntity, AppScreen } from '../types';

interface DashboardScreenProps {
  audits: MipeAuditEntity[];
  lots: FarmLotEntity[];
  onNavigate: (screen: AppScreen) => void;
  onSelectAudit: (auditId: number) => void;
  onStartNewAudit: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  audits,
  lots,
  onNavigate,
  onSelectAudit,
  onStartNewAudit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('TODOS');

  const totalAudits = audits.length;
  const averageScore =
    totalAudits > 0
      ? Math.round(audits.reduce((acc, a) => acc + a.totalScore, 0) / totalAudits)
      : 0;

  const greenLotsCount = lots.filter((l) => l.riskStatus === 'VERDE').length;
  const yellowLotsCount = lots.filter((l) => l.riskStatus === 'AMARILLO').length;
  const redLotsCount = lots.filter((l) => l.riskStatus === 'ROJO').length;

  const crops = useMemo(() => {
    const list = Array.from(new Set(audits.map((a) => a.crop.split(' ')[0])));
    return ['TODOS', ...list];
  }, [audits]);

  const filteredAudits = useMemo(() => {
    return audits.filter((audit) => {
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        audit.farmName.toLowerCase().includes(q) ||
        audit.lotName.toLowerCase().includes(q) ||
        audit.targetProblemName.toLowerCase().includes(q) ||
        audit.crop.toLowerCase().includes(q);

      const matchesCrop =
        selectedCrop === 'TODOS' ||
        audit.crop.toLowerCase().includes(selectedCrop.toLowerCase());

      return matchesQuery && matchesCrop;
    });
  }, [audits, searchQuery, selectedCrop]);

  return (
    <div className="space-y-5 pb-20">
      <AvgustHeader
        title="Aseguramiento MIPE"
        subtitle="Manejo Integrado de Plagas y Enfermedades • Auditoría de Campo"
      />

      {/* Primary Action CTA */}
      <button
        onClick={onStartNewAudit}
        className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#007A33] to-[#059669] p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 text-left border border-emerald-500/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight">
                Nuevo Aseguramiento MIPE
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                Auditoría en 5 pasos, calibración y prescripción Avgust
              </div>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </button>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
            <span>Auditorías MIPE</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalAudits}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Certificaciones vigentes
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
            <span>Promedio Cumplimiento</span>
            <span className="text-xs font-bold text-emerald-700">/ 100</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{averageScore}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">
            {averageScore >= 88 ? 'Nivel Excelencia' : 'Nivel Conforme'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm col-span-2 sm:col-span-2">
          <div className="flex items-center justify-between text-slate-600 text-xs font-medium mb-1">
            <span>Semáforo de Riesgo Lotes ({lots.length})</span>
            <MapPin className="w-4 h-4 text-slate-600" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 text-center">
              <span className="text-base font-black text-emerald-700">{greenLotsCount}</span>
              <span className="block text-[10px] font-bold text-emerald-800 uppercase">Óptimo</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-1.5 text-center">
              <span className="text-base font-black text-amber-700">{yellowLotsCount}</span>
              <span className="block text-[10px] font-bold text-amber-800 uppercase">Alerta</span>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-1.5 text-center">
              <span className="text-base font-black text-rose-700">{redLotsCount}</span>
              <span className="block text-[10px] font-bold text-rose-800 uppercase">Crítico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Agronomic Modules */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Herramientas Técnicas
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('SPRAY_CALCULATOR')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">
              Calibración & Mezcla
            </span>
            <span className="text-[10px] text-slate-600">Protocolo WALES</span>
          </button>

          <button
            onClick={() => onNavigate('AVGUST_CATALOG')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">
              Catálogo Avgust
            </span>
            <span className="text-[10px] text-slate-600">Dosis e I.A.</span>
          </button>

          <button
            onClick={() => onNavigate('PEST_CATALOG')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Bug className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">
              Plagas & Enfermedades
            </span>
            <span className="text-[10px] text-slate-600">Umbrales MIPE</span>
          </button>
        </div>
      </div>

      {/* Audits History Section with Search & Crop Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Auditorías Recientes ({filteredAudits.length})
          </h2>
          <span className="text-[11px] text-slate-600">Toca para ver dictamen técnico</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por finca, lote, cultivo o problema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Crop Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mr-1" />
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCrop === crop
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Audits Cards */}
        {filteredAudits.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
            <Shield className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-700">No se encontraron auditorías</p>
            <p className="text-xs text-slate-600 mt-1">
              {searchQuery ? 'Prueba con otro término de búsqueda' : 'Registra la primera auditoría MIPE'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAudits.map((audit) => {
              const isExcellent = audit.totalScore >= 88;
              const isConforming = audit.totalScore >= 70 && audit.totalScore < 88;
              const dateStr = new Date(audit.auditDate).toLocaleDateString('es-CO', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div
                  key={audit.id}
                  onClick={() => onSelectAudit(audit.id)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 mb-1">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-700" />
                          {audit.farmName}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">{audit.lotName}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                        {audit.crop} — {audit.targetProblemName}
                      </h3>

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-600" />
                          {dateStr}
                        </span>
                        <span>
                          Blanco:{' '}
                          <strong className="text-slate-700 font-semibold">
                            {audit.targetProblemType}
                          </strong>
                        </span>
                        <span>
                          Incidencia:{' '}
                          <strong className="text-slate-700 font-semibold">
                            {audit.incidencePercent.toFixed(1)}%
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Score Badge */}
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-xl text-xs font-black border ${
                          isExcellent
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isConforming
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}
                      >
                        {audit.totalScore} pts
                      </div>
                      <span className="block text-[9px] font-bold text-slate-600 uppercase mt-1">
                        {isExcellent ? 'Aprobado' : isConforming ? 'Conforme' : 'Riesgo'}
                      </span>
                    </div>
                  </div>

                  {/* Avgust Recommendation footer in card */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      Solución Avgust:{' '}
                      <span className="font-semibold text-emerald-800">
                        {audit.recommendedProduct}
                      </span>
                    </span>
                    <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                      Ver Acta <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
