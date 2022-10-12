import { selector } from 'recoil';
import { displayMode, responsiveType } from './atoms';

export const isDarkMode = selector<boolean>({
  key: 'isDarkMode',
  get: ({ get }) => {
    const displayTheme = get(displayMode);

    return displayTheme === 'dark' ? true : false;
  },
});

export const isMobile = selector<boolean>({
  key: 'isMobile',
  get: ({ get }) => {
    const deviceType = get(responsiveType);

    return deviceType === 'mobile' ? true : false;
  },
});
