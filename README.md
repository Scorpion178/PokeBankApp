# PokeBankApp 🏦🚀

## Descripción

Aplicación móvil de alto rendimiento desarrollada en **React Native**. Consume datos de la PokeAPI aplicando **Clean Architecture**, diseñada bajo estándares de seguridad bancaria y escalabilidad modular.

---

## 🛠 Requisitos Previos



**1. Instalar Java 17 vía Homebrew**

**bash**

```
brew install openjdk@17

```

Usa el código con precaución.

**2. Vincularlo correctamente en tu Sistema**

Ejecuta estos comandos para que tu Mac prefiera la versión 17 sobre la 19:

**bash**

```
sudo ln -sfn $(brew --prefix openjdk@17)/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

```

Usa el código con precaución.

**3. Actualizar tu** `.zshrc` **(Configuración de Banco)**

Abre tu archivo: `cursor ~/.zshrc` y añade/modifica estas líneas:

**bash**

```
# Java Home - Forzando la versión 17 LTS
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

```

Usa el código con precaución.

*Guarda y refresca:* `source ~/.zshrc`

**4. Verificar**

Corre `java -version`. Debe decir **17.x.x**.



- **Runtime**: Node.js (Gestionado vía `fnm` recomendado).
- **Ruby**:Instala Ruby 3.3.0 o superior. Es la versión estable actual, tiene parches de seguridad activos y compila sin errores en macOS moderno.

```bash
rbenv install 3.3.0
rbenv global 3.3.0
```

- **Gestor de Dependencias iOS**: CocoaPods.
  ```bash
  sudo gem install cocoapods
  ```
- **Observador de Archivos**: Watchman (Crucial para el rendimiento del Metro Bundler).
  ```bash
  brew install watchman
  ```
- **Validar React Native**: Ejecuta el siguiente comando para verificar la configuración de tu entorno de desarrollo:

```bash
    npx react-native doctor
```

---

## 🚀 Instalación y Configuración

### 1. Inicialización del Core

Creamos la base del proyecto sin plantillas predefinidas para tener control total sobre las dependencias de seguridad:

```bash
npx @react-native-community/cli@latest init PokeBankApp
cd PokeBankApp
```

### 2. Agregar TypeScript Manualmente

1. Instala TypeScript y los tipos necesarios:

```bash
npm install --save typescript @types/react @types/react-native
```

- En las arquitecturas modernas de React Native, las librerías de alto rendimiento (escritas en C++) se dividen en módulos de núcleo y módulos de funcionalidad. react-native-mmkv ahora depende de react-native-nitro-modules. Sin este puente, Gradle no puede compilar el almacenamiento seguro.

```bash
npm install react-native-nitro-modules
```

1. Crea un archivo `tsconfig.json` en la raíz del proyecto con el siguiente contenido:

```bash
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@core/*": ["core/*"],
      "@shared/*": ["shared/*"],
      "@features/*": ["features/*"],
      "@assets/*": ["assets/*"],
      "@tests/*": ["tests/*"]
    }
  },
  "include": ["src/**/*", "App.tsx"],
  "exclude": ["node_modules"]
}
```

- Renombra tus archivos de JavaScript a TypeScript (por ejemplo, App.js a App.tsx).

### 3. Instalar Dependencias

1. Instala las dependencias necesarias para el proyecto:

```bash
`npm install axios @shopify/flash-list react-native-mmkv`
```

1. Validar React Native: Ejecuta el siguiente comando para verificar la configuración de tu entorno de desarrollo:

```bash
    npx react-native doctor
```

### 3. Ejecutar la Aplicación

- Para Android:

```bash
`npx run android`
```

- Para iOS:

```bash
`npx run ios`
```

### 4. Ejecutar Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
`npm test`
```

## **Estructura del Proyecto**

- **/src**: Contiene el código fuente de la aplicación.
  - **/core**: Lógica central, interceptores y contexto.
  - **/shared**: Componentes, modelos, utilidades y servicios reutilizables.
  - **/features**: Características específicas de la aplicación, como la gestión de Pokémon.
  - **/assets**: Recursos como imágenes y estilos.
  - **/environments**: Configuraciones para diferentes entornos (desarrollo, producción, pruebas).
  - **/tests**: Pruebas unitarias y de integración.

## **Estructura de Pruebas**

- **/tests**: Contiene pruebas de integración.
- **Pruebas Unitarias**: Se recomienda colocar las pruebas unitarias junto a sus respectivos archivos de componentes o servicios para facilitar la localización.

## **Enfoque**

- Se utilizó una arquitectura modular para facilitar el mantenimiento y la escalabilidad.
- Se implementó un diseño responsivo utilizando StyleSheet.
- Se configuraron pruebas unitarias con Jest y React Native Testing Library para asegurar la funcionalidad de la aplicación.
- Se utilizó FlashList para manejar listas grandes de manera eficiente.
- Se implementó MMKV para un almacenamiento local eficiente.

## **Notas**

- Asegúrate de abrir el proyecto en Xcode usando el archivo `.xcworkspace` después de instalar CocoaPods.
- Si tienes problemas al ejecutar la aplicación, verifica que todas las dependencias estén correctamente instaladas y que tu entorno de desarrollo esté configurado adecuadamente.

