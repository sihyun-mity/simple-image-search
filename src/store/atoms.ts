import { atom } from 'recoil';
import DisplayModeType from '../types/DisplayModeType';
import OrientationType from '../types/OrientationType';
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

export const orientationType = atom<OrientationType>({
  key: 'orientationType',
  default: 'portrait',
});

export const headerSearchBar = atom<boolean>({
  key: 'headerSearchBar',
  default: false,
});
