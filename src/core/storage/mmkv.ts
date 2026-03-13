import { createMMKV } from 'react-native-mmkv';

// El ID debe ser único para evitar colisiones
// y la encryptionKey debe provenir de un almacén seguro (Keychain/Vault) en producción.
export const storage = createMMKV({
  id: 'pokebank-storage',
  // En producción, no hardcodear esta clave.
  // encryptionKey: 'secure-private-key-2026',
});

export const saveJson = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    storage.set(key, serialized);
  } catch (error) {
    // En un entorno real se debería enviar a un logger centralizado.
    // eslint-disable-next-line no-console
    console.error(`[STORAGE ERROR]: Fallo al guardar ${key}`, error);
  }
};

export const getJson = <T>(key: string): T | null => {
  const raw = storage.getString(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[STORAGE ERROR]: JSON corrupto en ${key}`, error);
    return null;
  }
};

export const clearAll = (): void => {
  storage.clearAll();
};


