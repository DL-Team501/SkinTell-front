import { atom } from 'recoil';

export const classificationState = atom<string[]>({
  key: 'classificationState',
  default: undefined,
});
