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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px] animate-fade-in">
      <div className="flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-modal">
        {/* Header */}
        <div className="relative shrink-0 bg-forest-900 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <div className="flex items-center gap-3 pr-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white p-1 shadow-sm">
              <img src="/avgust-logo.png" alt="Avgust" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="eyebrow text-brass-500">
                Guía de Instalación Android
              </span>
              <h2 className="mt-0.5 text-lg font-semibold leading-snug text-white">
                Instalar Avgust MIPE en tu Teléfono
              </h2>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-4 flex gap-1 rounded-[10px] border border-white/10 bg-black/20 p-1">
            <button
              onClick={() => setActiveTab('APK')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-control px-2 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'APK'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
              <span>Instalar vía APK</span>
            </button>
            <button
              onClick={() => setActiveTab('PWA')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-control px-2 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'PWA'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>Instalación Directa PWA</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 space-y-4 overflow-y-auto overscroll-contain p-5">
          {activeTab === 'APK' ? (
            <div className="space-y-4">
              {/* Direct Download Button */}
              <div className="rounded-card border border-forest-200 bg-forest-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-forest-950">AvgustMIPE.apk</div>
                    <div className="text-xs text-forest-700">Paquete oficial Android (v2/v3 firmado)</div>
                  </div>
                  <a
                    href="/AvgustMIPE.apk"
                    download="AvgustMIPE.apk"
                    className="btn-primary shrink-0"
                  >
                    <Download className="h-4 w-4" />
                    <span>Descargar APK</span>
                  </a>
                </div>
              </div>

              {/* Troubleshooting: Why it fails */}
              <div className="rounded-card border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-amber-600" />
                  <div>
                    <h3 className="text-xs font-semibold text-amber-950">
                      ¿Por qué dice "No se pudo instalar" o "El paquete no es válido"?
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-amber-900">
                      Android bloquea la instalación por 3 razones de seguridad de tu teléfono. Sigue estos 3 pasos para solucionarlo en 1 minuto:
                    </p>
                  </div>
                </div>
              </div>

              {/* Step by step fixes */}
              <div className="space-y-3">
                {/* Step 1 */}
                <div className="surface flex gap-3 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-muted text-xs font-semibold tabular-nums text-ink">
                    1
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Trash2 className="h-4 w-4 shrink-0 text-rose-600" />
                      <h4 className="text-xs font-semibold text-ink">
                        Desinstalar versión previa (¡Causa #1 del error!)
                      </h4>
                    </div>
                    <p className="mt-1 text-xs leading-normal text-ink-muted">
                      Si tenías una versión anterior de <strong>Avgust MIPE</strong> o un intento fallido anterior en tu teléfono, Android <strong>prohíbe</strong> instalar un nuevo archivo por conflicto de firma.
                    </p>
                    <div className="mt-2 rounded-control border border-line bg-surface-muted p-2 font-mono text-[11px] text-ink">
                      Ajustes del teléfono ➔ Aplicaciones ➔ "Avgust MIPE" ➔ <strong>Desinstalar</strong>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="surface flex gap-3 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-muted text-xs font-semibold tabular-nums text-ink">
                    2
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-forest-700" />
                      <h4 className="text-xs font-semibold text-ink">
                        Permitir instalación de apps desconocidas
                      </h4>
                    </div>
                    <p className="mt-1 text-xs leading-normal text-ink-muted">
                      Cuando descargas desde Chrome o WhatsApp, Android te preguntará si deseas permitir instalar aplicaciones de esta fuente.
                    </p>
                    <div className="mt-2 rounded-control border border-line bg-surface-muted p-2 font-mono text-[11px] text-ink">
                      Ajustes ➔ Seguridad ➔ Instalar apps desconocidas ➔ Activar para Chrome / Descargas
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="surface flex gap-3 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-muted text-xs font-semibold tabular-nums text-ink">
                    3
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 shrink-0 text-amber-600" />
                      <h4 className="text-xs font-semibold text-ink">
                        Aviso de Google Play Protect
                      </h4>
                    </div>
                    <p className="mt-1 text-xs leading-normal text-ink-muted">
                      Al no ser descargada de Google Play Store, Play Protect muestra una ventana naranja o roja diciendo <em>"Desarrollador no verificado"</em>.
                    </p>
                    <div className="mt-2 rounded-control border border-amber-200 bg-amber-50 p-2 text-[11px] font-medium text-amber-900">
                      ⚠️ No toques "Aceptar" (eso cancela la instalación). Toca en <strong>"Más detalles"</strong> y luego en <strong>"Instalar de todas formas"</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-card border border-forest-200 bg-forest-50 p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-700" />
                  <div>
                    <h3 className="text-xs font-semibold text-forest-950">
                      Método 100% Recomendado: Instalación Directa PWA
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-forest-900">
                      Avgust MIPE es una Progressive Web App oficial. Se instala en tu Android en 2 segundos, tiene el mismo icono, funciona sin conexión (offline) y <strong>no genera ningún error de firma ni de Play Protect</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Install PWA Button */}
              <button
                onClick={handleInstallPWA}
                className="btn-primary min-h-12 w-full text-sm"
              >
                <Smartphone className="h-[18px] w-[18px]" />
                <span>Instalar Aplicación en este Teléfono</span>
              </button>

              <div className="space-y-2 rounded-card border border-line bg-surface-muted p-4 text-xs text-ink">
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <span>¿Cómo instalarla manualmente en Google Chrome?</span>
                </div>
                <ol className="list-inside list-decimal space-y-1.5 text-xs text-ink-muted">
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
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-surface-muted px-5 py-3.5">
          <span className="text-[11px] text-ink-subtle">Avgust Crop Protection • v1.0</span>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
