import { atom } from 'recoil';
import { localStorageEffect } from '../util/atoms';

export const classificationState = atom<string[]>({
  key: 'classificationState',
  default: undefined,
  effects: [localStorageEffect('classificationState')],
});
