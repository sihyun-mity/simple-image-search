import { atom } from 'recoil';
import DisplayModeType from '../types/DisplayModeType';

export const displayMode = atom<DisplayModeType>({
  key: 'displayMode',
  default: 'light',
});
