import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Bug,
  Filter,
  Plus,
  AlertCircle,
  Sprout,
  ShieldAlert,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { PestCatalogItem } from '../types';
import { AvgustHeader } from '../components/AvgustHeader';

interface PestCatalogScreenProps {
  pests: PestCatalogItem[];
  onBack: () => void;
  onStartAuditWithPest?: (pest: PestCatalogItem) => void;
  onAddPest?: (pest: PestCatalogItem) => void;
}

export const PestCatalogScreen: React.FC<PestCatalogScreenProps> = ({
  pests,
  onBack,
  onStartAuditWithPest,
  onAddPest,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedCrop, setSelectedCrop] = useState('TODOS');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding custom pest/disease
  const [formData, setFormData] = useState({
    scientificName: '',
    commonName: '',
    category: 'PLAGA' as 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE',
    affectedCrops: '',
    targetOrgans: '',
    symptoms: '',
    economicThreshold: '',
    optimalConditions: '',
    mipeCulturalStrategy: '',
    mipeBiologicalStrategy: '',
    recommendedAvgustSolution: '',
    recommendedMoaGroup: '',
  });

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
    'Frutales',
  ];

  const filteredPests = useMemo(() => {
    return pests.filter((pest) => {
      const q = search.toLowerCase();
      const matchesQuery =
        !q ||
        pest.scientificName.toLowerCase().includes(q) ||
        pest.commonName.toLowerCase().includes(q) ||
        pest.symptoms.toLowerCase().includes(q) ||
        pest.affectedCrops.some((c) => c.toLowerCase().includes(q)) ||
        pest.recommendedAvgustSolution.toLowerCase().includes(q) ||
        pest.targetOrgans.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'TODOS' ||
        pest.category.toUpperCase() === selectedCategory;

      const matchesCrop =
        selectedCrop === 'TODOS' ||
        pest.affectedCrops.some((c) =>
          c.toLowerCase().includes(selectedCrop.toLowerCase())
        );

      return matchesQuery && matchesCat && matchesCrop;
    }).sort((a, b) => a.commonName.localeCompare(b.commonName, 'es', { sensitivity: 'base' }));
  }, [pests, search, selectedCategory, selectedCrop]);

  const handleCreatePest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.commonName || !formData.scientificName) return;

    const newPest: PestCatalogItem = {
      id: `custom_${Date.now()}`,
      scientificName: formData.scientificName,
      commonName: formData.commonName,
      category: formData.category,
      affectedCrops: formData.affectedCrops
        ? formData.affectedCrops.split(',').map((s) => s.trim())
        : ['Cultivos varios'],
      targetOrgans: formData.targetOrgans || 'Follaje general',
      symptoms: formData.symptoms || 'Daño fitosanitario en campo',
      economicThreshold:
        formData.economicThreshold || 'Umbral de detección visual en campo',
      optimalConditions:
        formData.optimalConditions || 'Condiciones climáticas favorables',
      mipeCulturalStrategy:
        formData.mipeCulturalStrategy || 'Monitoreo preventivo y manejo cultural',
      mipeBiologicalStrategy:
        formData.mipeBiologicalStrategy || 'Control biológico y bio-insumos',
      recommendedAvgustSolution:
        formData.recommendedAvgustSolution || 'Solución según portafolio Avgust',
      recommendedMoaGroup: formData.recommendedMoaGroup || 'Rotación de grupo MOA',
    };

    if (onAddPest) {
      onAddPest(newPest);
    }
    setShowAddModal(false);
    setFormData({
      scientificName: '',
      commonName: '',
      category: 'PLAGA',
      affectedCrops: '',
      targetOrgans: '',
      symptoms: '',
      economicThreshold: '',
      optimalConditions: '',
      mipeCulturalStrategy: '',
      mipeBiologicalStrategy: '',
      recommendedAvgustSolution: '',
      recommendedMoaGroup: '',
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-semibold tabular-nums text-forest-800">
            {filteredPests.length} Registradas
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Plaga
          </button>
        </div>
      </div>

      <AvgustHeader
        title="Catálogo de Plagas y Enfermedades"
        subtitle="Biblioteca fitosanitaria con umbrales de daño económico, síntomas de campo y planes integrados MIPE Avgust."
      />

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            placeholder="Buscar por nombre común, científico, síntoma, cultivo o producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field pl-9"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="mr-1 h-3.5 w-3.5 flex-shrink-0 text-ink-subtle" />
          {['TODOS', 'PLAGA', 'ENFERMEDAD', 'ARVENSE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'border-forest-800 bg-forest-800 text-white'
                  : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {cat === 'TODOS'
                ? 'Todos los tipos'
                : cat === 'PLAGA'
                ? '🐛 Plagas'
                : cat === 'ENFERMEDAD'
                ? '🍄 Enfermedades'
                : '🌿 Arvenses'}
            </button>
          ))}
        </div>

        {/* Crop Filter Chips */}
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
      </div>

      {/* Pest Cards List */}
      <div className="space-y-4">
        {filteredPests.length === 0 ? (
          <div className="rounded-card border border-dashed border-line-strong bg-surface p-8 text-center space-y-2">
            <Bug className="mx-auto h-9 w-9 text-ink-subtle opacity-60" />
            <p className="text-sm font-semibold text-ink">
              No se encontraron coincidencias
            </p>
            <p className="text-xs text-slate-600">
              Prueba cambiando los filtros o utiliza el botón para registrar una nueva plaga.
            </p>
          </div>
        ) : (
          filteredPests.map((pest) => {
            const isPest = pest.category === 'PLAGA';
            const isDisease = pest.category === 'ENFERMEDAD';

            const badgeConfig = isPest
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : isDisease
              ? 'bg-rose-100 text-rose-900 border-rose-300'
              : 'bg-emerald-100 text-emerald-900 border-emerald-300';

            return (
              <div
                key={pest.id}
                className="surface group space-y-3.5 p-5 transition hover:border-forest-300"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-ink">
                        {pest.commonName}
                      </h3>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${badgeConfig}`}>
                        {pest.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm italic text-ink-muted">
                      {pest.scientificName}
                    </p>
                  </div>

                  <div className="text-xs sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      Cultivos Afectados:
                    </span>
                    <span className="font-semibold text-ink">
                      {pest.affectedCrops.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Symptoms & Economic Threshold */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-control border border-rose-200 bg-rose-50/70 p-3">
                    <span className="font-semibold text-rose-950 flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      Umbral Económico de Intervención:
                    </span>
                    <p className="text-rose-900 leading-relaxed text-[11px]">
                      {pest.economicThreshold}
                    </p>
                    <span className="text-[10px] text-rose-700/80 block mt-1">
                      <strong>Condición ideal:</strong> {pest.optimalConditions}
                    </span>
                  </div>

                  <div className="rounded-control border border-line bg-surface-muted p-3">
                    <span className="font-semibold text-ink flex items-center gap-1.5 mb-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                      Órganos y Síntomas Clave:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      <strong className="text-slate-900">{pest.targetOrgans}:</strong> {pest.symptoms}
                    </p>
                  </div>
                </div>

                {/* Cultural & Biological strategies */}
                <div className="space-y-1.5 rounded-control border border-line bg-surface-muted p-3 text-xs">
                  <div>
                    <span className="font-semibold text-ink">Estrategia Cultural MIPE: </span>
                    <span className="text-slate-600">{pest.mipeCulturalStrategy}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink">Control Biológico & Benéficos: </span>
                    <span className="text-slate-600">{pest.mipeBiologicalStrategy}</span>
                  </div>
                </div>

                {/* Avgust Recommendation footer */}
                <div className="flex flex-col justify-between gap-3 rounded-control border border-forest-200 bg-forest-50 p-3.5 text-xs sm:flex-row sm:items-center">
                  <div>
                    <span className="block font-semibold text-forest-950">
                      Solución Técnica Recomendada Avgust:
                    </span>
                    <span className="text-sm font-semibold text-forest-800">
                      {pest.recommendedAvgustSolution}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium text-forest-700">
                      Rotación: {pest.recommendedMoaGroup}
                    </span>
                  </div>

                  {onStartAuditWithPest && (
                    <button
                      onClick={() => onStartAuditWithPest(pest)}
                      className="btn-primary flex-shrink-0"
                    >
                      <span>Auditar con esta Plaga</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Pest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-modal">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-[18px] w-[18px] text-forest-700" />
                <h2 className="text-base font-semibold text-ink">
                  Registrar Nueva Plaga o Enfermedad
                </h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-control p-1.5 text-ink-subtle transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 items-end gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Nombre Común *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Ácaro blanco"
                    value={formData.commonName}
                    onChange={(e) => setFormData({ ...formData, commonName: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Nombre Científico *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Polyphagotarsonemus latus"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                    className="field italic"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 items-end gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Tipo de Blanco</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE',
                      })
                    }
                    className="field"
                  >
                    <option value="PLAGA">Plaga (Insecto / Ácaro / Nematodo)</option>
                    <option value="ENFERMEDAD">Enfermedad (Hongo / Bacteria / Oomiceto)</option>
                    <option value="ARVENSE">Arvense (Maleza)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Cultivos Afectados</label>
                  <input
                    type="text"
                    placeholder="ej. Flores, Tomate, Pimentón"
                    value={formData.affectedCrops}
                    onChange={(e) => setFormData({ ...formData, affectedCrops: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-ink">Órgano Evaluado</label>
                <input
                  type="text"
                  placeholder="ej. Hojas tiernas y brotes apicales"
                  value={formData.targetOrgans}
                  onChange={(e) => setFormData({ ...formData, targetOrgans: e.target.value })}
                  className="field"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-ink">Síntomas y Daño en Campo</label>
                <textarea
                  rows={2}
                  placeholder="ej. Rizado hacia abajo de las hojas apicales, bronceado y endurecimiento."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="field"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-ink">Umbral Económico de Daño</label>
                <input
                  type="text"
                  placeholder="ej. > 5% de brotes con presencia activa"
                  value={formData.economicThreshold}
                  onChange={(e) => setFormData({ ...formData, economicThreshold: e.target.value })}
                  className="field"
                />
              </div>

              <div className="grid grid-cols-2 items-end gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Solución Recomendada Avgust</label>
                  <input
                    type="text"
                    placeholder="ej. Sirocco EC (0.8 cc/L) + Avgust Star"
                    value={formData.recommendedAvgustSolution}
                    onChange={(e) => setFormData({ ...formData, recommendedAvgustSolution: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Grupo MOA / Rotación</label>
                  <input
                    type="text"
                    placeholder="ej. IRAC 1B rotando con IRAC 21A"
                    value={formData.recommendedMoaGroup}
                    onChange={(e) => setFormData({ ...formData, recommendedMoaGroup: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Guardar en Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
