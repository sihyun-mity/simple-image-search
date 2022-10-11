import { atom } from 'recoil';
import DisplayModeType from '../types/DisplayModeType';

export const displayMode = atom<DisplayModeType>({
  key: 'displayMode',
  default: 'light',
});

export const viewHeight = atom<number>({
  key: 'viewHeight',
  default: 0,
});
