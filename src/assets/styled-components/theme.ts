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
    options: css`
      background-color: #e9e9e9;
      box-shadow: 0 2px 8px 2px rgba(122, 122, 122, 0.2);

      * {
        color: #000;
      }
    `,
    heading: css`
      color: #000;
      -webkit-text-stroke: 0.4px #fff;
    `,
    input: css`
      background-color: #fff;

      & > input {
        color: #000;
      }
    `,
    item: css`
      background-color: #fff;
      box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 3px 0 rgb(0 0 0 / 10%);

      & > label > p {
        color: #000;
      }
    `,
    more: css`
      border: 1px solid #cecece;
      color: #111;
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
    options: css`
      background-color: #575757;
      box-shadow: 0 2px 8px 2px rgba(222, 222, 222, 0.2);

      * {
        color: #fff;
      }
    `,
    heading: css`
      color: #fff;
      -webkit-text-stroke: 0.4px #000;
    `,
    input: css`
      background-color: #676767;

      & > input {
        color: #fff;
      }
    `,
    item: css`
      background-color: #121212;
      box-shadow: 0 0 0 1px rgb(255 255 255 / 5%), 0 2px 3px 0 rgb(255 255 255 / 5%);

      & > label > p {
        color: #fff;
      }
    `,
    more: css`
      border: 1px solid #454545;
      color: #eee;
    `,
  },
};

export const theme: DisplayModeModel = { light, dark };

export type Theme = typeof theme;
