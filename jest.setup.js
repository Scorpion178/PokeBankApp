
// 1. Mock para react-native-vector-icons (Evita errores de sintaxis y de fuentes)
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-paper', () => {
  const Actual = jest.requireActual('react-native-paper');
  return {
    ...Actual,
    Icon: () => 'Icon', 
  };
});

// 2. Mock para react-native-mmkv (Evita errores de export/import y código C++)
jest.mock('react-native-mmkv', () => {
  const mock = {
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    getAllKeys: jest.fn().mockReturnValue([]),
    clearAll: jest.fn(),
  };
  return {
    MMKV: jest.fn(() => mock),
    createMMKV: jest.fn(() => mock),
  };
});

// 3. Mock para react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const insets = { top: 0, left: 0, right: 0, bottom: 0 };
  const frame = { x: 0, y: 0, width: 0, height: 0 };

  // Creamos el contexto con el valor por defecto para que el Consumer nunca sea undefined
  const mockContext = React.createContext(insets);

  return {
    SafeAreaProvider: ({ children }) => (
      React.createElement(mockContext.Provider, { value: insets }, children)
    ),
    SafeAreaConsumer: mockContext.Consumer,
    SafeAreaContext: mockContext, // Esto es lo que busca SafeAreaProviderCompat.tsx:40
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
  };
});

// 4. Mock para FlashList (Evita problemas de renderizado en tests)
jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    FlashList: (props) => {
      // Pasamos el testID a la View contenedora para que Jest lo encuentre
      return React.createElement(View, { testID: props.testID }, 
        props.data?.map((item, index) => 
          props.renderItem({ item, index })
        )
      );
    },
  };
});

// Bypass para el componente que causa el error del Consumer
jest.mock('react-native-paper/lib/commonjs/core/SafeAreaProviderCompat', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

// También mockeamos la ruta de ES6 por si acaso
jest.mock('react-native-paper/src/core/SafeAreaProviderCompat', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});
