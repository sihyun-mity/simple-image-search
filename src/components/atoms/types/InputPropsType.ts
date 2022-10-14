import { HTMLAttributes } from 'react';

export default interface InputPropsType extends HTMLAttributes<HTMLInputElement> {
  width?: any;
  height?: any;
  color?: string;
}
