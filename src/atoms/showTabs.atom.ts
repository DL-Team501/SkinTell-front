import { atom } from 'recoil';

export const showTabsState = atom<boolean>({
  key: 'showTabsState',
  default: true,
});
