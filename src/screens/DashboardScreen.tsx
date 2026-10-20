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
  Smartphone,
  Download,
} from 'lucide-react';
import { AvgustHeader } from '../components/AvgustHeader';
import { InstallAppModal } from '../components/InstallAppModal';
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
  const [showInstallModal, setShowInstallModal] = useState(false);

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
    <div className="space-y-6">
      <AvgustHeader
        title="Aseguramiento MIPE"
        subtitle="Manejo Integrado de Plagas y Enfermedades • Auditoría de Campo"
      />

      {/* Android App & APK Installation Banner */}
      <div className="flex flex-col justify-between gap-3 rounded-card border border-line bg-surface-muted px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-line bg-surface text-forest-700">
            <Smartphone className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink">
                Avgust MIPE para Android
              </span>
              <span className="rounded-full border border-forest-200 bg-forest-50 px-1.5 text-[10px] font-semibold uppercase leading-4 tracking-wider text-forest-800">
                Offline
              </span>
            </div>
            <div className="text-xs text-ink-muted">
              Instala directamente en tu teléfono o descarga el archivo APK oficial.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowInstallModal(true)}
            className="btn-secondary"
          >
            <Smartphone className="h-4 w-4 text-forest-700" />
            <span>Instalar App / Ayuda APK</span>
          </button>
          <a
            href="/AvgustMIPE.apk"
            download="AvgustMIPE.apk"
            className="btn-secondary w-10 px-0"
            title="Descarga directa APK"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Primary Action CTA */}
      <button
        onClick={onStartNewAudit}
        className="group w-full rounded-card border border-forest-800 bg-forest-700 p-4 text-left text-white shadow-card transition-colors hover:bg-forest-800 sm:p-5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white/10 ring-1 ring-inset ring-white/20">
              <Plus className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-base font-semibold leading-snug text-white">
                Nuevo Aseguramiento MIPE
              </div>
              <div className="mt-0.5 text-xs text-white/75">
                Auditoría en 5 pasos, calibración y prescripción Avgust
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="surface p-4">
          <div className="flex items-start justify-between gap-2 text-xs font-medium text-ink-muted">
            <span>Auditorías MIPE</span>
            <TrendingUp className="h-4 w-4 shrink-0 text-forest-600" />
          </div>
          <div className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums text-ink">
            {totalAudits}
          </div>
          <div className="mt-2 text-xs font-medium text-forest-700">
            Certificaciones vigentes
          </div>
        </div>

        <div className="surface p-4">
          <div className="text-xs font-medium text-ink-muted">
            <span>Promedio Cumplimiento</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums text-forest-800">
              {averageScore}
            </span>
            <span className="text-xs font-medium tabular-nums text-ink-subtle">/ 100</span>
          </div>
          <div className="mt-2 text-xs text-ink-muted">
            {averageScore >= 88 ? 'Nivel Excelencia' : 'Nivel Conforme'}
          </div>
        </div>

        <div className="surface col-span-2 p-4 sm:col-span-2">
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink-muted">
            <span>Semáforo de Riesgo Lotes ({lots.length})</span>
            <MapPin className="h-4 w-4 shrink-0 text-ink-subtle" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-control border border-forest-200 bg-forest-50 px-2.5 py-2">
              <span className="block text-xl font-semibold leading-tight tabular-nums text-forest-800">{greenLotsCount}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-800">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                Óptimo
              </span>
            </div>
            <div className="rounded-control border border-amber-200 bg-amber-50 px-2.5 py-2">
              <span className="block text-xl font-semibold leading-tight tabular-nums text-amber-800">{yellowLotsCount}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Alerta
              </span>
            </div>
            <div className="rounded-control border border-rose-200 bg-rose-50 px-2.5 py-2">
              <span className="block text-xl font-semibold leading-tight tabular-nums text-rose-800">{redLotsCount}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-800">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                Crítico
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Agronomic Modules */}
      <section>
        <h2 className="eyebrow mb-2.5">Herramientas Técnicas</h2>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('SPRAY_CALCULATOR')}
            className="surface group flex flex-col items-start p-3.5 text-left transition hover:border-forest-300 hover:shadow-card-hover sm:p-4"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-control bg-forest-50 text-forest-700 ring-1 ring-inset ring-forest-100">
              <Calculator className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[13px] font-semibold leading-snug text-ink group-hover:text-forest-800">
              Calibración & Mezcla
            </span>
            <span className="mt-0.5 text-xs text-ink-muted">Protocolo WALES</span>
          </button>

          <button
            onClick={() => onNavigate('AVGUST_CATALOG')}
            className="surface group flex flex-col items-start p-3.5 text-left transition hover:border-forest-300 hover:shadow-card-hover sm:p-4"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-control bg-forest-50 text-forest-700 ring-1 ring-inset ring-forest-100">
              <Shield className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[13px] font-semibold leading-snug text-ink group-hover:text-forest-800">
              Catálogo Avgust
            </span>
            <span className="mt-0.5 text-xs text-ink-muted">Dosis e I.A.</span>
          </button>

          <button
            onClick={() => onNavigate('PEST_CATALOG')}
            className="surface group flex flex-col items-start p-3.5 text-left transition hover:border-forest-300 hover:shadow-card-hover sm:p-4"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-control bg-forest-50 text-forest-700 ring-1 ring-inset ring-forest-100">
              <Bug className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[13px] font-semibold leading-snug text-ink group-hover:text-forest-800">
              Plagas & Enfermedades
            </span>
            <span className="mt-0.5 text-xs text-ink-muted">Umbrales MIPE</span>
          </button>
        </div>
      </section>

      {/* Audits History Section with Search & Crop Filters */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="eyebrow">
            Auditorías Recientes (<span className="tabular-nums">{filteredAudits.length}</span>)
          </h2>
          <span className="text-xs text-ink-subtle">Toca para ver dictamen técnico</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            placeholder="Buscar por finca, lote, cultivo o problema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="field pl-9"
          />
        </div>

        {/* Crop Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="mr-1 h-3.5 w-3.5 flex-shrink-0 text-ink-subtle" />
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                selectedCrop === crop
                  ? 'border-forest-800 bg-forest-800 text-white'
                  : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Audits Cards */}
        {filteredAudits.length === 0 ? (
          <div className="rounded-card border border-dashed border-line-strong bg-surface p-6 py-10 text-center">
            <Shield className="mx-auto mb-2 h-9 w-9 text-ink-subtle opacity-60" />
            <p className="text-sm font-semibold text-ink">No se encontraron auditorías</p>
            <p className="mt-1 text-xs text-ink-muted">
              {searchQuery ? 'Prueba con otro término de búsqueda' : 'Registra la primera auditoría MIPE'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
                  className="surface group cursor-pointer p-4 transition hover:border-forest-300 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-muted">
                        <span className="flex items-center gap-1 font-semibold text-ink">
                          <MapPin className="h-3 w-3 text-forest-700" />
                          {audit.farmName}
                        </span>
                        <span className="text-line-strong">•</span>
                        <span>{audit.lotName}</span>
                      </div>

                      <h3 className="truncate text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-forest-800">
                        {audit.crop} — {audit.targetProblemName}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Calendar className="h-3 w-3 text-ink-subtle" />
                          {dateStr}
                        </span>
                        <span>
                          Blanco:{' '}
                          <strong className="font-semibold text-ink">
                            {audit.targetProblemType}
                          </strong>
                        </span>
                        <span>
                          Incidencia:{' '}
                          <strong className="font-semibold tabular-nums text-ink">
                            {audit.incidencePercent.toFixed(1)}%
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Score Badge */}
                    <div className="flex-shrink-0 text-right">
                      <div
                        className={`inline-block rounded-control border px-2 py-1 text-sm font-semibold leading-none tabular-nums ${
                          isExcellent
                            ? 'border-forest-200 bg-forest-50 text-forest-800'
                            : isConforming
                            ? 'border-amber-200 bg-amber-50 text-amber-900'
                            : 'border-rose-200 bg-rose-50 text-rose-800'
                        }`}
                      >
                        {audit.totalScore}{' '}
                        <span className="text-[11px] font-medium opacity-80">pts</span>
                      </div>
                      <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
                        {isExcellent ? 'Aprobado' : isConforming ? 'Conforme' : 'Riesgo'}
                      </span>
                    </div>
                  </div>

                  {/* Avgust Recommendation footer in card */}
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-2.5 text-xs">
                    <span className="min-w-0 truncate text-ink-muted">
                      Solución Avgust:{' '}
                      <span className="font-semibold text-forest-800">
                        {audit.recommendedProduct}
                      </span>
                    </span>
                    <span className="flex flex-shrink-0 items-center gap-1 font-semibold text-forest-700 transition-transform group-hover:translate-x-0.5">
                      Ver Acta <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </div>
  );
};
