import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Shield,
  Filter,
  Check,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  X,
  Droplets,
  AlertTriangle,
} from 'lucide-react';
import { AvgustProductItem } from '../types';
import { AvgustHeader } from '../components/AvgustHeader';

interface AvgustCatalogScreenProps {
  products: AvgustProductItem[];
  onBack: () => void;
  onSelectProductForAudit?: (product: AvgustProductItem) => void;
}

export const AvgustCatalogScreen: React.FC<AvgustCatalogScreenProps> = ({
  products,
  onBack,
  onSelectProductForAudit,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedCrop, setSelectedCrop] = useState('TODOS');
  const [sortOrder, setSortOrder] = useState<'ABC_ASC' | 'ABC_DESC' | 'CATEGORY'>('ABC_ASC');
  const [activeProductModal, setActiveProductModal] = useState<AvgustProductItem | null>(null);

  const [copiedNotification, setCopiedNotification] = useState(false);

  const categories = [
    { key: 'TODOS', label: 'Todos los productos' },
    { key: 'FUNGICIDA', label: '🍄 Fungicidas' },
    { key: 'INSECTICIDA', label: '🐛 Insecticidas / Acaricidas' },
    { key: 'HERBICIDA', label: '🌾 Herbicidas' },
    { key: 'COADYUVANTE', label: '💧 Coadyuvantes / Buffers' },
    { key: 'TRATAMIENTO DE SEMILLAS', label: '🌱 Tratamiento Semillas' },
  ];

  const cropFilters = [
    'TODOS',
    'Flores',
    'Café',
    'Aguacate',
    'Papa',
    'Arroz',
    'Tomate',
    'Maíz',
    'Banano',
    'Soya',
    'Pastos',
    'Caña de azúcar',
    'Cereales',
    'Frutales',
  ];

  const handleCopyTechSheet = (prod: AvgustProductItem) => {
    const text = `--- FICHA TÉCNICA AVGUST: ${prod.tradeName.toUpperCase()} ---
Categoría: ${prod.category}
Ingrediente Activo: ${prod.activeIngredient}
Formulación: ${prod.formulation}
Grupo Químico: ${prod.chemicalGroup}
Código Modo de Acción: ${prod.moaCode}
Dosis Estándar: ${prod.standardDose}
Periodo de Reingreso (PR): ${prod.reEntryPeriodHours} horas
Periodo de Carencia (PC): ${prod.preHarvestIntervalDays} días
Blancos: ${prod.targetPests.join(', ')}
Cultivos: ${prod.targetCrops.join(', ')}
Ventaja Agronómica: ${prod.keyFeatures}
Compatibilidad WALES: ${prod.compatibilityTips}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const filteredProducts = useMemo(() => {
    const list = products.filter((prod) => {
      const q = search.toLowerCase();
      const matchesQuery =
        !q ||
        prod.tradeName.toLowerCase().includes(q) ||
        prod.activeIngredient.toLowerCase().includes(q) ||
        prod.moaCode.toLowerCase().includes(q) ||
        prod.chemicalGroup.toLowerCase().includes(q) ||
        prod.targetPests.some((pest) => pest.toLowerCase().includes(q)) ||
        prod.targetCrops.some((crop) => crop.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'TODOS' ||
        prod.category.toUpperCase().includes(selectedCategory);

      const matchesCrop =
        selectedCrop === 'TODOS' ||
        prod.targetCrops.some((c) =>
          c.toLowerCase().includes(selectedCrop.toLowerCase())
        );

      return matchesQuery && matchesCat && matchesCrop;
    });

    return list.sort((a, b) => {
      if (sortOrder === 'ABC_ASC') {
        return a.tradeName.localeCompare(b.tradeName, 'es', { sensitivity: 'base' });
      }
      if (sortOrder === 'ABC_DESC') {
        return b.tradeName.localeCompare(a.tradeName, 'es', { sensitivity: 'base' });
      }
      if (sortOrder === 'CATEGORY') {
        const catComp = a.category.localeCompare(b.category);
        if (catComp !== 0) return catComp;
        return a.tradeName.localeCompare(b.tradeName, 'es', { sensitivity: 'base' });
      }
      return 0;
    });
  }, [products, search, selectedCategory, selectedCrop, sortOrder]);

  return (
    <div className="space-y-5">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-right text-xs font-semibold tabular-nums text-forest-800">
          Portafolio Oficial Avgust ({filteredProducts.length} Productos)
        </span>
      </div>

      <AvgustHeader
        title="Catálogo Oficial Avgust Crop Protection"
        subtitle="Portafolio completo de fungicidas, insecticidas, acaricidas, herbicidas y coadyuvantes para Colombia y Latinoamérica."
      />

      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            placeholder="Buscar por producto (ej. Balerina, Borey), ingrediente activo (ej. Azoxistrobina), código MOA o cultivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field pl-9"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="mr-1 h-3.5 w-3.5 flex-shrink-0 text-ink-subtle" />
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat.key
                  ? 'border-forest-800 bg-forest-800 text-white'
                  : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Crop Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="mr-1 flex-shrink-0 text-xs font-semibold text-ink-muted">
            Cultivo:
          </span>
          {cropFilters.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`whitespace-nowrap rounded-control px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedCrop === crop
                  ? 'bg-forest-100 text-forest-900'
                  : 'bg-surface-sunken text-ink-muted hover:bg-line'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Sort Controls Bar */}
        <div className="flex items-center justify-between gap-2 border-t border-line pt-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-ink-muted">
              Orden Alfabético:
            </span>
            <div className="inline-flex rounded-control border border-line bg-surface p-0.5">
              <button
                type="button"
                onClick={() => setSortOrder('ABC_ASC')}
                className={`rounded-[6px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                  sortOrder === 'ABC_ASC'
                    ? 'bg-forest-800 text-white'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                A → Z (ABC)
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('ABC_DESC')}
                className={`rounded-[6px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                  sortOrder === 'ABC_DESC'
                    ? 'bg-forest-800 text-white'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Z → A
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('CATEGORY')}
                className={`rounded-[6px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                  sortOrder === 'CATEGORY'
                    ? 'bg-forest-800 text-white'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Por Categoría
              </button>
            </div>
          </div>

          <span className="hidden text-xs tabular-nums text-ink-subtle sm:inline">
            Mostrando {filteredProducts.length} de {products.length} productos
          </span>
        </div>
      </div>

      {/* Product Cards List */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="rounded-card border border-dashed border-line-strong bg-surface p-8 text-center space-y-2">
            <Shield className="mx-auto h-9 w-9 text-ink-subtle opacity-60" />
            <p className="text-sm font-semibold text-ink">
              No se encontraron productos con estos criterios
            </p>
            <p className="text-xs text-ink-muted">
              Prueba limpiando los filtros o buscando por nombre comercial o ingrediente activo.
            </p>
          </div>
        ) : (
          filteredProducts.map((prod) => {
            const isFungicide = prod.category === 'FUNGICIDA';
            const isInsecticide = prod.category.includes('INSECTICIDA');
            const isHerbicide = prod.category === 'HERBICIDA';
            const isAdjuvant = prod.category.includes('COADYUVANTE');

            const categoryBadgeColor = isFungicide
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : isInsecticide
              ? 'bg-sky-100 text-sky-900 border-sky-300'
              : isHerbicide
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : isAdjuvant
              ? 'bg-teal-100 text-teal-900 border-teal-300'
              : 'bg-stone-100 text-stone-800 border-stone-300';

            return (
              <div
                key={prod.id}
                className="surface group space-y-3.5 p-5 transition hover:border-forest-300"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-ink">
                        {prod.tradeName}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${categoryBadgeColor}`}
                      >
                        {prod.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-ink-muted">
                      {prod.activeIngredient} •{' '}
                      <span className="font-normal text-ink-subtle">{prod.formulation}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block rounded-control border border-forest-200 bg-forest-50 px-2.5 py-1 text-xs font-semibold tabular-nums text-forest-800">
                      Código: {prod.moaCode}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium text-ink-muted">
                      {prod.chemicalGroup}
                    </span>
                  </div>
                </div>

                {/* Doses, Reentry, and Pre-harvest Intervals */}
                <div className="grid grid-cols-1 gap-3 rounded-control border border-line bg-surface-muted p-3 text-xs sm:grid-cols-3">
                  <div>
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      Dosis Técnica Recomendada:
                    </span>
                    <strong className="text-xs font-semibold text-ink">{prod.standardDose}</strong>
                  </div>
                  <div>
                    <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      <Clock className="h-3 w-3 text-ink-subtle" /> Periodo de Reingreso (PR):
                    </span>
                    <strong className="font-semibold tabular-nums text-ink">{prod.reEntryPeriodHours} horas</strong>
                  </div>
                  <div>
                    <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      <Calendar className="h-3 w-3 text-ink-subtle" /> Periodo de Carencia (PC):
                    </span>
                    <strong className="font-semibold tabular-nums text-ink">
                      {prod.preHarvestIntervalDays > 0
                        ? `${prod.preHarvestIntervalDays} días a cosecha`
                        : '0 días (sin restricción)'}
                    </strong>
                  </div>
                </div>

                {/* Targets and Crops */}
                <div className="text-xs space-y-1 leading-relaxed">
                  <div>
                    <span className="font-semibold text-ink">Blancos Fitosanitarios: </span>
                    <span className="text-ink-muted">
                      {prod.targetPests.join(' • ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Cultivos Registrados: </span>
                    <span className="text-ink-muted">
                      {prod.targetCrops.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Key agronomic feature */}
                <div className="rounded-control border border-forest-100 bg-forest-50/70 p-3 text-xs leading-relaxed text-ink">
                  <span className="mb-1 flex items-center gap-1.5 font-semibold text-forest-950">
                    <Sparkles className="h-3.5 w-3.5 text-forest-700" /> Ventaja Agronómica Avgust:
                  </span>
                  {prod.keyFeatures}
                </div>

                {/* Actions footer */}
                <div className="flex flex-col justify-between gap-3 border-t border-line pt-3 text-xs sm:flex-row sm:items-center">
                  <div className="text-[11px] leading-relaxed text-ink-muted">
                    <strong className="font-semibold text-ink">Compatibilidad:</strong> {prod.compatibilityTips}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                    <button
                      onClick={() => setActiveProductModal(prod)}
                      className="btn-secondary"
                    >
                      <Info className="h-3.5 w-3.5 text-ink-subtle" />
                      <span>Ficha Técnica</span>
                    </button>

                    {onSelectProductForAudit && (
                      <button
                        onClick={() => onSelectProductForAudit(prod)}
                        className="btn-primary"
                      >
                        <span>Prescribir MIPE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Technical Sheet Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-modal">
            <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
              <div>
                <span className="inline-block rounded-full border border-forest-200 bg-forest-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-800">
                  Ficha Técnica Oficial Avgust
                </span>
                <h2 className="mt-1.5 text-xl font-semibold leading-tight text-ink">
                  {activeProductModal.tradeName}
                </h2>
                <p className="mt-0.5 text-xs font-semibold text-ink-muted">
                  {activeProductModal.activeIngredient}
                </p>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="rounded-control p-1.5 text-ink-subtle transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-control border border-line bg-surface-muted p-3">
                <div>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Categoría:
                  </span>
                  <span className="font-semibold text-ink">
                    {activeProductModal.category}
                  </span>
                </div>
                <div>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Formulación:
                  </span>
                  <span className="font-semibold text-ink">
                    {activeProductModal.formulation}
                  </span>
                </div>
                <div>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Grupo Químico:
                  </span>
                  <span className="font-semibold text-ink">
                    {activeProductModal.chemicalGroup}
                  </span>
                </div>
                <div>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Código de Modo de Acción:
                  </span>
                  <span className="font-semibold tabular-nums text-forest-800">
                    {activeProductModal.moaCode}
                  </span>
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-semibold text-ink">
                  Dosis y Recomendación Agronómica:
                </span>
                <div className="rounded-control border border-forest-200 bg-forest-50 p-3 font-semibold text-forest-950">
                  {activeProductModal.standardDose}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-semibold text-ink">
                  Plagas / Enfermedades / Malezas Controladas:
                </span>
                <ul className="list-disc space-y-0.5 pl-5 text-ink-muted marker:text-forest-600">
                  {activeProductModal.targetPests.map((pest, idx) => (
                    <li key={idx}>{pest}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="mb-1.5 block font-semibold text-ink">
                  Cultivos Autorizados en Registro:
                </span>
                <p className="rounded-control border border-line bg-surface-muted p-3 text-ink-muted">
                  {activeProductModal.targetCrops.join(', ')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-control border border-line bg-surface-muted p-3">
                  <span className="mb-0.5 block text-[10px] font-semibold text-ink-muted">
                    Periodo de Reingreso (PR):
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    {activeProductModal.reEntryPeriodHours} horas
                  </span>
                </div>
                <div className="rounded-control border border-line bg-surface-muted p-3">
                  <span className="mb-0.5 block text-[10px] font-semibold text-ink-muted">
                    Periodo de Carencia (PC):
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    {activeProductModal.preHarvestIntervalDays} días
                  </span>
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-semibold text-ink">
                  Consejos de Mezcla y Compatibilidad WALES:
                </span>
                <p className="text-xs leading-relaxed text-ink-muted">
                  {activeProductModal.compatibilityTips}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
              <button
                type="button"
                onClick={() => handleCopyTechSheet(activeProductModal)}
                className="btn-secondary"
              >
                {copiedNotification ? (
                  <>
                    <Check className="h-4 w-4 text-forest-600" />
                    <span className="text-forest-700">¡Copiado al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-forest-600" />
                    <span>Copiar Ficha Técnica</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="btn-secondary"
                >
                  Cerrar
                </button>
                {onSelectProductForAudit && (
                  <button
                    onClick={() => {
                      const prod = activeProductModal;
                      setActiveProductModal(null);
                      onSelectProductForAudit(prod);
                    }}
                    className="btn-primary"
                  >
                    <span>Prescribir en Auditoría MIPE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
