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



**2. Vincularlo correctamente en tu Sistema**

Ejecuta estos comandos para que tu Mac prefiera la versión 17 sobre la 19:

**bash**

```
sudo ln -sfn $(brew --prefix openjdk@17)/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

```



**3. Actualizar tu** `.zshrc` **(Configuración de Banco)**

Abre tu archivo: `cursor ~/.zshrc` y añade/modifica estas líneas:

**bash**

```
# Java Home - Forzando la versión 17 LTS
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

```



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
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

- En las arquitecturas modernas de React Native, las librerías de alto rendimiento (escritas en C++) se dividen en módulos de núcleo y módulos de funcionalidad. react-native-mmkv ahora depende de react-native-nitro-modules. Sin este puente, Gradle no puede compilar el almacenamiento seguro.

```bash
npm install react-native-nitro-modules
```

- Instalar react Native Paper

```bash
npm install react-native-paper
npm install react-native-safe-area-context
npx pod-install
npm install @react-native-vector-icons/material-design-icons
npm install react-native-vector-icons
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

1. Configurar Babel:

- Instala el plugin:

```bash
npm install --save-dev babel-plugin-module-resolver
```

- Edita babel.config.js para añadir el plugin y los alias:

```bash
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@core': './src/core',
          '@shared': './src/shared',
          '@features': './src/features',
          '@assets': './src/assets',
          '@tests': './src/tests',
        },
      },
    ],
  ],
};
```

1. Configurar Metro (para que el bundler resuelva los alias)

- Edita metro.config.js:

```bash
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@tests': path.resolve(__dirname, 'src/tests'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

### 3. Instalar Dependencias

1. Instala las dependencias necesarias para el proyecto:

```bash
`npm install axios @shopify/flash-list react-native-mmkv`
```

1. Validar React Native: Ejecuta el siguiente comando para verificar la configuración de tu entorno de desarrollo:

```bash
    npx react-native doctor
```

### 4. Ejecutar la Aplicación

- Para Android:

```bash
`npx run android`
```

- Para iOS:

```bash
`npx run ios`
```

### 5. Ejecutar Pruebas

Para ejecutar las pruebas unitarias y de integración, utiliza el siguiente comando:

```bash
npm test
```

## **Estructura del Proyecto**

- **/src**: Contiene el código fuente de la aplicación.
  - **/core**: Lógica central, cliente HTTP (`PokeAPI`), MMKV y contexto.
  - **/shared**: Componentes, modelos, utilidades y servicios reutilizables.
  - **/features**: Características específicas de la aplicación.
    - **/pokemon**: Pantalla de listado de Pokémon, componentes y servicios.
  - **/assets**: Recursos como imágenes y estilos.
  - **/tests**: Pruebas de integración de alto nivel.

## **Estructura de Pruebas**

- **/tests**: Contiene pruebas de integración (por ejemplo, pruebas de la app completa).
- **Pruebas Unitarias**: Se colocan junto a sus respectivos archivos de componentes o servicios (por ejemplo, `PokemonListScreen.test.tsx` junto a `PokemonListScreen.tsx`).

## **Enfoque**

- Se utilizó una arquitectura modular para facilitar el mantenimiento y la escalabilidad.
- Se implementó una pantalla principal de Pokémon usando **FlashList** para manejar listas grandes.
- Se implementó un diseño responsivo utilizando **React Native Paper** (Sus componentes considera accesibilidad) y `StyleSheet`.
- Se configuraron pruebas unitarias con **Jest** y **React Native Testing Library** para asegurar la funcionalidad de la aplicación.
- Se implementó **MMKV** para un almacenamiento local eficiente de la lista de Pokémon.

## **Notas**

- Asegúrate de abrir el proyecto en Xcode usando el archivo `.xcworkspace` después de instalar CocoaPods.
- Si tienes problemas al ejecutar la aplicación, verifica que todas las dependencias estén correctamente instaladas y que tu entorno de desarrollo esté configurado adecuadamente.

