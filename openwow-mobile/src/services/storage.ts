import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';
const memoryStorage = new Map<string, string>();

const webStorage = {
  getItem: async (key: string) => {
    if (typeof window === 'undefined') {
      return memoryStorage.get(key) ?? null;
    }
    return window.localStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (typeof window === 'undefined') {
      memoryStorage.set(key, value);
      return;
    }
    window.localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (typeof window === 'undefined') {
      memoryStorage.delete(key);
      return;
    }
    window.localStorage.removeItem(key);
  },
};

const fallbackStorage = {
  getItem: async (key: string) => {
    const value = memoryStorage.get(key);
    return value === undefined ? null : value;
  },
  setItem: async (key: string, value: string) => {
    memoryStorage.set(key, value);
  },
  removeItem: async (key: string) => {
    memoryStorage.delete(key);
  },
};

async function getItem(key: string) {
  if (isWeb) {
    return webStorage.getItem(key);
  }

  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.warn('AsyncStorage native module unavailable. Falling back to memory storage.', error);
    return fallbackStorage.getItem(key);
  }
}

async function setItem(key: string, value: string) {
  if (isWeb) {
    return webStorage.setItem(key, value);
  }

  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn('AsyncStorage native module unavailable. Falling back to memory storage.', error);
    await fallbackStorage.setItem(key, value);
  }
}

async function removeItem(key: string) {
  if (isWeb) {
    return webStorage.removeItem(key);
  }

  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('AsyncStorage native module unavailable. Falling back to memory storage.', error);
    await fallbackStorage.removeItem(key);
  }
}

export { getItem, setItem, removeItem };
