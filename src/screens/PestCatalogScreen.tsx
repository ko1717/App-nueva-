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
    <div className="space-y-5 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
            {filteredPests.length} Registradas
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 px-3 py-1.5 rounded-xl shadow-sm transition-colors"
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
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre común, científico, síntoma, cultivo o producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mr-1" />
          {['TODOS', 'PLAGA', 'ENFERMEDAD', 'ARVENSE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
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
          <span className="text-[11px] font-bold text-slate-600 flex-shrink-0 mr-1">
            Cultivo:
          </span>
          {cropFilters.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedCrop === crop
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-2">
            <Bug className="w-10 h-10 text-slate-600 mx-auto opacity-40" />
            <p className="text-sm font-bold text-slate-700">
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
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5 hover:border-purple-300 transition-all group"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-slate-900">
                        {pest.commonName}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeConfig}`}>
                        {pest.category}
                      </span>
                    </div>
                    <p className="text-xs italic text-slate-600 font-serif mt-0.5">
                      {pest.scientificName}
                    </p>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-600 block text-[10px] uppercase font-bold">
                      Cultivos Afectados:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {pest.affectedCrops.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Symptoms & Economic Threshold */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-200">
                    <span className="font-bold text-rose-950 flex items-center gap-1.5 mb-1">
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

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                      Órganos y Síntomas Clave:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      <strong className="text-slate-900">{pest.targetOrgans}:</strong> {pest.symptoms}
                    </p>
                  </div>
                </div>

                {/* Cultural & Biological strategies */}
                <div className="text-xs space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800">Estrategia Cultural MIPE: </span>
                    <span className="text-slate-600">{pest.mipeCulturalStrategy}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Control Biológico & Benéficos: </span>
                    <span className="text-slate-600">{pest.mipeBiologicalStrategy}</span>
                  </div>
                </div>

                {/* Avgust Recommendation footer */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-emerald-950 block">
                      Solución Técnica Recomendada Avgust:
                    </span>
                    <span className="text-sm font-black text-emerald-800">
                      {pest.recommendedAvgustSolution}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-semibold mt-0.5">
                      Rotación: {pest.recommendedMoaGroup}
                    </span>
                  </div>

                  {onStartAuditWithPest && (
                    <button
                      onClick={() => onStartAuditWithPest(pest)}
                      className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-sm transition-all flex-shrink-0"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Registrar Nueva Plaga o Enfermedad
                </h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Común *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Ácaro blanco"
                    value={formData.commonName}
                    onChange={(e) => setFormData({ ...formData, commonName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Científico *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Polyphagotarsonemus latus"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl italic"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Blanco</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE',
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="PLAGA">Plaga (Insecto / Ácaro / Nematodo)</option>
                    <option value="ENFERMEDAD">Enfermedad (Hongo / Bacteria / Oomiceto)</option>
                    <option value="ARVENSE">Arvense (Maleza)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cultivos Afectados</label>
                  <input
                    type="text"
                    placeholder="ej. Flores, Tomate, Pimentón"
                    value={formData.affectedCrops}
                    onChange={(e) => setFormData({ ...formData, affectedCrops: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Órgano Evaluado</label>
                <input
                  type="text"
                  placeholder="ej. Hojas tiernas y brotes apicales"
                  value={formData.targetOrgans}
                  onChange={(e) => setFormData({ ...formData, targetOrgans: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Síntomas y Daño en Campo</label>
                <textarea
                  rows={2}
                  placeholder="ej. Rizado hacia abajo de las hojas apicales, bronceado y endurecimiento."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Umbral Económico de Daño</label>
                <input
                  type="text"
                  placeholder="ej. > 5% de brotes con presencia activa"
                  value={formData.economicThreshold}
                  onChange={(e) => setFormData({ ...formData, economicThreshold: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Solución Recomendada Avgust</label>
                  <input
                    type="text"
                    placeholder="ej. Sirocco EC (0.8 cc/L) + Avgust Star"
                    value={formData.recommendedAvgustSolution}
                    onChange={(e) => setFormData({ ...formData, recommendedAvgustSolution: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grupo MOA / Rotación</label>
                  <input
                    type="text"
                    placeholder="ej. IRAC 1B rotando con IRAC 21A"
                    value={formData.recommendedMoaGroup}
                    onChange={(e) => setFormData({ ...formData, recommendedMoaGroup: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-800 shadow"
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
