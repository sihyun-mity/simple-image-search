import { FlattenSimpleInterpolation } from 'styled-components';

export default interface DisplayModeModel {
  light: {
    colors: {
      [props: string]: FlattenSimpleInterpolation;
    };
  };
  dark: {
    colors: {
      [props: string]: FlattenSimpleInterpolation;
    };
  };
}
