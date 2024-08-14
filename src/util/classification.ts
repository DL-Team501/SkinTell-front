import allClassifications from '../assets/classification.json';

export interface ClassificationInfo {
  label: string;
  description: string;
  value: string;
}

export const getClassificationInfo = (
  classification?: string
): ClassificationInfo | undefined => {
  console.log(allClassifications);
  return allClassifications.find(c => c.value === classification);
};
