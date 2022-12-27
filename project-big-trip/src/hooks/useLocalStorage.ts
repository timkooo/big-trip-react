import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = () => {
  const [storage, setStorage] = useState<{}[] | null>(null);

  const getFullStorage = (): {}[] | null => {
    const keys = Object.keys(localStorage);
    if (keys.length === 0) {
      return null;
    }
    return keys.map((key) => {
      let storageItem = Object.create(null);
      const storageValue = JSON.parse(localStorage.getItem(key) || '');
      return storageItem[key] = storageValue;
     });
  }; 

  const getFullStorageMemo = useCallback(getFullStorage, [localStorage]);

  const addToLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getFromLocalStorage = <T>(key: string): T | null => {
    return JSON.parse(localStorage.getItem(key) || "null");
  }

  useEffect(() => {
    setStorage(getFullStorageMemo);
  }, [getFullStorageMemo]);

  return {storage, getFullStorage, addToLocalStorage, getFromLocalStorage};
}
