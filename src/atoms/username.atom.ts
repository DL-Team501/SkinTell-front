import { atom, selector } from 'recoil';
import { localStorageEffect } from '../util/atoms';

export const usernameState = atom<string>({
  key: 'usernameState',
  default: '',
  effects: [localStorageEffect('usernameState')],
});

export const authenticatedState = selector<boolean>({
  key: 'authenticatedState',
  get: ({ get }) => {
    const username = get(usernameState);

    return Boolean(username);
  },
});
