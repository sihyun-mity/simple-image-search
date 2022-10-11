import { selector } from 'recoil';
import { displayMode } from './atoms';

export const isDarkMode = selector<boolean>({
  key: 'isDarkMode',
  get: ({ get }) => {
    const displayTheme = get(displayMode);

    return displayTheme === 'dark' ? true : false;
  },
});
