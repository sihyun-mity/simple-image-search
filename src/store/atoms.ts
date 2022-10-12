import { atom } from 'recoil';
import DisplayModeType from '../types/DisplayModeType';
import ResponsiveType from '../types/ResponsiveType';

export const displayMode = atom<DisplayModeType>({
  key: 'displayMode',
  default: 'light',
});

export const viewHeight = atom<number>({
  key: 'viewHeight',
  default: 0,
});

export const responsiveType = atom<ResponsiveType>({
  key: 'responsiveType',
  default: 'mobile',
});
