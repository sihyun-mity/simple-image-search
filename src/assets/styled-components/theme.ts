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
    heading: css`
      color: #000;
      -webkit-text-stroke: 0.4px #fff;
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
    heading: css`
      color: #fff;
      -webkit-text-stroke: 0.4px #000;
    `,
    input: css`
      background-color: #676767;
      color: #fff;
    `,
  },
};

export const theme: DisplayModeModel = { light, dark };

export type Theme = typeof theme;
