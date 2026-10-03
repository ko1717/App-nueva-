# Avgust MIPE - Aseguramiento Agronómico y Auditoría de Campo

Aplicación web progresiva desarrollada en **React + TypeScript + Tailwind CSS** para técnicos, agrónomos y productores de **Avgust Crop Protection**, diseñada para estandarizar las auditorías y prescripciones de Manejo Integrado de Plagas y Enfermedades (MIPE).

## 🚀 Características Principales

1. **Panel de Control (Dashboard)**:
   - Resumen de auditorías MIPE y promedio general de calificación.
   - Semáforo de riesgo fitosanitario por lotes (Verde, Amarillo, Rojo).
   - Acceso rápido a módulos agronómicos y filtros por tipo de cultivo.

2. **Aseguramiento MIPE (Auditoría en 5 Pasos)**:
   - **Paso 1: Ubicación & Lote**: Datos generales, fenología y registro de variables climáticas en campo (temperatura, HR%, velocidad del viento).
   - **Paso 2: Monitoreo Fitosanitario**: Conteo de muestras, cálculo automático de incidencia %, severidad y nivel de riesgo.
   - **Paso 3: Calidad de Aplicación**: Tipo de boquilla, presión (PSI), volumen (L/ha), pH, dureza de agua y simulador interactivo de tarjeta hidrosensible (gotas/cm²).
   - **Paso 4: Manejo Cultural, Biológico, MOA & BPA**: Cumplimiento de podas, arvenses, trampas cromáticas, fauna benéfica, rotación FRAC/IRAC y normas de bioseguridad/EPP.
   - **Paso 5: Prescripción & Solución Avgust**: Selección de producto fitosanitario, cálculo exacto de caldo por tanque y recomendaciones técnicas del auditor.

3. **Calculadora de Calibración & Mezcla**:
   - Determinación del caudal por boquilla en L/min y ml/min según velocidad de avance y espaciamiento.
   - Dosificador de caldo para canecas o tanques con coadyuvante **Avgust Star**.
   - Protocolo oficial de compatibilidad física de mezcla **WALES**.

4. **Portafolio y Catálogo Técnico Avgust**:
   - Fungicidas, insecticidas, acaricidas, herbicidas y coadyuvantes con ingredientes activos, formulaciones, códigos MOA, dosis recomendadas y periodos de reingreso/carencia.

5. **Catálogo de Plagas y Enfermedades**:
   - Umbrales económicos de daño, diagnóstico de síntomas foliares/florales y estrategias integradas.

6. **Gestión de Fincas y Lotes**:
   - Registro de áreas, variedades, agronómos a cargo e historial de aseguramientos fitosanitarios.

## 🛠️ Tecnologías

- **React 19 & TypeScript**
- **Vite** como servidor de desarrollo y empaquetador
- **Tailwind CSS v4**
- **Lucide React** para iconografía agronómica
- **LocalStorage API** para persistencia de datos local en campo
