const CLASSIFICATION_KEY = 'classification';

export const getLocalStorageClassification = (): string[] | undefined => {
  const saved = localStorage.getItem(CLASSIFICATION_KEY);
  const value = saved ? (JSON.parse(saved) as string[]) : undefined;

  return value;
};

export const setLocalStorageClassification = (classification?: string[]) => {
  classification &&
    localStorage.setItem(CLASSIFICATION_KEY, JSON.stringify(classification));
};
