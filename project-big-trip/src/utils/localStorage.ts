export const getFromLocalStorage = <T>(key: string): T | null => {
  return JSON.parse(localStorage.getItem(key) || "null");
}

export const addToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
}