import { AtomEffect } from 'recoil';

// Utility function to sync with localStorage
export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    // Retrieve saved value from localStorage
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (error) {
        console.error(`Error parsing localStorage value for ${key}:`, error);
      }
    }

    onSet((newValue: T, _, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
