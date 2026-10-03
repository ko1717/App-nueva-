import { AvgustProductItem } from '../types';

export const initialAvgustProducts: AvgustProductItem[] = [
  // =========================================================================
  // --- 1. FUNGICIDAS AVGUST CROP PROTECTION ---
  // =========================================================================
  {
    id: 'balerina_sc',
    tradeName: 'Balerina SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Trifloxistrobin 375 g/L + Ciproconazol 160 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Estrobirulinas + Triazoles',
    moaCode: 'FRAC 11 + 3',
    targetPests: [
      'Botrytis cinerea (Moho gris)',
      'Sphaerotheca pannosa (Oidio)',
      'Mycosphaerella fijiensis (Sigatoka negra)',
      'Puccinia spp. / Hemileia vastatrix (Roya)',
      'Colletotrichum spp. (Antracnosis)',
      'Rhizoctonia solani'
    ],
    targetCrops: ['Flores (Rosa, Clavel, Crisantemo)', 'Banano y Plátano', 'Café', 'Arroz', 'Frutales (Aguacate, Mango)', 'Cereales'],
    standardDose: '0.4 - 0.6 cc/L de agua (300 - 400 cc/ha)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Compatible con insecticidas neutros y Avgust Star. No mezclar con aguas alcalinas de pH mayor a 7.2.',
    keyFeatures: 'Doble ingrediente activo con efecto preventivo, curativo y antiesporulante; redistribución por fase de vapor y protección continua de brotes nuevos.'
  },
  {
    id: 'kolosal_pro',
    tradeName: 'Kolosal Pro ME',
    category: 'FUNGICIDA',
    activeIngredient: 'Propiconazol 300 g/L + Tebuconazol 200 g/L',
    formulation: 'Microemulsión (ME)',
    chemicalGroup: 'Triazoles (DMI - Inhibidores de desmetilación)',
    moaCode: 'FRAC 3',
    targetPests: [
      'Peronospora sparsa (Mildeo velloso)',
      'Hemileia vastatrix (Roya del café)',
      'Rhizoctonia solani (Añublo de la vaina)',
      'Podosphaera pannosa (Oidio)',
      'Helminthosporium spp.',
      'Cercospora coffeicola (Mancha de hierro)'
    ],
    targetCrops: ['Café', 'Flores', 'Arroz', 'Cereales (Trigo, Cebada)', 'Hortalizas (Tomate, Papa)', 'Frutales'],
    standardDose: '0.5 - 0.75 cc/L de agua (250 - 350 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Formulación de nanotecnología en microemulsión con partículas submicrónicas que penetran la cutícula cerosa en menos de 30 minutos.',
    keyFeatures: 'Máxima persistencia y protección sistémica floemática y xilemática contra hongos ascomicetos y basidiomicetos de alta agresividad.'
  },
  {
    id: 'kolosal_ec',
    tradeName: 'Kolosal 250 EC',
    category: 'FUNGICIDA',
    activeIngredient: 'Tebuconazol 250 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Triazoles (DMI)',
    moaCode: 'FRAC 3',
    targetPests: [
      'Hemileia vastatrix (Roya del café)',
      'Puccinia spp. (Roya de los cereales y maíz)',
      'Alternaria solani (Tizón temprano)',
      'Oidium spp. / Erysiphe spp.',
      'Fusarium spp.'
    ],
    targetCrops: ['Café', 'Maíz', 'Arroz', 'Papa', 'Tomate', 'Flores', 'Frutales'],
    standardDose: '0.5 - 0.8 L/ha (0.6 - 0.8 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Fungicida sistémico curativo y erradicante. Compatible con protectores multisitio como Adalto 720 SC.',
    keyFeatures: 'Inhibe la biosíntesis de ergosterol en la membrana celular del hongo patógeno, con alta solubilidad y movimiento acrópeto.'
  },
  {
    id: 'bosmit_325',
    tradeName: 'Bosmit 325 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Azoxistrobina 200 g/L + Difenoconazol 125 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Estrobirulinas + Triazoles',
    moaCode: 'FRAC 11 + 3',
    targetPests: [
      'Alternaria solani (Tizón temprano)',
      'Pyricularia oryzae (Añublo del arroz)',
      'Colletotrichum gloeosporioides (Antracnosis)',
      'Botrytis cinerea (Moho gris)',
      'Oidio (Uncinula necator / Leveillula taurica)'
    ],
    targetCrops: ['Papa', 'Tomate', 'Arroz', 'Aguacate', 'Cítricos', 'Cebolla', 'Flores'],
    standardDose: '0.4 - 0.6 L/ha (0.5 cc/L de agua)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Excelente balance preventivo y curativo translaminar. Aplicar con Avgust Star para optimizar cobertura.',
    keyFeatures: 'Efecto verde ("Greening effect") que potencia la actividad fotosintética del cultivo mientras erradica micelio endofítico.'
  },
  {
    id: 'curandero_sc',
    tradeName: 'Curandero 500 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Dimetomorfo 500 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Amidas del Ácido Cinámico (CAA)',
    moaCode: 'FRAC 40',
    targetPests: [
      'Phytophthora infestans (Gota / Tizón tardío)',
      'Pseudoperonospora cubensis (Mildeo velloso de cucurbitáceas)',
      'Peronospora destructor (Mildeo de la cebolla)',
      'Phytophthora cinnamomi (Pudrición radicular en aguacate)'
    ],
    targetCrops: ['Papa', 'Tomate', 'Cebolla', 'Flores', 'Aguacate', 'Melón / Sandía'],
    standardDose: '0.5 - 0.75 L/ha (0.5 - 0.75 cc/L)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Oomicida sistémico con acción translaminar y antiesporulante específica contra lisis de pared celular de Oomicetos.',
    keyFeatures: 'Inhibe la síntesis de fosfolípidos y la formación de la pared celular en todas las etapas del ciclo asexual de Phytophthora.'
  },
  {
    id: 'corbat_wg',
    tradeName: 'Corbat 690 WG',
    category: 'FUNGICIDA',
    activeIngredient: 'Dimetomorfo 90 g/kg + Mancozeb 600 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Cinámico amidas + Ditiocarbamatos',
    moaCode: 'FRAC 40 + M03',
    targetPests: [
      'Phytophthora infestans (Gota / Tizón tardío)',
      'Peronospora sparsa (Mildeo velloso)',
      'Bremia lactucae (Mildeo de la lechuga)',
      'Pseudoperonospora spp.'
    ],
    targetCrops: ['Papa', 'Tomate', 'Flores (Rosa)', 'Cebolla', 'Hortalizas'],
    standardDose: '2.0 - 2.5 kg/ha (2.0 - 2.5 g/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Combinación sinérgica de choque sistémico (dimetomorfo) con barrera protectora multisitio de amplio espectro (mancozeb).',
    keyFeatures: 'Gránulos de rápida dispersión sin polvo residual, alta resistencia al lavado por lluvia y nula inducción de resistencia.'
  },
  {
    id: 'difenazol_250',
    tradeName: 'Difenazol 250 EC',
    category: 'FUNGICIDA',
    activeIngredient: 'Difenoconazol 250 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Alternaria solani',
      'Cercospora spp.',
      'Venturia inaequalis (Sarna / Roña del manzano)',
      'Oidium spp.',
      'Septoria lycopersici'
    ],
    targetCrops: ['Tomate', 'Papa', 'Frutales (Manzano, Durazno, Aguacate)', 'Hortalizas', 'Flores'],
    standardDose: '0.3 - 0.5 cc/L de agua (200 - 300 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Penetración cuticular translaminar inmediata; no es afectado por lluvias que ocurran 2 horas después de la aspersión.',
    keyFeatures: 'Potente acción preventiva y curativa con amplio periodo de protección residual en tejidos jóvenes.'
  },
  {
    id: 'laclos_189',
    tradeName: 'Laclos 189 SE',
    category: 'FUNGICIDA',
    activeIngredient: 'Piraclostrobina 62.5 g/L + Epoxiconazol 62.5 g/L',
    formulation: 'Suspo-Emulsión (SE)',
    chemicalGroup: 'Estrobirulinas + Triazoles',
    moaCode: 'FRAC 11 + 3',
    targetPests: [
      'Roya asiática de la soya (Phakopsora pachyrhizi)',
      'Pyricularia oryzae',
      'Helminthosporium spp.',
      'Cercospora sojina',
      'Puccinia sorghi (Roya del maíz)'
    ],
    targetCrops: ['Soya', 'Maíz', 'Arroz', 'Cereales', 'Café'],
    standardDose: '0.6 - 0.8 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Formulación suspo-emulsión que incrementa la retención foliar en hojas cerosas de gramíneas y leguminosas.',
    keyFeatures: 'Máximo control de royas y manchas foliares complejas, reforzando la tolerancia del cultivo a estrés abiótico y térmico.'
  },
  {
    id: 'reventon_250',
    tradeName: 'Reventon 250 EC',
    category: 'FUNGICIDA',
    activeIngredient: 'Tebuconazol 250 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Roya del café (Hemileia vastatrix)',
      'Mancha de asfalto en maíz',
      'Fusarium culmorum',
      'Oidio de las flores y frutales'
    ],
    targetCrops: ['Café', 'Maíz', 'Cereales', 'Flores', 'Pastos'],
    standardDose: '0.5 - 0.75 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Compatible con la mayoría de fungicidas de contacto y fertilizantes foliares de alta solubilidad.',
    keyFeatures: 'Absorción rápida por raíces y hojas con traslocación acrópeta hacia zonas de crecimiento activo.'
  },
  {
    id: 'adalto_720',
    tradeName: 'Adalto 720 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Clorotalonil 720 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Cloronitrilos',
    moaCode: 'FRAC M05 (Multisitio)',
    targetPests: [
      'Phytophthora infestans (Gota / Tizón tardío)',
      'Alternaria solani (Tizón temprano)',
      'Botrytis cinerea (Moho gris)',
      'Colletotrichum spp. (Antracnosis)',
      'Septoria lycopersici'
    ],
    targetCrops: ['Papa', 'Tomate', 'Flores', 'Cebolla', 'Frutales', 'Hortalizas'],
    standardDose: '1.5 - 2.0 L/ha (1.5 - 2.0 cc/L de agua)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Fungicida protector multisitio de contacto. Columna vertebral en programas antirresistencia. No mezclar con aceites minerales.',
    keyFeatures: 'Formación de película protectora tenaz sobre el follaje, altamente resistente al lavado por lluvias torrenciales continuas.'
  },
  {
    id: 'afol_250',
    tradeName: 'Afol 250 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Flutriafol 250 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Hemileia vastatrix (Roya del café)',
      'Oidio (Erysiphe spp. / Leveillula taurica)',
      'Cercospora spp.',
      'Rhizoctonia oryzae'
    ],
    targetCrops: ['Café', 'Arroz', 'Soya', 'Hortalizas', 'Frutales'],
    standardDose: '0.4 - 0.5 cc/L de agua (200 - 300 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Excelente compatibilidad en mezcla de tanque con insecticidas y coadyuvantes de silicona.',
    keyFeatures: 'El triazol con la velocidad de translocación vascular más rápida del mercado, frena el avance de la hifa en menos de 2 horas.'
  },
  {
    id: 'arion_50',
    tradeName: 'Arion 50 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Hexaconazol 50 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Oidium spp. / Sphaerotheca spp.',
      'Roya (Puccinia spp.)',
      'Mancha foliar (Mycosphaerella spp.)'
    ],
    targetCrops: ['Flores', 'Frutales (Aguacate, Mango)', 'Arroz', 'Hortalizas'],
    standardDose: '1.0 - 1.5 cc/L de agua',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Compatible con la mayoría de plaguicidas de uso común; se recomienda pre-mezcla.',
    keyFeatures: 'Acción preventiva, curativa y erradicante con fuerte inhibición de la formación de haustorios y esporulación.'
  },
  {
    id: 'arkano_325',
    tradeName: 'Arkano 325 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Azoxistrobina 200 g/L + Flutriafol 125 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Estrobirulina + Triazol',
    moaCode: 'FRAC 11 + 3',
    targetPests: [
      'Piricularia oryzae (Pyricularia)',
      'Rhizoctonia solani (Añublo)',
      'Sarocladium oryzae (Pudrición de la vaina)',
      'Bipolaris oryzae (Mancha parda)'
    ],
    targetCrops: ['Arroz', 'Café', 'Maíz', 'Trigo', 'Cebada'],
    standardDose: '400 - 500 cc/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Aplicar preventivamente al inicio del embuche (hoja bandera) y repetir al 5-10% de espigamiento.',
    keyFeatures: 'Sinergia molecular entre el poder curativo fulminante del flutriafol y la prolongada protección y vigor de la azoxistrobina.'
  },
  {
    id: 'spirit_sc',
    tradeName: 'Spirit 400 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Azoxistrobina 240 g/L + Epoxiconazol 160 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Estrobirulinas + Triazoles',
    moaCode: 'FRAC 11 + 3',
    targetPests: [
      'Roya asiática (Phakopsora pachyrhizi)',
      'Mancha anillada (Corynespora casiicola)',
      'Antracnosis (Colletotrichum truncatum)',
      'Mancha ojo de rana (Cercospora sojina)'
    ],
    targetCrops: ['Soya', 'Cereales', 'Maíz', 'Café', 'Frijol'],
    standardDose: '0.4 - 0.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 28,
    compatibilityTips: 'Aplicar siempre con coadyuvante organosiliconado Avgust Star o Allur EC.',
    keyFeatures: 'Protección integral del rendimiento del grano, previniendo el deshoje precoz y asegurando el llenado completo.'
  },
  {
    id: 'rias_sc',
    tradeName: 'Rias 300 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Difenoconazol 150 g/L + Ciproconazol 150 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles dobles',
    moaCode: 'FRAC 3 + 3',
    targetPests: [
      'Roya de la hoja y del tallo (Puccinia spp.)',
      'Septoria tritici',
      'Helminthosporium teres',
      'Fusarium graminearum'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Café', 'Cereales', 'Pastos'],
    standardDose: '0.3 - 0.4 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Excelente opción para rotar con estrobirulinas y carboxamidas evitando el colapso por resistencia.',
    keyFeatures: 'Doble punto de interferencia en la vía de biosíntesis del ergosterol con rápido efecto de choque curativo.'
  },
  {
    id: 'tirano_250',
    tradeName: 'Tirano 250 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Azoxistrobina 250 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Estrobirulinas (QoI)',
    moaCode: 'FRAC 11',
    targetPests: [
      'Pyricularia oryzae',
      'Colletotrichum gloeosporioides',
      'Rhizoctonia solani',
      'Oidium spp.',
      'Pseudoperonospora cubensis'
    ],
    targetCrops: ['Arroz', 'Frutales (Aguacate, Mango, Cítricos)', 'Hortalizas', 'Flores', 'Papa'],
    standardDose: '0.4 - 0.6 L/ha (0.5 cc/L de agua)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'No aplicar en variedades de manzano sensibles a estrobirulinas. Rotar siempre con fungicidas multisitio.',
    keyFeatures: 'Inhibe la respiración mitocondrial del hongo bloqueando la transferencia de electrones en el complejo III.'
  },
  {
    id: 'metamor_wg',
    tradeName: 'Metamor 680 WG',
    category: 'FUNGICIDA',
    activeIngredient: 'Metalaxil-M 40 g/kg + Mancozeb 640 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Acilalaninas + Ditiocarbamatos',
    moaCode: 'FRAC 4 + M03',
    targetPests: [
      'Phytophthora infestans (Gota)',
      'Peronospora sparsa (Mildeo velloso de la rosa)',
      'Pseudoperonospora cubensis',
      'Pythium spp. (Pudrición de plántulas)'
    ],
    targetCrops: ['Papa', 'Tomate', 'Flores', 'Cucurbitáceas', 'Cebolla'],
    standardDose: '2.0 - 2.5 kg/ha (2.0 - 2.5 g/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Aplicar al inicio de condiciones predisponentes de alta humedad y bajas temperaturas.',
    keyFeatures: 'El isómero más activo del metalaxil (mefenoxam) garantiza absorción sistémica en 30 minutos y protección interna prolongada.'
  },
  {
    id: 'gecata_sc',
    tradeName: 'Gecata 225 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Difenoconazol 125 g/L + Tetraconazol 100 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3 + 3',
    targetPests: [
      'Cercospora beticola',
      'Erysiphe betae / Erysiphe cichoracearum (Oidio)',
      'Ramularia spp.',
      'Septoria spp.'
    ],
    targetCrops: ['Remolacha azucarera', 'Hortalizas', 'Flores', 'Frutales'],
    standardDose: '0.5 - 0.7 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Excelente tolerabilidad en el cultivo, sin retrasos de crecimiento ni efectos fitotóxicos.',
    keyFeatures: 'Equilibrio perfecto entre liposolubilidad e hidrosolubilidad, asegurando redistribución en la cutícula y movimiento vascular.'
  },
  {
    id: 'inside_sc',
    tradeName: 'Inside 350 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Difenoconazol 100 g/L + Flutriafol 250 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3 + 3',
    targetPests: [
      'Roya parda y amarilla (Puccinia spp.)',
      'Mancha reticulada (Pyrenophora teres)',
      'Oidio del trigo y cebada',
      'Septoriosis foliar'
    ],
    targetCrops: ['Cereales (Trigo, Cebada)', 'Maíz', 'Café', 'Soya'],
    standardDose: '0.4 - 0.6 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Provee una barrera curativa inmediata frente a infecciones latentes en la hoja bandera.',
    keyFeatures: 'La combinación de dos triazoles con diferentes coeficientes de partición permite frenar la esporulación superficial e interna.'
  },
  {
    id: 'raek_ec',
    tradeName: 'Raek 250 EC',
    category: 'FUNGICIDA',
    activeIngredient: 'Difenoconazol 250 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Venturia inaequalis (Sarna)',
      'Monilinia fructigena (Moniliasis del fruto)',
      'Alternaria spp.',
      'Cladosporium spp.'
    ],
    targetCrops: ['Frutales de carozo y pepita', 'Tomate', 'Papa', 'Flores'],
    standardDose: '0.3 - 0.4 cc/L (0.2 - 0.35 L/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Ideal para tratamientos curativos aplicados hasta 96 horas después del inicio de la lluvia infectante.',
    keyFeatures: 'Alta lipofilia con fuerte afinidad cuticular que previene el desarrollo de manchas y deformaciones en fruto.'
  },
  {
    id: 'kumulus_df',
    tradeName: 'Kumulus 800 DF / Azufral',
    category: 'FUNGICIDA',
    activeIngredient: 'Azufre Elemental Micronizado 800 g/kg',
    formulation: 'Gránulos Dispersables en Seco (DF/WG)',
    chemicalGroup: 'Inorgánicos',
    moaCode: 'FRAC M02 (Multisitio)',
    targetPests: [
      'Oidio (Sphaerotheca pannosa / Oidium spp.)',
      'Ácaro blanco (Polyphagotarsonemus latus)',
      'Arañita roja (Tetranychus urticae)',
      'Taphrina deformans (Torque del duraznero)'
    ],
    targetCrops: ['Flores', 'Aguacate', 'Frutales', 'Hortalizas', 'Vid / Uva'],
    standardDose: '2.0 - 3.0 g/L de agua (2.0 - 4.0 kg/ha)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 1,
    compatibilityTips: 'No aplicar con temperaturas mayores a 28°C ni en mezcla con aceites agrícolas (esperar intervalo de 21 días).',
    keyFeatures: 'Microgránulos que generan fase de vapor desinfectante en el microclima foliar con doble efecto fungicida y acaricida.'
  },
  {
    id: 'credo_sc',
    tradeName: 'Credo 500 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Carbendazim 500 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Benzimidazoles (MBC)',
    moaCode: 'FRAC 1',
    targetPests: [
      'Botrytis cinerea',
      'Fusarium spp.',
      'Cercospora spp.',
      'Sclerotinia sclerotiorum',
      'Colletotrichum spp.'
    ],
    targetCrops: ['Flores', 'Arroz', 'Cereales', 'Leguminosas', 'Frutales'],
    standardDose: '0.5 - 0.8 cc/L de agua',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Fungicida sistémico con absorción por follaje y raíces; rotar rigurosamente con multisitios como Adalto 720 SC.',
    keyFeatures: 'Inhibe la polimerización de tubulina interfiriendo con la división celular mitótica del patógeno.'
  },
  {
    id: 'tirador_300',
    tradeName: 'Tirador 300 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Tebuconazol 200 g/L + Azoxistrobina 100 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles + Estrobirulinas',
    moaCode: 'FRAC 3 + 11',
    targetPests: [
      'Hemileia vastatrix (Roya del café)',
      'Piricularia oryzae',
      'Mancha de asfalto en maíz',
      'Antracnosis',
      'Alternaria solani'
    ],
    targetCrops: ['Café', 'Arroz', 'Maíz', 'Papa', 'Flores'],
    standardDose: '0.6 - 0.8 L/ha (0.6 - 0.8 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Aplicar preventivamente o a primeros síntomas foliares con buena cobertura hidráulica.',
    keyFeatures: 'Sinergia que prolonga el área foliar verde funcional e incrementa el peso específico y sanidad de la cosecha.'
  },

  // =========================================================================
  // --- 2. INSECTICIDAS Y ACARICIDAS AVGUST CROP PROTECTION ---
  // =========================================================================
  {
    id: 'borey_sc',
    tradeName: 'Borey SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Imidacloprid 150 g/L + Lambda-cihalotrina 50 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Neonicotinoides + Piretroides',
    moaCode: 'IRAC 4A + 3A',
    targetPests: [
      'Thrips palmi / Frankliniella occidentalis (Trips)',
      'Bemisia tabaci (Mosca blanca)',
      'Aphis gossypii / Myzus persicae (Pulgones / Áfidos)',
      'Spodoptera frugiperda (Gusano cogollero)',
      'Diaphorina citri (Psílido asiático de los cítricos)',
      'Premnotrypes vorax (Gusano blanco de la papa)'
    ],
    targetCrops: ['Flores (Rosa, Crisantemo)', 'Aguacate', 'Tomate', 'Papa', 'Café', 'Maíz', 'Arroz', 'Cítricos'],
    standardDose: '0.3 - 0.5 cc/L de agua (200 - 350 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Aplicar en horas tempranas o de caída de sol; compatible con fungicidas Avgust (Balerina, Kolosal Pro).',
    keyFeatures: 'Doble mecanismo de acción: derribe inmediato (Knockdown fulminante) por contacto y repelencia, sumado a protección sistémica prolongada en brotes.'
  },
  {
    id: 'borey_neo',
    tradeName: 'Borey Neo SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Alfa-cipermetrina 125 g/L + Imidacloprid 100 g/L + Clotianidina 50 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Piretroides + Neonicotinoides dobles',
    moaCode: 'IRAC 3A + 4A + 4A',
    targetPests: [
      'Complejo de chinches (Nezara viridula, Euschistus heros, Piezodorus guildinii)',
      'Trips y Mosca blanca resistente',
      'Gusano soldado y cogollero (Spodoptera spp.)',
      'Euschistus spp.',
      'Escarabajos y pulgillas (Epitrix spp.)'
    ],
    targetCrops: ['Soya', 'Maíz', 'Arroz', 'Papa', 'Tomate', 'Flores', 'Cereales'],
    standardDose: '0.2 - 0.4 L/ha (0.3 - 0.5 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'La mezcla de dos neonicotinoides con distinta velocidad de translocación junto con un piretroide hiperactivo supera cepas tolerantes.',
    keyFeatures: 'Triple principio activo que destruye plagas chupadoras y masticadoras con efecto de choque instantáneo y protección por más de 25 días.'
  },
  {
    id: 'buproser_25',
    tradeName: 'Buproser 25 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Buprofezin 250 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Tiadiazinas (Reguladores de crecimiento de insectos - IGR)',
    moaCode: 'IRAC 16 (Inhibidor de síntesis de quitina tipo 1)',
    targetPests: [
      'Ninfas de Mosca blanca (Bemisia tabaci, Trialeurodes vaporariorum)',
      'Escamas protegidas y blandas (Coccus spp., Saissetia spp.)',
      'Cochinillas harinosas (Pseudococcus spp., Planococcus spp.)',
      'Salivazo y saltahojas (Cicadellidae / Delphacidae)'
    ],
    targetCrops: ['Tomate', 'Flores', 'Aguacate', 'Cítricos', 'Arroz', 'Frutales'],
    standardDose: '0.8 - 1.2 cc/L de agua (0.8 - 1.2 L/ha)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Ideal para programas MIPE respetando fauna benéfica y parasitoides (Encarsia formosa). Agregar Avgust Star para penetrar cera.',
    keyFeatures: 'Inhibe la muda y formación de cutícula en ninfas y esteriliza a las hembras adultas, cortando el ciclo reproductivo de raíz.'
  },
  {
    id: 'sirocco_ec',
    tradeName: 'Sirocco 40 EC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Dimetoato 400 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Organofosforados',
    moaCode: 'IRAC 1B',
    targetPests: [
      'Tetranychus urticae (Arañita roja)',
      'Liriomyza spp. (Minador de la hoja)',
      'Hypothenemus hampei (Broca del café)',
      'Pulgones y Trips',
      'Mosca de la fruta (Anastrepha spp., Ceratitis capitata)'
    ],
    targetCrops: ['Flores (Rosa, Crisantemo)', 'Café', 'Cítricos', 'Hortalizas', 'Frutales'],
    standardDose: '0.8 - 1.2 cc/L de agua',
    reEntryPeriodHours: 48,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Insecticida/acaricida organofosforado con fuerte efecto de choque por contacto e ingestión y penetración sistémica.',
    keyFeatures: 'Control contundente en focos severos de ácaros y minadores, traslocándose en la lámina foliar hacia el envés.'
  },
  {
    id: 'radetus_200',
    tradeName: 'Radetus 200 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Clorantraniliprol 200 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Diamidas Antranílicas',
    moaCode: 'IRAC 28 (Modulador de receptores de rianodina)',
    targetPests: [
      'Spodoptera frugiperda (Gusano cogollero)',
      'Tuta absoluta (Polilla del tomate)',
      'Helicoverpa zea (Gusano elotero)',
      'Diatraea saccharalis (Barrenador del tallo)',
      'Plutella xylostella (Polilla dorso de diamante)',
      'Neoleucinodes elegantalis (Perforador del fruto)'
    ],
    targetCrops: ['Tomate', 'Maíz', 'Arroz', 'Caña de azúcar', 'Papa', 'Flores', 'Crucíferas'],
    standardDose: '100 - 150 cc/ha (0.15 - 0.25 cc/L de agua)',
    reEntryPeriodHours: 4,
    preHarvestIntervalDays: 1,
    compatibilityTips: 'Excelente perfil toxicológico y selectividad frente a abejas y polinizadores una vez seco el depósito foliar.',
    keyFeatures: 'Provoca parálisis muscular inmediata de la larva al vaciar sus reservas intracelulares de calcio, cesando la alimentación en minutos.'
  },
  {
    id: 'ypsilon_ec',
    tradeName: 'Ypsilon 50 EC',
    category: 'INSECTICIDA',
    activeIngredient: 'Lufenuron 50 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Benzoilureas',
    moaCode: 'IRAC 15 (Inhibidor de biosíntesis de quitina tipo 0)',
    targetPests: [
      'Spodoptera frugiperda (Larvas L1 a L3)',
      'Anticarsia gemmatalis (Gusano terciopelo)',
      'Pseudoplusia includens (Falso medidor)',
      'Tuta absoluta (Huevos y larvas jóvenes)',
      'Trips (ninfas)'
    ],
    targetCrops: ['Maíz', 'Soya', 'Tomate', 'Papa', 'Algodón', 'Flores'],
    standardDose: '300 - 500 cc/ha (0.4 - 0.6 cc/L)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Aplicar sobre oviposturas y larvas tempranas; compatible con insecticidas de choque como Borey SC.',
    keyFeatures: 'Efecto ovicida por contacto y larvicida por ingestión: impide que la larva complete la ecdisis o muda, muriendo atrapada en su exuvia.'
  },
  {
    id: 'tetraprid_sc',
    tradeName: 'Tetraprid 200 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Acetamiprid 100 g/L + Bifentrina 100 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Neonicotinoides + Piretroides',
    moaCode: 'IRAC 4A + 3A',
    targetPests: [
      'Thrips palmi y Frankliniella occidentalis',
      'Bemisia tabaci',
      'Aphis spp.',
      'Cochinilla harinosa',
      'Escarabajos foliares'
    ],
    targetCrops: ['Flores', 'Aguacate', 'Tomate', 'Pimentón', 'Hortalizas', 'Frutales'],
    standardDose: '0.4 - 0.6 cc/L de agua',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Ideal para aplicaciones en aspersión foliar de alta presión con boquillas de cono cerámico y Avgust Star.',
    keyFeatures: 'Gran poder de choque por contacto con acción repelente y prolongada sistemia translaminar que protege el envés.'
  },
  {
    id: 'stylet_sc',
    tradeName: 'Stylet 150 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Indoxacarb 150 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Oxadiazinas',
    moaCode: 'IRAC 22A (Bloqueador de canales de sodio)',
    targetPests: [
      'Spodoptera spp. (Cogollero)',
      'Heliothis virescens / Helicoverpa zea',
      'Trichoplusia ni (Gusano falso medidor)',
      'Tuta absoluta (Polilla del tomate)'
    ],
    targetCrops: ['Tomate', 'Maíz', 'Papa', 'Flores', 'Crucíferas', 'Algodón'],
    standardDose: '250 - 350 cc/ha (0.3 - 0.4 cc/L)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 3,
    compatibilityTips: 'Bioactivado por las enzimas internas del insecto diana ("pro-insecticida"), siendo inocuo para ácaros benéficos.',
    keyFeatures: 'Control específico de orugas lepidópteras con cesación de la ingesta en pocas horas y muerte en 24-48 horas.'
  },
  {
    id: 'scarabey_me',
    tradeName: 'Scarabey ME',
    category: 'INSECTICIDA',
    activeIngredient: 'Diflubenzuron 300 g/L + Acetamiprid 100 g/L',
    formulation: 'Microemulsión (ME)',
    chemicalGroup: 'Benzoilureas + Neonicotinoides',
    moaCode: 'IRAC 15 + 4A',
    targetPests: [
      'Gusanos defoliadores y cogolleros',
      'Huevos y ninfas de trips',
      'Mosca blanca y chinches',
      'Minadores de hojas'
    ],
    targetCrops: ['Maíz', 'Soya', 'Hortalizas', 'Flores', 'Frutales'],
    standardDose: '0.3 - 0.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'La formulación ME asegura micelas ultrafinas para máxima penetración en tejidos foliares y cobertura uniforme.',
    keyFeatures: 'Combina el control de adultos con la ruptura definitiva del ciclo biológico de huevos y estadios ninfales tempranos.'
  },
  {
    id: 'sharpei_me',
    tradeName: 'Sharpei 250 ME',
    category: 'INSECTICIDA',
    activeIngredient: 'Cipermetrina 250 g/L',
    formulation: 'Microemulsión (ME)',
    chemicalGroup: 'Piretroides tipo II',
    moaCode: 'IRAC 3A',
    targetPests: [
      'Spodoptera spp.',
      'Anticarsia gemmatalis',
      'Mocis latipes (Gusano medidor de pastos)',
      'Salivazo / Mión de los pastos (ninfas y adultos)',
      'Chinches y saltahojas'
    ],
    targetCrops: ['Pastos y Forrajes', 'Maíz', 'Arroz', 'Soya', 'Frutales'],
    standardDose: '150 - 250 cc/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Formulación ME basada en agua con menor irritabilidad, nulo solvente aromático nocivo y superior persistencia solar.',
    keyFeatures: 'Rápido derribe y expulsión ("Flushing effect") de plagas ocultas en el follaje o en la base de la macolla.'
  },
  {
    id: 'mamut_ec',
    tradeName: 'Mamut 18 EC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Abamectina 18 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Avermectinas',
    moaCode: 'IRAC 6 (Activador de canales de cloruro)',
    targetPests: [
      'Tetranychus urticae (Arañita roja)',
      'Polyphagotarsonemus latus (Ácaro blanco)',
      'Liriomyza huidobrensis (Minador de la hoja)',
      'Trips (formas móviles)',
      'Eotetranychus spp.'
    ],
    targetCrops: ['Flores (Rosa, Clavel)', 'Aguacate', 'Tomate', 'Cítricos', 'Papa', 'Fresa'],
    standardDose: '0.4 - 0.6 cc/L de agua (200 - 300 cc/ha)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Aplicar SIEMPRE con Avgust Star (0.5 cc/L) para asegurar absorción translaminar y formación de reservorio en el mesófilo.',
    keyFeatures: 'Penetra rápidamente la cutícula de la hoja y se almacena en el parénquima foliar, brindando control residual de ácaros por semanas.'
  },
  {
    id: 'beretta_ec',
    tradeName: 'Beretta 100 EC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Bifentrina 100 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Piretroides',
    moaCode: 'IRAC 3A',
    targetPests: [
      'Heilipus lauri / Stenoma catenifer (Barrenadores del aguacate)',
      'Cosmopolites sordidus (Picudo negro del banano)',
      'Ácaros fitófagos',
      'Trips y Mosca blanca',
      'Collaria scenica (Chinche de los pastos)'
    ],
    targetCrops: ['Aguacate', 'Banano y Plátano', 'Pastos', 'Flores', 'Maíz', 'Tomate'],
    standardDose: '0.5 - 0.8 cc/L de agua (300 - 500 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'El piretroide con mayor efecto acaricida y persistencia en climas cálidos y lluviosos.',
    keyFeatures: 'Potente acción insecticida y acaricida simultánea con prolongado poder residual y efecto disuasivo de alimentación.'
  },
  {
    id: 'asil_200',
    tradeName: 'Asil 200 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Fipronil 200 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Fenilpirazoles',
    moaCode: 'IRAC 2B (Bloqueador de canales de cloruro GABA)',
    targetPests: [
      'Atta spp. / Acromyrmex spp. (Hormiga arriera)',
      'Premnotrypes vorax (Gusano blanco de la papa)',
      'Cosmopolites sordidus (Picudo negro)',
      'Termitas y plagas del suelo',
      'Trips resistentes'
    ],
    targetCrops: ['Papa', 'Banano', 'Flores', 'Caña de azúcar', 'Pastos'],
    standardDose: '0.3 - 0.5 L/ha (0.4 - 0.6 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Aplicación dirigida al suelo, cuello de raíz o cebaderos específicos según la plaga diana.',
    keyFeatures: 'Efecto dominó ("Transfer effect"): los insectos contaminados transmiten la dosis letal a sus congéneres en el nido o colonia.'
  },
  {
    id: 'gladiador_ec',
    tradeName: 'Gladiador 480 EC',
    category: 'INSECTICIDA',
    activeIngredient: 'Clorpirifos 480 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Organofosforados',
    moaCode: 'IRAC 1B',
    targetPests: [
      'Gusanos trozadores y tierreros (Agrotis spp., Feltia spp.)',
      'Cosmopolites sordidus (Picudo negro en deshoje)',
      'Barrenador del tallo',
      'Escamas y cochinillas'
    ],
    targetCrops: ['Banano', 'Maíz', 'Arroz', 'Papa', 'Pastos'],
    standardDose: '1.0 - 1.5 L/ha',
    reEntryPeriodHours: 48,
    preHarvestIntervalDays: 21,
    compatibilityTips: 'Acción por contacto, ingestión e inhalación por fase de vapor en la superficie del suelo.',
    keyFeatures: 'Fuerte fase gaseosa que alcanza plagas refugiadas debajo de terrones, rastrojos o en la base del tallo.'
  },
  {
    id: 'aliado_sc',
    tradeName: 'Aliado 247 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Tiametoxam 141 g/L + Lambda-cihalotrina 106 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Neonicotinoides + Piretroides',
    moaCode: 'IRAC 4A + 3A',
    targetPests: [
      'Bemisia tabaci',
      'Thrips palmi',
      'Spodoptera frugiperda',
      'Chinches y saltahojas',
      'Epitrix spp.'
    ],
    targetCrops: ['Tomate', 'Papa', 'Arroz', 'Maíz', 'Flores', 'Aguacate'],
    standardDose: '200 - 300 cc/ha (0.4 - 0.5 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Eficaz en aplicaciones foliares y en drench al cuello de la raíz para control sistémico temprano.',
    keyFeatures: 'Rápido derribe y absorción xilemática acrópeta con estímulo de vigor vegetativo en las plántulas tratadas.'
  },
  {
    id: 'tsunami_ec',
    tradeName: 'Tsunami 100 EC',
    category: 'INSECTICIDA',
    activeIngredient: 'Lambda-cihalotrina 100 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Piretroides',
    moaCode: 'IRAC 3A',
    targetPests: [
      'Gusanos comedores de hoja y cogolleros',
      'Pulgones y trips',
      'Chinches de la panoja y espiga',
      'Falsos medidores'
    ],
    targetCrops: ['Arroz', 'Maíz', 'Papa', 'Hortalizas', 'Pastos'],
    standardDose: '100 - 200 cc/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Insecticida de amplio espectro para choque rápido; usar boquillas que generen gotas medianas para evitar deriva.',
    keyFeatures: 'Gran poder de choque por contacto con persistente repelencia que evita la reinfestación inmediata.'
  },
  {
    id: 'tanrek_wsc',
    tradeName: 'Tanrek 200 WSC',
    category: 'INSECTICIDA',
    activeIngredient: 'Imidacloprid 200 g/L',
    formulation: 'Concentrado Soluble en Agua (WSC)',
    chemicalGroup: 'Neonicotinoides',
    moaCode: 'IRAC 4A',
    targetPests: [
      'Pulgones (Aphididae)',
      'Mosca blanca (ninfas y adultos)',
      'Trips',
      'Minadores y cigarrillas'
    ],
    targetCrops: ['Papa', 'Tomate', 'Flores', 'Cítricos', 'Frutales', 'Tabaco'],
    standardDose: '0.3 - 0.5 cc/L de agua (200 - 300 cc/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Excelente para aplicaciones en el agua de riego (fertirriego) o drench al momento del trasplante.',
    keyFeatures: 'Sistémico acrópeto por excelencia, distribuyéndose uniformemente desde la raíz hasta los brotes más tiernos.'
  },

  // =========================================================================
  // --- 3. HERBICIDAS AVGUST CROP PROTECTION ---
  // =========================================================================
  {
    id: 'miura_ec',
    tradeName: 'Miura EC',
    category: 'HERBICIDA',
    activeIngredient: 'Quizalofop-P-tefuril 125 g/L / Quizalofop-P-etil 125 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Ariloxifenoxipropionatos (FOPs)',
    moaCode: 'HRAC 1 (Inhibidor ACCasa)',
    targetPests: [
      'Echinochloa colona / Echinochloa crus-galli (Liendrepuerco)',
      'Digitaria sanguinalis (Guarda rocío)',
      'Eleusine indica (Pata de gallina)',
      'Cynodon dactylon (Pasto bermuda)',
      'Rottboellia cochinchinensis (Caminadora)',
      'Pennisetum clandestinum (Kikuyo)'
    ],
    targetCrops: ['Papa', 'Tomate', 'Hortalizas', 'Flores', 'Soya', 'Frutales (Aguacate, Cítricos)', 'Algodón'],
    standardDose: '0.6 - 1.0 L/ha (0.8 - 1.0 cc/L de agua con Avgust Star)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Aplicar con malezas gramíneas activas de 2 a 4 hojas con adecuada humedad en el suelo.',
    keyFeatures: 'Graminicida altamente selectivo a cultivos de hoja ancha con rápida translocación hacia rizomas, estolones y meristemos de crecimiento.'
  },
  {
    id: 'pilot_ec',
    tradeName: 'Pilot 50 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Quizalofop-P-etil 50 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Ariloxifenoxipropionatos',
    moaCode: 'HRAC 1',
    targetPests: [
      'Gramíneas anuales y perennes en post-emergencia',
      'Setaria spp.',
      'Sorghum halepense (Pasto Johnson)',
      'Avena fatua'
    ],
    targetCrops: ['Remolacha', 'Soya', 'Girasol', 'Leguminosas', 'Hortalizas'],
    standardDose: '1.0 - 2.0 L/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Puede mezclarse con herbicidas de hoja ancha respetando las recomendaciones técnicas de compatibilidad.',
    keyFeatures: 'Control eficaz de gramíneas problema sin ningún síntoma de fitotoxicidad en el cultivo de hoja ancha.'
  },
  {
    id: 'afinnex_400',
    tradeName: 'Afinnex 400 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Carfentrazona-etilo 400 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Triazolinonas (PPO)',
    moaCode: 'HRAC 14 (Inhibidor PPO)',
    targetPests: [
      'Commelina diffusa (Siempre viva / Canutillo)',
      'Ipomoea spp. (Campanilla)',
      'Bidens pilosa (Chipaca)',
      'Portulaca oleracea (Verdolaga)',
      'Desecación pre-cosecha de follaje en papa'
    ],
    targetCrops: ['Papa (Desecante)', 'Arroz', 'Caña de azúcar', 'Maíz (Dirigido)', 'Cítricos'],
    standardDose: '50 - 100 cc/ha (0.2 cc/L de agua)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Potencializa mezclas con glifosato (Brounter) para control de malezas de hoja ancha tolerantes o leñosas.',
    keyFeatures: 'Efecto quemante ultrarrápido visible a las 24 horas sin dejar residuos en el suelo.'
  },
  {
    id: 'akiro_480',
    tradeName: 'Akiro 480 SL',
    category: 'HERBICIDA',
    activeIngredient: '2,4-D Sal Dimetilamina 480 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Fenoxicarboxílicos',
    moaCode: 'HRAC 4 (Auxinas sintéticas)',
    targetPests: [
      'Malezas de hoja ancha herbáceas y semiarbustivas',
      'Amaranthus dubius (Bledo)',
      'Sida acuta (Escoba)',
      'Caperonia palustris'
    ],
    targetCrops: ['Arroz', 'Caña de azúcar', 'Pastos de clima cálido y frío'],
    standardDose: '1.5 - 2.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Baja volatilidad gracias a su sal amina, reduciendo el riesgo de deriva a cultivos vecinos sensibles.',
    keyFeatures: 'Herbicida hormonal selectivo a gramíneas comerciales con potente traslocación sistémica hacia raíces.'
  },
  {
    id: 'akiro_720',
    tradeName: 'Akiro 720 SL',
    category: 'HERBICIDA',
    activeIngredient: '2,4-D Sal Dimetilamina 720 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Fenoxicarboxílicos',
    moaCode: 'HRAC 4',
    targetPests: [
      'Malezas de hoja ancha leñosas y perennes en potreros',
      'Mimosa pudica (Dormidera)',
      'Cassia tora',
      'Malezas de difícil control en potreros'
    ],
    targetCrops: ['Potreros y Pasturas', 'Caña de azúcar'],
    standardDose: '1.0 - 2.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Usar boquillas antideriva de inducción de aire (AI) para evitar vapores hacia lotes colindantes.',
    keyFeatures: 'Alta concentración de ingrediente activo para máximo rendimiento por hectárea en potreros ganaderos.'
  },
  {
    id: 'baikal_100',
    tradeName: 'Baikal 100 SC',
    category: 'HERBICIDA',
    activeIngredient: 'Bispiribac-Sodio 100 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Pirimidinilbenzoatos (ALS)',
    moaCode: 'HRAC 2 (Inhibidor ALS)',
    targetPests: [
      'Echinochloa crus-pavonis / Echinochloa colona',
      'Cyperus difformis / Cyperus iria (Ciperáceas)',
      'Sphenoclea zeylanica',
      'Heteranthera reniformis'
    ],
    targetCrops: ['Arroz (Riego y Secano favorecido)'],
    standardDose: '250 - 300 cc/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Aplicar siempre con coadyuvante organosiliconado Avgust Star cuando las malezas tengan de 2 a 4 hojas.',
    keyFeatures: 'Control simultáneo de gramíneas, ciperáceas y hojas anchas con amplia ventana de aplicación en arroz.'
  },
  {
    id: 'berkut_480',
    tradeName: 'Berkut 480 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Bentazona 480 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Benzotiadiazinonas',
    moaCode: 'HRAC 6 (Fotosistema II)',
    targetPests: [
      'Cyperus esculentus / Cyperus rotundus (Cocos / Coquitos)',
      'Commelina diffusa',
      'Sphenoclea zeylanica',
      'Eclipta alba'
    ],
    targetCrops: ['Arroz', 'Frijol', 'Soya', 'Maíz'],
    standardDose: '1.5 - 2.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 45,
    compatibilityTips: 'Herbicida de contacto; requiere excelente cobertura de pulverización (mínimo 60-70 gotas/cm²).',
    keyFeatures: 'El especialista post-emergente para el control selectivo y quema de coquitos (Cyperus) en arroz y leguminosas.'
  },
  {
    id: 'bold_180',
    tradeName: 'Bold 180 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Cihalofop-Butilo 180 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Ariloxifenoxipropionato',
    moaCode: 'HRAC 1',
    targetPests: [
      'Echinochloa spp. (Liendrepuerco)',
      'Leptochloa filiformis (Paja mona)',
      'Digitaria spp.'
    ],
    targetCrops: ['Arroz (Riego y Secano)'],
    standardDose: '1.2 - 1.5 L/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'No mezclar con herbicidas hormonales como 2,4-D en la misma aplicación para evitar antagonismo.',
    keyFeatures: 'Máxima selectividad en cualquier estado fenológico del cultivo de arroz sin causar retrasos vegetativos ni clorosis.'
  },
  {
    id: 'brounter_757',
    tradeName: 'Brounter 757 WG',
    category: 'HERBICIDA',
    activeIngredient: 'Glifosato Sal Monoamónica 757 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Glicinas',
    moaCode: 'HRAC 9 (Inhibidor EPSPS)',
    targetPests: [
      'Malezas gramíneas y de hoja ancha anuales y perennes',
      'Paspalum notatum / Paspalum virgatum',
      'Kikuyo (Pennisetum clandestinum)',
      'Limpieza general pre-siembra y entrecalles'
    ],
    targetCrops: ['Cero labranza / Pre-siembra', 'Frutales y Café (Aplicación dirigida)', 'Palma de aceite'],
    standardDose: '1.0 - 2.0 kg/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Usar agua con pH regulado entre 4.5 y 5.5 con Avgust Fix para evitar inactivación por sales de calcio.',
    keyFeatures: 'Gránulos secos de disolución instantánea, sin polvo, menor peso de transporte y absorción sistémica total.'
  },
  {
    id: 'brounter_480',
    tradeName: 'Brounter 480 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Glifosato Sal Isopropilamina 480 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Glicinas',
    moaCode: 'HRAC 9',
    targetPests: [
      'Malezas anuales y perennes de hoja ancha y gramíneas',
      'Control de malezas en barbechos y plateo dirigido en café y frutales'
    ],
    targetCrops: ['Café', 'Aguacate', 'Cítricos', 'Palma', 'Barbecho químico'],
    standardDose: '2.0 - 3.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'No aplicar sobre hojas o partes verdes del cultivo leñoso; usar pantallas antideriva.',
    keyFeatures: 'Penetración foliar y traslocación sistémica hacia yemas subterráneas, tubérculos y rizomas de malezas perennes.'
  },
  {
    id: 'cane_500',
    tradeName: 'Cane 500 SC',
    category: 'HERBICIDA',
    activeIngredient: 'Ametrina 500 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazinas',
    moaCode: 'HRAC 5',
    targetPests: [
      'Rottboellia exaltata',
      'Panicum maximum',
      'Ipomoea spp.',
      'Sorghum halepense de semilla'
    ],
    targetCrops: ['Caña de azúcar', 'Maíz (Dirigido)', 'Cítricos', 'Plátano'],
    standardDose: '2.0 - 3.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Se puede mezclar con atrazina o diurón para ampliar el espectro residual en caña de azúcar.',
    keyFeatures: 'Eficacia pre-emergente y post-emergente temprana con prolongado control residual en el banco de semillas.'
  },
  {
    id: 'dublin_500',
    tradeName: 'Dublin 500 SC',
    category: 'HERBICIDA',
    activeIngredient: 'Atrazina 500 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazinas',
    moaCode: 'HRAC 5',
    targetPests: [
      'Malezas de hoja ancha y gramíneas anuales',
      'Amaranthus spp.',
      'Bidens pilosa',
      'Portulaca oleracea'
    ],
    targetCrops: ['Maíz', 'Sorgo', 'Caña de azúcar'],
    standardDose: '2.0 - 4.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Aplicar preferiblemente en pre-emergencia o post-emergencia temprana con suelo húmedo.',
    keyFeatures: 'Excelente selectividad fisiológica en maíz y sorgo con acción residual de amplio espectro en el suelo.'
  },
  {
    id: 'tornado_500',
    tradeName: 'Tornado 500 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Glifosato Sal Isopropilamina 500 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Glicinas',
    moaCode: 'HRAC 9',
    targetPests: [
      'Control total de malezas monocotiledóneas y dicotiledóneas',
      'Renovación de praderas y áreas no cultivadas'
    ],
    targetCrops: ['Cero labranza', 'Plateo en frutales', 'Renovación de pastos'],
    standardDose: '2.0 - 3.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Formulación con surfactantes premium integrados para rápida fijación en la cutícula cerosa.',
    keyFeatures: 'Traslocación total vía floema que anula la brotación de raíces y rizomas rebeldes.'
  },
  {
    id: 'alsyon_750',
    tradeName: 'Alsyon 750 WG',
    category: 'HERBICIDA',
    activeIngredient: 'Tifensulfuron-metil 750 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Sulfonilureas',
    moaCode: 'HRAC 2 (Inhibidor ALS)',
    targetPests: [
      'Malezas de hoja ancha anuales',
      'Chenopodium album',
      'Polygonum spp.',
      'Sinapis arvensis'
    ],
    targetCrops: ['Soya', 'Cereales (Trigo, Cebada)', 'Maíz'],
    standardDose: '15 - 25 g/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 45,
    compatibilityTips: 'Dosis ultrabaja por hectárea con rápida degradación en el suelo, permitiendo rotación libre de cultivos.',
    keyFeatures: 'Inhibe la acetolactato sintasa deteniendo la división celular en las puntas de crecimiento de las malezas.'
  },
  {
    id: 'balerina_se',
    tradeName: 'Balerina Herbicida SE',
    category: 'HERBICIDA',
    activeIngredient: 'Florasulam 7.4 g/L + 2,4-D (2-etilhexil éster) 410 g/L',
    formulation: 'Suspo-Emulsión (SE)',
    chemicalGroup: 'Triazolopirimidinas + Fenoxiacéticos',
    moaCode: 'HRAC 2 + 4',
    targetPests: [
      'Galeopsis tetrahit',
      'Galium aparine',
      'Matricaria spp.',
      'Stellaria media',
      'Amaranthus spp.'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Cereales de grano pequeño'],
    standardDose: '0.3 - 0.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Eficaz incluso a bajas temperaturas de aplicación en primavera temprana u otoño (desde 5°C).',
    keyFeatures: 'Sinergia de doble acción que erradica malezas difíciles de hoja ancha sin afectar el macollamiento del cereal.'
  },
  {
    id: 'biceps_22',
    tradeName: 'Biceps 22 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Desmedifam 71 g/L + Fenmedifam 91 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Bis-carbamatos',
    moaCode: 'HRAC 5',
    targetPests: [
      'Malezas dicotiledóneas anuales en post-emergencia temprana',
      'Chenopodium spp.',
      'Amaranthus spp.',
      'Solanum nigrum'
    ],
    targetCrops: ['Remolacha azucarera y forrajera'],
    standardDose: '1.0 - 1.5 L/ha en aplicaciones fraccionadas',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Aplicar en post-emergencia fraccionada sobre malezas cotiledonares para máxima selectividad al cultivo.',
    keyFeatures: 'Selectividad fisiológica insuperable en remolacha con control de choque fotosintético.'
  },
  {
    id: 'biolan_super',
    tradeName: 'Biolan Super SL',
    category: 'HERBICIDA',
    activeIngredient: '2,4-D ácido 344 g/L + Dicamba 120 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Fenoxicarboxílicos + Benzoicos',
    moaCode: 'HRAC 4 + 4',
    targetPests: [
      'Malezas de hoja ancha perennes y resistentes',
      'Cirsium arvense',
      'Convolvulus arvensis',
      'Sonchus arvensis'
    ],
    targetCrops: ['Cereales', 'Maíz', 'Pastizales y Potreros'],
    standardDose: '0.6 - 0.8 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Doble auxina sintética con absorción foliar y radicular para erradicación de malezas con raíz profunda.',
    keyFeatures: 'Elimina el banco vegetativo subterráneo impidiendo el rebrote de malezas leñosas invasoras.'
  },
  {
    id: 'bomba_wg',
    tradeName: 'Bomba WG',
    category: 'HERBICIDA',
    activeIngredient: 'Tribenuron-metil 500 g/kg + Florasulam 104 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Sulfonilureas + Triazolopirimidinas',
    moaCode: 'HRAC 2 + 2',
    targetPests: [
      'Amplio espectro de malezas dicotiledóneas anuales y perennes',
      'Cirsium arvense',
      'Papaver rhoeas',
      'Viola arvensis'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Avena'],
    standardDose: '20 - 30 g/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Excelente solubilidad y dispersión homogénea en tanque sin formar grumos.',
    keyFeatures: 'Eficacia a ultra-bajas dosis con control simultáneo de malezas crucíferas y compuestas.'
  },
  {
    id: 'fabis_sl',
    tradeName: 'Fabis 40 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Imazamox 40 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Imidazolinonas',
    moaCode: 'HRAC 2 (Inhibidor ALS)',
    targetPests: [
      'Malezas gramíneas y de hoja ancha anuales',
      'Echinochloa spp.',
      'Amaranthus spp.',
      'Solanum spp.'
    ],
    targetCrops: ['Soya', 'Leguminosas (Arveja, Frijol)', 'Girasol resistente a IMI'],
    standardDose: '0.75 - 1.0 L/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Absorbido tanto por hojas como por raíces; mantener buena humedad para activación en suelo.',
    keyFeatures: 'Brinda selectividad en leguminosas con efecto residual que impide segundas oleadas de malezas.'
  },
  {
    id: 'gaitan_sc',
    tradeName: 'Gaitan 400 SC',
    category: 'HERBICIDA',
    activeIngredient: 'Pendimetalina 400 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Dinitroanilinas',
    moaCode: 'HRAC 3 (Inhibidor de ensamblaje de microtúbulos)',
    targetPests: [
      'Malezas gramíneas y de hoja ancha en germinación',
      'Digitaria spp.',
      'Eleusine indica',
      'Portulaca oleracea',
      'Amaranthus spp.'
    ],
    targetCrops: ['Arroz', 'Maíz', 'Papa', 'Cebolla', 'Flores', 'Algodón', 'Soya'],
    standardDose: '2.5 - 3.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Herbicida pre-emergente por excelencia; aplicar sobre suelo bien mullido y húmedo tras la siembra.',
    keyFeatures: 'Forma un sello herbicida superficial continuo que impide la emergencia del coleóptilo de las malezas.'
  },
  {
    id: 'demetr_ec',
    tradeName: 'Demetr 350 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Fluroxipir 350 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Ácidos Piridincarboxílicos',
    moaCode: 'HRAC 4',
    targetPests: [
      'Galium aparine',
      'Convolvulus arvensis',
      'Calystegia sepium',
      'Rumex spp.',
      'Malezas leñosas rastreras'
    ],
    targetCrops: ['Cereales', 'Maíz', 'Cebolla', 'Pastizales'],
    standardDose: '0.3 - 0.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Especialista en control de enredaderas y malezas trepadoras que dificultan la cosecha mecánica.',
    keyFeatures: 'Rápida absorción foliar con síntomas de epinastia y desecación irreversible en hojas y tallos.'
  },
  {
    id: 'galion_sl',
    tradeName: 'Galion 375 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Clopiralid 300 g/L + Picloram 75 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Piridincarboxílicos',
    moaCode: 'HRAC 4 + 4',
    targetPests: [
      'Malezas leñosas y semi-arbustivas perennes en potreros',
      'Cardos y compuestas rebeldes',
      'Artemisia spp.',
      'Leguminosas invasoras de pastos'
    ],
    targetCrops: ['Potreros y Pasturas', 'Colza / Canola'],
    standardDose: '0.2 - 0.35 L/ha en colza (1.0 - 2.0 L/ha en potreros)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'No sembrar leguminosas en los lotes tratados hasta pasados 12 meses por efecto residual benéfico en potreros.',
    keyFeatures: 'Erradicación de raíz de malezas leñosas de espina y matorrales invasores en pasturas ganaderas.'
  },
  {
    id: 'magnum_wg',
    tradeName: 'Magnum 60 WG',
    category: 'HERBICIDA',
    activeIngredient: 'Metsulfuron-metil 600 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Sulfonilureas',
    moaCode: 'HRAC 2 (Inhibidor ALS)',
    targetPests: [
      'Malezas de hoja ancha leñosas y herbáceas en potreros',
      'Pteridium aquilinum (Helecho marranero)',
      'Escoba (Sida acuta)',
      'Urtica urens'
    ],
    targetCrops: ['Pastos y Potreros', 'Arroz (Variedades tolerantes)', 'Cereales'],
    standardDose: '10 - 20 g/ha en potreros',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Aplicar siempre con coadyuvante Avgust Star para romper la cutícula coriácea del helecho marranero.',
    keyFeatures: 'Eficacia demoledora contra helechos y malezas de difícil erradicación con mínimas dosis por hectárea.'
  },
  {
    id: 'cordus_wg',
    tradeName: 'Cordus 75 WG',
    category: 'HERBICIDA',
    activeIngredient: 'Rimsulfuron 250 g/kg + Nicosulfuron 500 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Sulfonilureas dobles',
    moaCode: 'HRAC 2 + 2',
    targetPests: [
      'Echinochloa crus-galli',
      'Sorghum halepense',
      'Elytrigia repens',
      'Amaranthus spp.',
      'Chenopodium spp.'
    ],
    targetCrops: ['Maíz (Grano y Silo)'],
    standardDose: '30 - 45 g/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Aplicar entre 2 y 6 hojas del cultivo de maíz con malezas en crecimiento activo.',
    keyFeatures: 'Doble sulfonilurea con espectro cruzado completo sobre gramíneas y hojas anchas en post-emergencia de maíz.'
  },
  {
    id: 'lazurit_wp',
    tradeName: 'Lazurit 700 WP',
    category: 'HERBICIDA',
    activeIngredient: 'Metribuzin 700 g/kg',
    formulation: 'Polvo Mojable (WP)',
    chemicalGroup: 'Triazinonas',
    moaCode: 'HRAC 5 (Fotosistema II)',
    targetPests: [
      'Malezas anuales de hoja ancha y gramíneas',
      'Chenopodium album',
      'Solanum nigrum',
      'Digitaria spp.',
      'Poa annua'
    ],
    targetCrops: ['Papa', 'Tomate', 'Soya', 'Zanahoria', 'Caña de azúcar'],
    standardDose: '0.7 - 1.4 kg/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Aplicar en pre-emergencia de la papa o tras el aporque antes de que las malezas superen 5 cm.',
    keyFeatures: 'Potente actividad radicular y foliar que mantiene los surcos de papa libres de malezas durante el periodo crítico.'
  },
  {
    id: 'quick_sl',
    tradeName: 'Quick 200 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Glufosinato de Amonio 200 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Fosfínicos',
    moaCode: 'HRAC 10 (Inhibidor de glutamina sintetasa)',
    targetPests: [
      'Malezas gramíneas y de hoja ancha resistentes a glifosato',
      'Conyza bonariensis (Rama negra)',
      'Eleusine indica resistente',
      'Amaranthus palmeri resistente',
      'Desecación y limpieza de entrecalles'
    ],
    targetCrops: ['Café', 'Aguacate', 'Cítricos', 'Palma', 'Maíz tolerante a glufosinato'],
    standardDose: '1.5 - 2.5 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Herbicida de contacto con leve acción sistémica; aplicar en días soleados y con buena humedad relativa.',
    keyFeatures: 'Inhibe la glutamina sintetasa acumulando iones de amonio tóxicos que colapsan las células de la maleza en 48 horas.'
  },

  // =========================================================================
  // --- 4. TRATAMIENTO DE SEMILLAS AVGUST (CURASEMILLAS) ---
  // =========================================================================
  {
    id: 'vial_trio',
    tradeName: 'Vial Trio SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Ciproconazol 30 g/L + Tiabendazol 30 g/L + Procloraz 120 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC/FS)',
    chemicalGroup: 'Triazoles + Benzimidazoles + Imidazoles',
    moaCode: 'FRAC 3 + 1 + 3',
    targetPests: [
      'Ustilago tritici / Tilletia caries (Carbones)',
      'Fusarium spp. (Pudrición del grano y raíz)',
      'Helminthosporium gramineum',
      'Septoria nodorum',
      'Rhizoctonia solani'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Avena', 'Centeno', 'Arroz'],
    standardDose: '0.8 - 1.2 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Adherente y colorante rojo de seguridad incorporado que no altera la fluidez en sembradoras neumáticas.',
    keyFeatures: 'Triple acción fungicida que desinfecta la superficie externa de la semilla y penetra el embrión contra infecciones profundas.'
  },
  {
    id: 'vial_tt',
    tradeName: 'Vial TT SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Tiram 333 g/L + Tebuconazol 45 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Ditiocarbamatos + Triazoles',
    moaCode: 'FRAC M07 + 3',
    targetPests: [
      'Damping-off (Pythium, Rhizoctonia, Fusarium)',
      'Carbón volador y carbón cubierto',
      'Mohos de almacén en granos'
    ],
    targetCrops: ['Cereales', 'Maíz', 'Girasol', 'Leguminosas'],
    standardDose: '1.0 - 1.5 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Proteger la semilla tratada de la humedad y radiación directa antes de la siembra.',
    keyFeatures: 'Excelente relación costo-beneficio para asegurar el stand inicial de plantas y vigor de emergencia.'
  },
  {
    id: 'tercia_sc',
    tradeName: 'Tercia SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Procloraz 120 g/L + Triticonazol 20 g/L + Azoxistrobina 10 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Imidazoles + Triazoles + Estrobirulinas',
    moaCode: 'FRAC 3 + 3 + 11',
    targetPests: [
      'Fusariosis y mal del pie en cereales',
      'Microdochium nivale (Moho de las nieves)',
      'Bipolaris sorokiniana',
      'Carbón de la espiga'
    ],
    targetCrops: ['Trigo de invierno y primavera', 'Cebada'],
    standardDose: '2.0 - 2.5 L/tonelada',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Proporciona una zona de protección ("rizosfera protegida") alrededor de la plántula emergente.',
    keyFeatures: 'Estimula el desarrollo del sistema radicular primario e incrementa el número de macollas productivas.'
  },
  {
    id: 'oplot_me',
    tradeName: 'Oplot ME',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Difenoconazol 90 g/L + Tebuconazol 45 g/L',
    formulation: 'Microemulsión para Tratamiento de Semillas (ME)',
    chemicalGroup: 'Triazoles dobles',
    moaCode: 'FRAC 3 + 3',
    targetPests: [
      'Tilletia spp. (Carbón apestoso)',
      'Ustilago spp.',
      'Fusarium culmorum',
      'Helminthosporium sativum'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Soya', 'Cereales'],
    standardDose: '0.4 - 0.6 L/tonelada',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'La formulación en microemulsión garantiza la distribución uniforme de cada gota sobre la cáscara del grano.',
    keyFeatures: 'Máxima penetración en el pericarpio y embrión sin mermar el poder germinativo en semillas almacenadas.'
  },
  {
    id: 'tabu_sc',
    tradeName: 'Tabu 500 SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Imidacloprid 500 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Neonicotinoides',
    moaCode: 'IRAC 4A',
    targetPests: [
      'Gusanos de alambre (Agriotes spp.)',
      'Pulgillas de la col y remolacha (Phyllotreta spp.)',
      'Áfidos y vectores tempranos de virosis',
      'Gusano trozador y plagas del suelo'
    ],
    targetCrops: ['Papa (Tubérculo-semilla)', 'Maíz', 'Girasol', 'Cereales', 'Remolacha'],
    standardDose: '0.3 - 0.4 L/tonelada de tubérculo o 5 - 8 L/tonelada de semilla de maíz',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Puede aplicarse directamente sobre el tubérculo-semilla de papa en la tolva de siembra.',
    keyFeatures: 'Protección sistémica completa de plántulas durante los primeros 45 días contra insectos chupadores y cortadores.'
  },
  {
    id: 'tabu_neo',
    tradeName: 'Tabu Neo SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Imidacloprid 400 g/L + Clotianidina 100 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Neonicotinoides dobles',
    moaCode: 'IRAC 4A + 4A',
    targetPests: [
      'Premnotrypes vorax (Gusano blanco)',
      'Gusanos de alambre',
      'Gallina ciega / Chisas (Phyllophaga spp.)',
      'Pulgones vectores'
    ],
    targetCrops: ['Papa', 'Maíz', 'Soya', 'Cereales'],
    standardDose: '0.3 - 0.5 L/tonelada de tubérculo-semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Crea una barrera insecticida mortal alrededor de la semilla en germinación.',
    keyFeatures: 'Doble neonicotinoide con traslocación acrópeta continua hacia las primeras hojas verdaderas.'
  },
  {
    id: 'tabu_super',
    tradeName: 'Tabu Super SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Imidacloprid 400 g/L + Fipronil 100 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Neonicotinoides + Fenilpirazoles',
    moaCode: 'IRAC 4A + 2B',
    targetPests: [
      'Gusano de alambre y trozadores de raíz',
      'Chisas y cucarrones de mayo (Melolonthidae)',
      'Termitas de la semilla',
      'Minadores y saltahojas tempranos'
    ],
    targetCrops: ['Maíz', 'Girasol', 'Soya', 'Papa', 'Cereales'],
    standardDose: '4.0 - 6.0 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Combina repelencia en suelo con sistemia foliar total.',
    keyFeatures: 'Máxima protección contra plagas subterráneas de alta agresividad que diezman poblaciones en siembra directa.'
  },
  {
    id: 'hat_trick_sc',
    tradeName: 'Hat-Trick SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Tebuconazol 20 g/L + Difenoconazol 40 g/L + Imidacloprid 300 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Triazoles + Neonicotinoides',
    moaCode: 'FRAC 3 + 3 / IRAC 4A',
    targetPests: [
      'Fusariosis y carbones de semilla',
      'Gusanos trozadores y de alambre',
      'Pulgones transmisores de enanismo amarillo (BYDV)'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Cereales de grano'],
    standardDose: '1.0 - 1.2 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Solución "Todo en Uno": fungicida curativo e insecticida sistémico en un solo pase de tratamiento.',
    keyFeatures: 'Garantiza sanidad radicular y foliar simultánea durante las primeras etapas de implantación del cultivo.'
  },
  {
    id: 'idicum_sc',
    tradeName: 'Idicum SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Difenoconazol 40 g/L + Tebuconazol 20 g/L + O-Metil-protioconazol 20 g/L + Imidacloprid 300 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazolintionas + Triazoles + Neonicotinoides',
    moaCode: 'FRAC 3 + 3 + 3 / IRAC 4A',
    targetPests: [
      'Complejo fúngico de semilla y suelo (Fusarium, Bipolaris, Rhizoctonia, Pythium)',
      'Carbones y caries',
      'Plagas subterráneas y chupadoras tempranas'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Cereales de alto rendimiento'],
    standardDose: '1.0 - 1.3 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'La formulación más avanzada para campos de alta tecnología y semillas certificadas.',
    keyFeatures: 'Cuádruple ingrediente activo con protección insuperable frente al tizón de plántulas y vectores virales.'
  },
  {
    id: 'bunker_sc',
    tradeName: 'Bunker 60 SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Tebuconazol 60 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Triazoles',
    moaCode: 'FRAC 3',
    targetPests: [
      'Ustilago nuda (Carbón volador de la cebada y trigo)',
      'Tilletia caries',
      'Fusarium spp.'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Avena', 'Cereales'],
    standardDose: '0.4 - 0.5 L/tonelada de semilla',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Fungicida curasemilla sistémico de bajo costo y máxima efectividad contra carbones internos.',
    keyFeatures: 'Penetración rápida en la cariópside con desinfección total del embrión vegetal.'
  },
  {
    id: 'tirso_350',
    tradeName: 'Tirso 350 SC',
    category: 'TRATAMIENTO DE SEMILLAS',
    activeIngredient: 'Fludioxonil 25 g/L + Metalaxil-M 37.5 g/L + Azoxistrobina 15 g/L',
    formulation: 'Suspensión Concentrada para Semillas (SC)',
    chemicalGroup: 'Fenilpirroles + Acilalaninas + Estrobirulinas',
    moaCode: 'FRAC 12 + 4 + 11',
    targetPests: [
      'Damping-off y pudriciones radiculares (Pythium spp., Phytophthora spp., Rhizoctonia solani)',
      'Fusarium oxysporum',
      'Aspergillus y Penicillium en semilla'
    ],
    targetCrops: ['Maíz', 'Soya', 'Leguminosas', 'Papa', 'Algodón', 'Hortalizas'],
    standardDose: '1.0 - 2.0 cc/kg de semilla (1.0 - 2.0 L/tonelada)',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Provee cobertura integral de amplio espectro contra hongos ascomicetos, basidiomicetos y oomicetos de suelo.',
    keyFeatures: 'Seguro biológico de implantación que evita fallas en la germinación y resiembras costosas.'
  },

  // =========================================================================
  // --- 5. COADYUVANTES, ACONDICIONADORES Y BIOESTIMULANTES AVGUST ---
  // =========================================================================
  {
    id: 'avgust_star',
    tradeName: 'Avgust Star',
    category: 'COADYUVANTE',
    activeIngredient: 'Poliéter Polimetilsiloxano Copolímero 100%',
    formulation: 'Líquido Soluble (SL)',
    chemicalGroup: 'Organosiliconados Superspreaders',
    moaCode: 'Coadyuvante Agronómico',
    targetPests: [
      'Optimización de mojado, penetración estomática y ruptura de tensión superficial de caldos fitosanitarios'
    ],
    targetCrops: ['Todos los cultivos (Flores, Café, Aguacate, Papa, Banano, Arroz, Maíz, Tomate, Hortalizas, etc.)'],
    standardDose: '0.25 - 0.5 cc/L de agua (25 - 50 cc / 100 L de caldo)',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Agregar SIEMPRE al final de la mezcla (letra S en protocolo WALES) luego de disolver y emulsionar todos los fitosanitarios.',
    keyFeatures: 'Disminuye la tensión superficial del agua de 72 a menos de 22 dinas/cm, provocando un efecto superspreader inmediato que multiplica el área de contacto por 10 sin escurrimiento.'
  },
  {
    id: 'avgust_fix',
    tradeName: 'Avgust Fix / Buffer pH',
    category: 'ACONDICIONADOR / COADYUVANTE',
    activeIngredient: 'Ácido carboxílico + Polioxietilenos tensoactivos 500 g/L',
    formulation: 'Líquido Soluble (SL)',
    chemicalGroup: 'Acidificantes y Secuestrantes de Dureza',
    moaCode: 'Acondicionador de Agua',
    targetPests: [
      'Corrección de aguas duras y alcalinas, prevención de hidrólisis alcalina de insecticidas y fungicidas'
    ],
    targetCrops: ['Todos los cultivos'],
    standardDose: '0.5 - 1.0 cc/L de agua según dureza y pH inicial',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Agregar DE PRIMERO en el tanque antes de cualquier plaguicida (letra W en protocolo WALES).',
    keyFeatures: 'Regulador con viraje de color indicador colorimétrico: bloquea iones antagónicos de Ca++ y Mg++ y estabiliza el pH óptimo entre 5.5 y 6.2.'
  },
  {
    id: 'allur_ec',
    tradeName: 'Allur EC',
    category: 'COADYUVANTE',
    activeIngredient: 'Ésteres Metílicos de Aceite Vegetal (MSO) 850 g/L + Tensoactivos no iónicos 150 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Aceites Vegetales Metilados (MSO)',
    moaCode: 'Penetrante Cuticular y Antievaporante',
    targetPests: [
      'Facilitador de penetración foliar a través de cutículas cerosas gruesas y protector contra evaporación de gotas'
    ],
    targetCrops: ['Arroz', 'Soya', 'Maíz', 'Frutales', 'Potreros'],
    standardDose: '0.5 - 1.0 L/ha (0.5 - 1.0% v/v)',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Ideal para acompañar graminicidas (Miura EC, Bold 180 EC) y fungicidas sistémicos en épocas secas.',
    keyFeatures: 'Disuelve selectivamente la cera epicuticular de las malezas permitiendo la entrada directa del ingrediente activo.'
  },
  {
    id: 'galop_sl',
    tradeName: 'Galop SL',
    category: 'COADYUVANTE',
    activeIngredient: 'Polímeros Hidrocoloides Antideriva y Humectantes 300 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Polímeros Viscoelásticos',
    moaCode: 'Modificador de Patrón de Gota',
    targetPests: [
      'Eliminación de gotas satélites derivables (< 100 micras) y retención del caldo sobre la lámina foliar'
    ],
    targetCrops: ['Todos los cultivos'],
    standardDose: '0.2 - 0.4 cc/L de agua',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Recomendado en aplicaciones aéreas o terrestres con vientos moderados entre 5 y 12 km/h.',
    keyFeatures: 'Reduce la deriva hasta en un 80% al uniformar el espectro de gotas en tamaño óptimo de 200 a 350 micras.'
  },
  {
    id: 'adigor_ec',
    tradeName: 'Adigor EC',
    category: 'COADYUVANTE',
    activeIngredient: 'Ésteres metilados de ácidos grasos 47% + Tensoactivos etoxilados',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Aceites Metilados + Tensoactivos',
    moaCode: 'Activador Herbicida',
    targetPests: [
      'Potenciación de absorción foliar de herbicidas graminicidas y fungicidas de baja solubilidad'
    ],
    targetCrops: ['Arroz', 'Cereales', 'Soya', 'Maíz'],
    standardDose: '0.5 - 1.0 L/ha',
    reEntryPeriodHours: 0,
    preHarvestIntervalDays: 0,
    compatibilityTips: 'Emulsión lechosa instantánea y estable en aguas frías o con alto contenido mineral.',
    keyFeatures: 'Aumenta significativamente el tiempo de secado de la gota sobre la hoja impidiendo la cristalización del fitosanitario.'
  },

  // =========================================================================
  // --- 6. PRODUCTOS INTERNACIONALES ADICIONALES AVGUST CROP PROTECTION ---
  // =========================================================================
  {
    id: 'aliot_ec',
    tradeName: 'Aliot 570 EC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Malatión 570 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Organofosforados',
    moaCode: 'IRAC 1B',
    targetPests: [
      'Pulgones (Aphididae)',
      'Trips y Mosca blanca',
      'Gorgojos y escarabajos de hojas',
      'Ácaros fitófagos'
    ],
    targetCrops: ['Hortalizas', 'Frutales', 'Flores', 'Papa', 'Cereales'],
    standardDose: '1.0 - 1.5 cc/L de agua (1.0 - 2.0 L/ha)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Excelente para choque por contacto e inhalación. No mezclar con soluciones alcalinas fuertes.',
    keyFeatures: 'Inhibidor rápido de la acetilcolinesterasa con amplio espectro y bajo impacto residual en el suelo.'
  },
  {
    id: 'bakler_sc',
    tradeName: 'Bakler 375 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Ciprodinil 250 g/L + Fludioxonil 125 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Anilinopirimidinas + Fenilpirroles',
    moaCode: 'FRAC 9 + 12',
    targetPests: [
      'Botrytis cinerea (Moho gris)',
      'Monilia spp. (Pudrición morena)',
      'Sclerotinia sclerotiorum',
      'Alternaria spp.'
    ],
    targetCrops: ['Flores (Rosa, Clavel)', 'Frutales (Fresa, Uva, Durazno)', 'Tomate', 'Hortalizas'],
    standardDose: '0.6 - 0.8 cc/L de agua',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 3,
    compatibilityTips: 'Doble mecanismo de acción preventivo y curativo, ideal para rotar con Balerina SC y Kolosal Pro.',
    keyFeatures: 'Máxima eficacia contra cepas de Botrytis resistentes a benzimidazoles y dicarboximidas.'
  },
  {
    id: 'benorad_wp',
    tradeName: 'Benorad 500 WP',
    category: 'FUNGICIDA',
    activeIngredient: 'Benomil 500 g/kg',
    formulation: 'Polvo Mojable (WP)',
    chemicalGroup: 'Benzimidazoles (MBC)',
    moaCode: 'FRAC 1',
    targetPests: [
      'Oidio (Erysiphe spp.)',
      'Cercospora spp.',
      'Fusarium spp.',
      'Rhizoctonia solani',
      'Antracnosis'
    ],
    targetCrops: ['Flores', 'Arroz', 'Hortalizas', 'Frutales', 'Papa'],
    standardDose: '0.5 - 1.0 g/L de agua',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Fungicida sistémico que se trasloca acrópetamente. Usar con Avgust Star para optimizar fijación foliar.',
    keyFeatures: 'Inhibe la síntesis de tubulina celular bloqueando el crecimiento micelial y la formación de apresorios.'
  },
  {
    id: 'deimos_sl',
    tradeName: 'Deimos 480 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Dicamba Sal Dimetilamina 480 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Ácidos Benzoicos',
    moaCode: 'HRAC 4 (Auxinas sintéticas)',
    targetPests: [
      'Malezas de hoja ancha anuales y perennes difíciles',
      'Amaranthus spp. (Bledo)',
      'Ambrosia spp.',
      'Chenopodium album',
      'Cardos y enredaderas'
    ],
    targetCrops: ['Maíz', 'Trigo', 'Cebada', 'Pastos y Potreros'],
    standardDose: '0.3 - 0.6 L/ha en maíz (0.8 - 1.5 L/ha en potreros)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Aplicar con malezas pequeñas en activo crecimiento. Excelente en mezcla con atrazina (Dublin 500 SC).',
    keyFeatures: 'Potente translocación floemática y xilemática hasta los meristemos radiculares de malezas rebeldes.'
  },
  {
    id: 'eskudo_wg',
    tradeName: 'Eskudo 500 WG',
    category: 'HERBICIDA',
    activeIngredient: 'Rimsulfuron 500 g/kg',
    formulation: 'Gránulos Dispersables en Agua (WG)',
    chemicalGroup: 'Sulfonilureas',
    moaCode: 'HRAC 2 (Inhibidor ALS)',
    targetPests: [
      'Gramíneas anuales (Echinochloa spp., Setaria spp.)',
      'Sorghum halepense',
      'Solanum nigrum',
      'Amaranthus retroflexus'
    ],
    targetCrops: ['Maíz', 'Papa', 'Tomate'],
    standardDose: '25 - 50 g/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Aplicar siempre con coadyuvante organosiliconado Avgust Star a 0.25 cc/L para asegurar absorción estomática.',
    keyFeatures: 'Herbicida post-emergente altamente selectivo que no afecta el desarrollo radicular de la papa ni del maíz.'
  },
  {
    id: 'estet_ec',
    tradeName: 'Estet 905 EC',
    category: 'HERBICIDA',
    activeIngredient: '2,4-D (2-etilhexil éster) 905 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Ácidos Fenoxicarboxílicos',
    moaCode: 'HRAC 4',
    targetPests: [
      'Malezas de hoja ancha en cereales y potreros',
      'Cirsium arvense',
      'Sonchus arvensis',
      'Sinapis arvensis'
    ],
    targetCrops: ['Trigo', 'Cebada', 'Maíz', 'Pastizales'],
    standardDose: '0.6 - 1.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 30,
    compatibilityTips: 'Formulación éster de alta absorción cuticular incluso con clima fresco o rocío matinal.',
    keyFeatures: 'Mayor velocidad de penetración que las sales aminas, ideal para condiciones de lavado temprano por lluvias.'
  },
  {
    id: 'gerold_sc',
    tradeName: 'Gerold 240 SC',
    category: 'INSECTICIDA',
    activeIngredient: 'Diflubenzuron 240 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Benzoilureas (IGR)',
    moaCode: 'IRAC 15 (Inhibidor de quitina)',
    targetPests: [
      'Orugas defoliadoras (Lymantria dispar, Malacosoma spp.)',
      'Gusano cogollero (Spodoptera frugiperda)',
      'Carpocapsa (Cydia pomonella)',
      'Polilla de los brotes'
    ],
    targetCrops: ['Frutales', 'Maíz', 'Papa', 'Flores', 'Forestales'],
    standardDose: '0.2 - 0.4 L/ha (0.3 - 0.5 cc/L)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 14,
    compatibilityTips: 'Acción estrictamente estomacal por ingestión con efecto ovicida en puestas recientes. Seguro para abejas adultas.',
    keyFeatures: 'Impide la formación de la nueva cutícula durante la muda larvaria, provocando el estallido tegumentario.'
  },
  {
    id: 'kleshchevit_ec',
    tradeName: 'Kleshchevit 10 EC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Aversectina C 10 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Avermectinas Biológicas',
    moaCode: 'IRAC 6',
    targetPests: [
      'Tetranychus urticae (Arañita roja)',
      'Panonychus ulmi (Ácaro rojo europeo)',
      'Trips de invernadero',
      'Orugas masticadoras de hojas'
    ],
    targetCrops: ['Flores', 'Hortalizas de invernadero', 'Frutales', 'Fresa', 'Papa'],
    standardDose: '1.0 - 2.0 cc/L de agua',
    reEntryPeriodHours: 6,
    preHarvestIntervalDays: 2,
    compatibilityTips: 'Acaricida biológico de fermentación bacteriana (Streptomyces avermitilis). Tiempo de espera mínimo antes de cosecha.',
    keyFeatures: 'Efecto paralizante neuromuscular que detiene la alimentación de ácaros en 4 a 6 horas.'
  },
  {
    id: 'korsar_sl',
    tradeName: 'Korsar 480 SL',
    category: 'HERBICIDA',
    activeIngredient: 'Bentazona 480 g/L',
    formulation: 'Concentrado Soluble (SL)',
    chemicalGroup: 'Benzotiadiazinonas',
    moaCode: 'HRAC 6',
    targetPests: [
      'Cyperus spp. (Coquitos)',
      'Xanthium strumarium',
      'Matricaria chamomilla',
      'Stellaria media',
      'Polygonum spp.'
    ],
    targetCrops: ['Soya', 'Arroz', 'Frijol', 'Maíz', 'Arveja'],
    standardDose: '2.0 - 3.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 45,
    compatibilityTips: 'Aplicar sobre malezas de hoja ancha y ciperáceas en estado de 2 a 4 hojas con buena insolación.',
    keyFeatures: 'Selectividad óptima en leguminosas con acción de contacto fulminante que no deja residuos en grano.'
  },
  {
    id: 'kumir_sc',
    tradeName: 'Kumir 350 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Hidróxido de Cobre 350 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Cúpricos inorgánicos',
    moaCode: 'FRAC M01 (Multisitio)',
    targetPests: [
      'Bacteriosis (Xanthomonas spp., Pseudomonas spp.)',
      'Antracnosis (Colletotrichum spp.)',
      'Tizón tardío (Phytophthora infestans)',
      'Mancha de hierro en café (Cercospora coffeicola)'
    ],
    targetCrops: ['Tomate', 'Papa', 'Café', 'Aguacate', 'Frutales', 'Cítricos'],
    standardDose: '1.5 - 2.5 L/ha (1.5 - 2.5 cc/L)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 3,
    compatibilityTips: 'Formulación líquida micronizada que no tapa boquillas ni produce manchas en frutos de exportación.',
    keyFeatures: 'Liberación sostenida y gradual de iones Cu++ que desinfectan la superficie foliar e impiden la germinación bacteriana y fúngica.'
  },
  {
    id: 'ordan_wp',
    tradeName: 'Ordan 731 WP',
    category: 'FUNGICIDA',
    activeIngredient: 'Cimoxanilo 42 g/kg + Oxicloruro de Cobre 689 g/kg',
    formulation: 'Polvo Mojable (WP)',
    chemicalGroup: 'Cianoacetamida-oximas + Compuestos de Cobre',
    moaCode: 'FRAC 27 + M01',
    targetPests: [
      'Phytophthora infestans (Gota de la papa y tomate)',
      'Peronospora destructor (Mildeo de la cebolla)',
      'Pseudoperonospora cubensis (Mildeo de cucurbitáceas)',
      'Plasmopara viticola (Mildeo de la vid)'
    ],
    targetCrops: ['Papa', 'Tomate', 'Cebolla', 'Cucurbitáceas', 'Vid'],
    standardDose: '2.0 - 2.5 kg/ha (2.0 - 2.5 g/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 5,
    compatibilityTips: 'Efecto curativo translaminar (cimoxanilo) combinado con coraza protectora tenaz (cobre).',
    keyFeatures: 'Frena el ataque fúngico hasta 48 horas después del inicio de la infección con prolongado efecto de contacto multisitio.'
  },
  {
    id: 'rakurs_sc',
    tradeName: 'Rakurs 400 SC',
    category: 'FUNGICIDA',
    activeIngredient: 'Epoxiconazol 240 g/L + Ciproconazol 160 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Triazoles dobles de alta adherencia',
    moaCode: 'FRAC 3 + 3',
    targetPests: [
      'Royas foliares y del tallo (Puccinia spp., Hemileia vastatrix)',
      'Septoriosis foliar (Septoria tritici)',
      'Helminthosporiosis',
      'Oidio y carbones'
    ],
    targetCrops: ['Cereales', 'Café', 'Soya', 'Maíz', 'Coníferas y ornamentales'],
    standardDose: '0.4 - 0.5 L/ha (0.4 - 0.5 cc/L)',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 28,
    compatibilityTips: 'Incorpora polímeros viscoelásticos que aceleran la penetración celular en menos de 20 minutos y resisten lluvias intensas.',
    keyFeatures: 'Protección curativa y preventiva continua durante hasta 4 semanas gracias a su doble bloqueo en la biosíntesis de ergosterol.'
  },
  {
    id: 'simbad_ec',
    tradeName: 'Simbad 480 EC',
    category: 'HERBICIDA',
    activeIngredient: 'Clomazona 480 g/L',
    formulation: 'Concentrado Emulsionable (EC)',
    chemicalGroup: 'Isoxazolidinonas',
    moaCode: 'HRAC 13 (Inhibidor de biosíntesis de carotenoides)',
    targetPests: [
      'Echinochloa spp. (Liendrepuerco)',
      'Digitaria sanguinalis',
      'Galinsoga parviflora',
      'Portulaca oleracea'
    ],
    targetCrops: ['Arroz', 'Soya', 'Tabaco', 'Pimentón', 'Caña de azúcar'],
    standardDose: '0.6 - 1.0 L/ha',
    reEntryPeriodHours: 24,
    preHarvestIntervalDays: 60,
    compatibilityTips: 'Herbicida pre-emergente o post-emergente muy temprano. Provoca albinismo característico en las malezas diana.',
    keyFeatures: 'Absorbido por las raíces y coleóptilos con excelente residualidad en suelos arroceros y de cultivo intensivo.'
  },
  {
    id: 'vantex_cs',
    tradeName: 'Vantex 60 CS',
    category: 'INSECTICIDA',
    activeIngredient: 'Gamma-cihalotrina 60 g/L',
    formulation: 'Suspensión de Encapsulado (CS)',
    chemicalGroup: 'Piretroides avanzados',
    moaCode: 'IRAC 3A',
    targetPests: [
      'Spodoptera frugiperda',
      'Helicoverpa zea',
      'Trips y chinches',
      'Plagas defoliadoras y trozadoras'
    ],
    targetCrops: ['Maíz', 'Soya', 'Algodón', 'Papa', 'Arroz'],
    standardDose: '50 - 100 cc/ha',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 7,
    compatibilityTips: 'Microcápsulas de liberación lenta que resisten el lavado por lluvia y la fotodegradación por radiación UV.',
    keyFeatures: 'El isómero más puro y activo de la lambda-cihalotrina: máxima potencia insecticida con mínimas dosis por hectárea.'
  },
  {
    id: 'scalin_sc',
    tradeName: 'Scalin SC',
    category: 'INSECTICIDA / ACARICIDA',
    activeIngredient: 'Espirotetramat 120 g/L + Bifentrina 120 g/L',
    formulation: 'Suspensión Concentrada (SC)',
    chemicalGroup: 'Derivados del Ácido Tetramónico (Cetoenoles) + Piretroides',
    moaCode: 'IRAC 23 + 3A',
    targetPests: [
      'Thrips palmi / Frankliniella occidentalis (Trips)',
      'Tetranychus urticae / Oligonychus yothersi (Arañita roja y ácaros del aguacate)',
      'Bemisia tabaci (Mosca blanca)',
      'Pseudococcus spp. (Cochinillas harinosas y escamas protegidas)',
      'Stenoma catenifer / Heilipus lauri (Barrenadores y picudo)'
    ],
    targetCrops: ['Aguacate (Hass)', 'Flores (Rosa, Clavel, Crisantemo)', 'Tomate', 'Cítricos', 'Frutales'],
    standardDose: '0.4 - 0.6 cc/L de agua (300 - 450 cc/ha)',
    reEntryPeriodHours: 12,
    preHarvestIntervalDays: 3,
    compatibilityTips: 'Sistemia bidireccional única (acrópeta y basípeta). Mezclar siempre con Avgust Star (0.25 - 0.5 cc/L) para asegurar absorción estomática y translocación por el floema hacia brotes nuevos y raíces.',
    keyFeatures: 'Sistemia ambimóvil 360° combinada con choque contundente. Inhibe la biosíntesis de lípidos (ACCasa) cortando la reproducción y muda de ninfas, con derribe instantáneo de adultos por modulación de canales de sodio.'
  }
];
