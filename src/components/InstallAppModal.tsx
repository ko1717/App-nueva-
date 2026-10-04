import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  X,
  ShieldAlert,
  Trash2,
  ExternalLink,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'APK' | 'PWA'>('APK');

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Para instalar en Android:\n1. Toca los tres puntos (⋮) arriba a la derecha en Chrome.\n2. Selecciona "Instalar aplicación" o "Agregar a la pantalla principal".'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#004D20] via-[#007A33] to-[#0D9488] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md">
              <img src="/avgust-logo.png" alt="Avgust" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded-full">
                Guía de Instalación Android
              </span>
              <h2 className="text-lg font-black text-white mt-0.5">
                Instalar Avgust MIPE en tu Teléfono
              </h2>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-4 flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-400/30">
            <button
              onClick={() => setActiveTab('APK')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'APK'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Instalar vía APK</span>
            </button>
            <button
              onClick={() => setActiveTab('PWA')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'PWA'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instalación Directa PWA</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {activeTab === 'APK' ? (
            <div className="space-y-4">
              {/* Direct Download Button */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-emerald-950">AvgustMIPE.apk</div>
                    <div className="text-xs text-emerald-700">Paquete oficial Android (v2/v3 firmado)</div>
                  </div>
                  <a
                    href="/AvgustMIPE.apk"
                    download="AvgustMIPE.apk"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#007A33] to-[#059669] hover:from-[#004D20] hover:to-[#007A33] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar APK</span>
                  </a>
                </div>
              </div>

              {/* Troubleshooting: Why it fails */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-amber-900">
                      ¿Por qué dice "No se pudo instalar" o "El paquete no es válido"?
                    </h3>
                    <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                      Android bloquea la instalación por 3 razones de seguridad de tu teléfono. Sigue estos 3 pasos para solucionarlo en 1 minuto:
                    </p>
                  </div>
                </div>
              </div>

              {/* Step by step fixes */}
              <div className="space-y-3">
                {/* Step 1 */}
                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-black text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Trash2 className="w-4 h-4 text-red-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Desinstalar versión previa (¡Causa #1 del error!)
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      Si tenías una versión anterior de <strong>Avgust MIPE</strong> o un intento fallido anterior en tu teléfono, Android <strong>prohíbe</strong> instalar un nuevo archivo por conflicto de firma.
                    </p>
                    <div className="mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-mono">
                      Ajustes del teléfono ➔ Aplicaciones ➔ "Avgust MIPE" ➔ <strong>Desinstalar</strong>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Permitir instalación de apps desconocidas
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      Cuando descargas desde Chrome o WhatsApp, Android te preguntará si deseas permitir instalar aplicaciones de esta fuente.
                    </p>
                    <div className="mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-mono">
                      Ajustes ➔ Seguridad ➔ Instalar apps desconocidas ➔ Activar para Chrome / Descargas
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Aviso de Google Play Protect
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      Al no ser descargada de Google Play Store, Play Protect muestra una ventana naranja o roja diciendo <em>"Desarrollador no verificado"</em>.
                    </p>
                    <div className="mt-1.5 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[10px] text-amber-900 font-medium">
                      ⚠️ No toques "Aceptar" (eso cancela la instalación). Toca en <strong>"Más detalles"</strong> y luego en <strong>"Instalar de todas formas"</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-emerald-950">
                      Método 100% Recomendado: Instalación Directa PWA
                    </h3>
                    <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                      Avgust MIPE es una Progressive Web App oficial. Se instala en tu Android en 2 segundos, tiene el mismo icono, funciona sin conexión (offline) y <strong>no genera ningún error de firma ni de Play Protect</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Install PWA Button */}
              <button
                onClick={handleInstallPWA}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#004D20] via-[#007A33] to-[#0D9488] hover:from-[#004D20] hover:to-[#004D20] text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Smartphone className="w-5 h-5" />
                <span>Instalar Aplicación en este Teléfono</span>
              </button>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>¿Cómo instalarla manualmente en Google Chrome?</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600">
                  <li>Abre este enlace en <strong>Google Chrome</strong> en tu teléfono.</li>
                  <li>Toca el botón de <strong>tres puntos (⋮)</strong> en la esquina superior derecha del navegador.</li>
                  <li>Toca en <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</li>
                  <li>¡Listo! Aparecerá con su icono oficial verde Avgust en tu menú de aplicaciones.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Avgust Crop Protection • v1.0</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
