import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plus, User, Phone, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';
import { FarmLotEntity } from '../types';
import { AvgustHeader } from '../components/AvgustHeader';

interface FarmLotsScreenProps {
  lots: FarmLotEntity[];
  onBack: () => void;
  onAddLot: (lot: Omit<FarmLotEntity, 'id' | 'lastAuditScore' | 'riskStatus' | 'lastAuditDate'>) => void;
}

export const FarmLotsScreen: React.FC<FarmLotsScreenProps> = ({ lots, onBack, onAddLot }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    farmName: '',
    blockName: '',
    lotName: '',
    crop: '',
    variety: '',
    areaHectares: 2.0,
    managerName: '',
    contactPhone: '',
    locationRegion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.farmName || !formData.lotName || !formData.crop) return;
    onAddLot(formData);
    setShowModal(false);
    setFormData({
      farmName: '',
      blockName: '',
      lotName: '',
      crop: '',
      variety: '',
      areaHectares: 2.0,
      managerName: '',
      contactPhone: '',
      locationRegion: '',
    });
  };

  return (
    <div className="space-y-5 pb-24">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 px-3.5 py-1.5 rounded-xl shadow-sm hover:bg-emerald-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Registrar Lote
        </button>
      </div>

      <AvgustHeader
        title="Gestión de Fincas y Lotes"
        subtitle="Monitoreo de semáforo fitosanitario, historial de auditorías MIPE y zonificación agronómica."
      />

      {/* Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lots.map((lot) => {
          const isGreen = lot.riskStatus === 'VERDE';
          const isYellow = lot.riskStatus === 'AMARILLO';
          const badgeClass = isGreen
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : isYellow
            ? 'bg-amber-100 text-amber-900 border-amber-300'
            : 'bg-rose-100 text-rose-800 border-rose-300';

          const dateStr = new Date(lot.lastAuditDate).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          return (
            <div
              key={lot.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-600 block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    {lot.locationRegion || 'Zona Agrícola'}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">
                    {lot.farmName}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    {lot.blockName} — {lot.lotName}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${badgeClass}`}>
                    {isGreen ? 'ESTADO ÓPTIMO' : isYellow ? 'EN OBSERVACIÓN' : 'ALERTA MIPE'}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-700 mt-1">
                    Puntaje: {lot.lastAuditScore} / 100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-600 block">Cultivo / Variedad:</span>
                  <strong className="text-slate-800">{lot.crop}</strong>
                  <span className="block text-[11px] text-slate-600">({lot.variety})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 block">Área Productiva:</span>
                  <strong className="text-slate-800">{lot.areaHectares} hectáreas</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 block">Agrónomo / Encargado:</span>
                  <strong className="text-slate-800">{lot.managerName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 block">Contacto:</span>
                  <strong className="text-slate-800">{lot.contactPhone || 'No registrado'}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Último Aseguramiento: {dateStr}</span>
                <span className="font-semibold text-emerald-800">
                  {lot.lastAuditScore >= 88 ? 'Aprobado con Excelencia' : 'Seguimiento programado'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lot Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Registrar Nuevo Lote / Invernadero
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-600 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Finca *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Flores del Sol"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bloque / Módulo</label>
                  <input
                    type="text"
                    placeholder="ej. Bloque C-01"
                    value={formData.blockName}
                    onChange={(e) => setFormData({ ...formData, blockName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lote / Válvula *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Lote 05"
                    value={formData.lotName}
                    onChange={(e) => setFormData({ ...formData, lotName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cultivo *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Rosa"
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Variedad</label>
                  <input
                    type="text"
                    placeholder="ej. Freedom"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Área (Hectáreas)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.areaHectares}
                    onChange={(e) => setFormData({ ...formData, areaHectares: parseFloat(e.target.value) || 1 })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Región / Municipio</label>
                  <input
                    type="text"
                    placeholder="ej. Sabana de Bogotá"
                    value={formData.locationRegion}
                    onChange={(e) => setFormData({ ...formData, locationRegion: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Responsable / Agrónomo</label>
                  <input
                    type="text"
                    placeholder="ej. Ing. Fernando Gómez"
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono Contacto</label>
                  <input
                    type="text"
                    placeholder="ej. +57 300 123 4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 shadow"
                >
                  Guardar Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
