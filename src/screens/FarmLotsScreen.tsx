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
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
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
            ? 'bg-forest-50 text-forest-800 border-forest-200'
            : isYellow
            ? 'bg-amber-50 text-amber-900 border-amber-200'
            : 'bg-rose-50 text-rose-800 border-rose-200';

          const dateStr = new Date(lot.lastAuditDate).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          return (
            <div
              key={lot.id}
              className="surface space-y-3 p-5 transition hover:border-forest-300"
            >
              <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                <div className="min-w-0">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-ink-muted">
                    <MapPin className="w-3 h-3 text-forest-700" />
                    {lot.locationRegion || 'Zona Agrícola'}
                  </span>
                  <h3 className="mt-0.5 text-base font-semibold text-ink">
                    {lot.farmName}
                  </h3>
                  <p className="text-xs font-medium text-ink-muted">
                    {lot.blockName} — {lot.lotName}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${badgeClass}`}>
                    {isGreen ? 'ESTADO ÓPTIMO' : isYellow ? 'EN OBSERVACIÓN' : 'ALERTA MIPE'}
                  </span>
                  <span className="mt-1.5 block text-xs font-semibold tabular-nums text-ink">
                    Puntaje: {lot.lastAuditScore} / 100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs text-ink-muted">
                <div>
                  <span className="block text-[11px] text-ink-muted">Cultivo / Variedad:</span>
                  <strong className="font-semibold text-ink">{lot.crop}</strong>
                  <span className="block text-[11px] text-ink-muted">({lot.variety})</span>
                </div>
                <div>
                  <span className="block text-[11px] text-ink-muted">Área Productiva:</span>
                  <strong className="font-semibold tabular-nums text-ink">{lot.areaHectares} hectáreas</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-ink-muted">Agrónomo / Encargado:</span>
                  <strong className="font-semibold text-ink">{lot.managerName}</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-ink-muted">Contacto:</span>
                  <strong className="font-semibold tabular-nums text-ink">{lot.contactPhone || 'No registrado'}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line pt-3 text-xs text-ink-muted">
                <span className="tabular-nums">Último Aseguramiento: {dateStr}</span>
                <span className="text-right font-semibold text-forest-800">
                  {lot.lastAuditScore >= 88 ? 'Aprobado con Excelencia' : 'Seguimiento programado'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lot Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-modal">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <h2 className="text-base font-semibold text-ink">
                Registrar Nuevo Lote / Invernadero
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-control p-1.5 text-ink-subtle transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="mb-1.5 block font-semibold text-ink">Nombre de la Finca *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Flores del Sol"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Bloque / Módulo</label>
                  <input
                    type="text"
                    placeholder="ej. Bloque C-01"
                    value={formData.blockName}
                    onChange={(e) => setFormData({ ...formData, blockName: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Lote / Válvula *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Lote 05"
                    value={formData.lotName}
                    onChange={(e) => setFormData({ ...formData, lotName: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Cultivo *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Rosa"
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Variedad</label>
                  <input
                    type="text"
                    placeholder="ej. Freedom"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Área (Hectáreas)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.areaHectares}
                    onChange={(e) => setFormData({ ...formData, areaHectares: parseFloat(e.target.value) || 1 })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Región / Municipio</label>
                  <input
                    type="text"
                    placeholder="ej. Sabana de Bogotá"
                    value={formData.locationRegion}
                    onChange={(e) => setFormData({ ...formData, locationRegion: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Responsable / Agrónomo</label>
                  <input
                    type="text"
                    placeholder="ej. Ing. Fernando Gómez"
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    className="field"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">Teléfono Contacto</label>
                  <input
                    type="text"
                    placeholder="ej. +57 300 123 4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
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
