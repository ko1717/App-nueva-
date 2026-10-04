# Guía Oficial de Firma de APK y Keystore de Producción (Avgust MIPE)

Esta guía documenta la configuración flexible de firmas en `app/build.gradle.kts` y los pasos para generar y configurar un **Keystore de Producción** que permita instalar y distribuir el APK en dispositivos Android físicos sin errores de verificación de firma o bloqueo de Google Play Protect.

---

## 1. Mejoras implementadas en `app/build.gradle.kts`

### ✅ Detección Flexible de Keystore de Debug:
La configuración de `debugConfig` ahora busca automáticamente en orden de prioridad:
1. Variable de entorno `DEBUG_KEYSTORE_PATH`.
2. Archivo en la raíz del proyecto: `${rootDir}/debug.keystore`.
3. Archivo PKCS12: `${rootDir}/debug.p12`.
4. Keystore por defecto del usuario: `~/.android/debug.keystore`.

### ✅ Esquemas de Firma Simultáneos (v1 + v2 + v3):
* **v1 (JAR Signature Scheme):** Obligatorio para versiones anteriores de Android y exploradores de archivos OEM (Xiaomi, Samsung, Oppo).
* **v2 (APK Signature Scheme v2):** Obligatorio desde Android 7.0+ (Nougat) para validar la integridad del APK completo con hash de 1MB.
* **v3 (APK Signature Scheme v3):** Compatible con Android 9.0+ para rotación de claves y máxima seguridad.

### ✅ Fallback Seguro en Release:
Si no se ha provisto una clave de release vía variable de entorno o archivo `my-upload-key.jks`, el tipo de compilación `release` utiliza la clave de debug en lugar de interrumpir el build, permitiendo probar APKs optimizados en dispositivos físicos.

---

## 2. Pasos para generar un Keystore de Producción

Para instalar un APK en dispositivos físicos sin advertencias de Play Protect y prepararlo para distribución oficial, se genera un almacén de claves en formato estándar **PKCS12** (`.jks` o `.keystore`).

### Paso 1: Generar el archivo Keystore con `keytool`
Ejecuta el siguiente comando en tu terminal (en la raíz del proyecto o en un directorio seguro):

```bash
keytool -genkey -v \
  -keystore release.keystore \
  -alias avgust_release_key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storetype PKCS12
```

El asistente te solicitará:
* **Contraseña del almacén de claves:** (ej. una contraseña segura que debes guardar).
* **Nombre y apellidos:** (ej. `Avgust Crop Protection`).
* **Unidad organizativa:** (ej. `MIPE Development Team`).
* **Organización:** (ej. `Avgust`).
* **Ciudad / Estado / País:** (ej. `PE`, `CO` o `MX`).
* Confirmar con `sí` (o `yes`).

---

### Paso 2: Configurar las Variables de Entorno en tu Sistema o CI/CD

Para compilar usando este keystore sin exponer contraseñas en el código fuente, define:

```bash
export KEYSTORE_PATH="/ruta/hacia/release.keystore"
export STORE_PASSWORD="tu_password_segura"
export KEY_ALIAS="avgust_release_key"
export KEY_PASSWORD="tu_password_segura"
```

O en un archivo `.env.local` (ignorado en git):
```env
KEYSTORE_PATH=./release.keystore
STORE_PASSWORD=tu_password_segura
KEY_ALIAS=avgust_release_key
KEY_PASSWORD=tu_password_segura
```

---

### Paso 3: Compilar y Firmar el APK de Producción

Con Gradle:
```bash
./gradlew assembleRelease
```
El APK firmado se generará en:
`app/build/outputs/apk/release/app-release.apk`

---

### Paso 4: Validar la firma con `apksigner`
Para certificar que el APK cumple con todas las exigencias de Android:

```bash
apksigner verify -v --verbose app/build/outputs/apk/release/app-release.apk
```
Debe responder:
```text
Verifies: true
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
```

---

## 3. Instalación sin problemas en Dispositivos Físicos

1. **Desinstalar versiones anteriores:** Si el dispositivo físico ya tenía instalada una versión de prueba o debug anterior, desinstálala primero desde **Ajustes ➔ Aplicaciones ➔ Avgust MIPE ➔ Desinstalar**.
2. **Transferir el APK:** Transfiere el APK por USB (vía `adb install -r app-release.apk`), descarga directa en el navegador del teléfono, o Drive.
3. **Ejecutar e instalar:** Al abrirlo, el instalador de paquetes de Android lo validará e instalará inmediatamente.
