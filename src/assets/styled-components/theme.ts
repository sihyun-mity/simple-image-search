import { css } from 'styled-components';
import DisplayModeModel from './types/DisplayModeModel';

const light: DisplayModeModel = {
  colors: {
    body: css`
      background-color: #121212;
      color: #fff;
    `,
  },
};

const dark: DisplayModeModel = {
  colors: {
    body: css`
      background-color: #fff;
      color: #000;
    `,
  },
};

export const theme = { light, dark };

export type Theme = typeof theme;
