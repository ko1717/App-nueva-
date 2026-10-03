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
    <div className="space-y-5 pb-24">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
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
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por producto (ej. Balerina, Borey), ingrediente activo (ej. Azoxistrobina), código MOA o cultivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Crop Filters */}
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
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Sort Controls Bar */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/80 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-700">
              Orden Alfabético:
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setSortOrder('ABC_ASC')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  sortOrder === 'ABC_ASC'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                A → Z (ABC)
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('ABC_DESC')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  sortOrder === 'ABC_DESC'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Z → A
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('CATEGORY')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  sortOrder === 'CATEGORY'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Por Categoría
              </button>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            Mostrando {filteredProducts.length} de {products.length} productos
          </span>
        </div>
      </div>

      {/* Product Cards List */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-2">
            <Shield className="w-10 h-10 text-slate-600 mx-auto opacity-40" />
            <p className="text-sm font-bold text-slate-700">
              No se encontraron productos con estos criterios
            </p>
            <p className="text-xs text-slate-600">
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
              : 'bg-purple-100 text-purple-900 border-purple-300';

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5 hover:border-emerald-500/60 transition-all group"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-slate-900">
                        {prod.tradeName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${categoryBadgeColor}`}
                      >
                        {prod.category}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {prod.activeIngredient} •{' '}
                      <span className="text-slate-600 font-normal">{prod.formulation}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block shadow-xs">
                      Código: {prod.moaCode}
                    </span>
                    <span className="block text-[10px] text-slate-600 mt-0.5 font-medium">
                      {prod.chemicalGroup}
                    </span>
                  </div>
                </div>

                {/* Doses, Reentry, and Pre-harvest Intervals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">
                      Dosis Técnica Recomendada:
                    </span>
                    <strong className="text-slate-900 text-xs">{prod.standardDose}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-600" /> Periodo de Reingreso (PR):
                    </span>
                    <strong className="text-slate-800">{prod.reEntryPeriodHours} horas</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-600" /> Periodo de Carencia (PC):
                    </span>
                    <strong className="text-slate-800">
                      {prod.preHarvestIntervalDays > 0
                        ? `${prod.preHarvestIntervalDays} días a cosecha`
                        : '0 días (sin restricción)'}
                    </strong>
                  </div>
                </div>

                {/* Targets and Crops */}
                <div className="text-xs space-y-1">
                  <div>
                    <span className="font-bold text-slate-800">Blancos Fitosanitarios: </span>
                    <span className="text-slate-700 font-medium">
                      {prod.targetPests.join(' • ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Cultivos Registrados: </span>
                    <span className="text-slate-600 font-medium">
                      {prod.targetCrops.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Key agronomic feature */}
                <div className="text-xs text-slate-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 leading-relaxed">
                  <span className="font-bold text-emerald-950 flex items-center gap-1 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Ventaja Agronómica Avgust:
                  </span>
                  {prod.keyFeatures}
                </div>

                {/* Actions footer */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="text-[11px] text-slate-600">
                    <strong>Compatibilidad:</strong> {prod.compatibilityTips}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                    <button
                      onClick={() => setActiveProductModal(prod)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-600" />
                      <span>Ficha Técnica</span>
                    </button>

                    {onSelectProductForAudit && (
                      <button
                        onClick={() => onSelectProductForAudit(prod)}
                        className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 shadow-sm transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                  Ficha Técnica Oficial Avgust
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {activeProductModal.tradeName}
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  {activeProductModal.activeIngredient}
                </p>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-bold block">
                    Categoría:
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeProductModal.category}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-bold block">
                    Formulación:
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeProductModal.formulation}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-bold block">
                    Grupo Químico:
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeProductModal.chemicalGroup}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-bold block">
                    Código de Modo de Acción:
                  </span>
                  <span className="font-black text-emerald-800">
                    {activeProductModal.moaCode}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">
                  Dosis y Recomendación Agronómica:
                </span>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-semibold text-emerald-950">
                  {activeProductModal.standardDose}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">
                  Plagas / Enfermedades / Malezas Controladas:
                </span>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                  {activeProductModal.targetPests.map((pest, idx) => (
                    <li key={idx}>{pest}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">
                  Cultivos Autorizados en Registro:
                </span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {activeProductModal.targetCrops.join(', ')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 block">
                    Periodo de Reingreso (PR):
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {activeProductModal.reEntryPeriodHours} horas
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 block">
                    Periodo de Carencia (PC):
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {activeProductModal.preHarvestIntervalDays} días
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">
                  Consejos de Mezcla y Compatibilidad WALES:
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {activeProductModal.compatibilityTips}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => handleCopyTechSheet(activeProductModal)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-xs"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">¡Copiado al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Copiar Ficha Técnica</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 text-xs"
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
                    className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 shadow text-xs flex items-center gap-1.5"
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
