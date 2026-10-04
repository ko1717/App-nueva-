# 📱 Guía para Generar el APK de Avgust MIPE

Este proyecto incluye el código nativo completo en **Kotlin + Jetpack Compose + Room Database** dentro de la carpeta `/app`.

Sigue estos sencillos pasos para generar el archivo instalable **`AvgustMIPE.apk`**:

---

## 🛠️ Opción 1: Generar con Android Studio (Recomendado y Visual)

1. **Abrir el proyecto**:
   - Abre **Android Studio**.
   - Haz clic en **File > Open...** y selecciona la carpeta raíz de este repositorio.
   - Espera a que Gradle sincronice automáticamente las dependencias del proyecto.

2. **Generar el APK**:
   - En el menú superior de Android Studio, ve a:
     `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - Espera unos segundos a que finalice la compilación.

3. **Obtener el archivo APK**:
   - Cuando aparezca la notificación en la esquina inferior derecha, haz clic en **"locate"**.
   - El archivo generado estará ubicado en:
     `app/build/outputs/apk/debug/app-debug.apk` (o `AvgustMIPE.apk`).
   - Cópialo a tu teléfono Android y ejecútalo para instalar la aplicación.

---

## 💻 Opción 2: Generar desde la Terminal (Línea de Comandos)

Si tienes el SDK de Android y Java 17+ instalado en tu computadora, ejecuta en la terminal:

```bash
# En Windows:
gradlew.bat assembleDebug

# En macOS / Linux:
chmod +x ./gradlew
./gradlew assembleDebug
```

El archivo APK se creará automáticamente en:
`app/build/outputs/apk/debug/app-debug.apk`

---

## 🌐 Opción 3: Instalación Inmediata sin compilar (PWA Oficial)
Si necesitas usar la aplicación de inmediato en cualquier dispositivo Android sin necesidad de compilar un APK:
1. Abre en Google Chrome:  
   `https://ais-pre-4kzll3dmgy5vre3nferffd-492881185259.us-west1.run.app`
2. Toca el menú de opciones (⋮) y selecciona **"Instalar aplicación"** / **"Agregar a pantalla principal"**.
3. Tendrás la versión completa de Avgust MIPE funcionando offline.
