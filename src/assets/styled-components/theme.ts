import { css } from 'styled-components';
import DisplayModeModel from './types/DisplayModeModel';

const light = {
  colors: {
    body: css`
      background-color: #fff;
      color: #000;
    `,
    header: css`
      background-color: #fff;
      border-bottom: 2px solid #232323;
    `,
    input: css`
      background-color: #fff;
    `,
  },
};

const dark = {
  colors: {
    body: css`
      background-color: #121212;
      color: #fff;
    `,
    header: css`
      background-color: #454545;
      border-bottom: 2px solid #898989;
    `,
    input: css`
      background-color: #898989;
    `,
  },
};

export const theme: DisplayModeModel = { light, dark };

export type Theme = typeof theme;
