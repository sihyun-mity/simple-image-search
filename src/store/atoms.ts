import { atom } from 'recoil';

export const displayMode = atom<'light' | 'dark'>({
  key: 'displayMode',
  default: 'light',
});
