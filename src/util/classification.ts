import allClassifications from '../assets/classification.json';

export interface ClassificationInfo {
  label: string;
  description: string;
  value: string;
}

export const getClassificationInfo = (
  classification?: string
): ClassificationInfo | undefined =>
  allClassifications.find(c => c.value === classification);
