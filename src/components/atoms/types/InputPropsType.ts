import { HTMLAttributes } from 'react';

export default interface InputPropsType extends HTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  color?: string;
  value?: string;
  type: 'home' | 'header';
  func?: (value: string) => void;
}
