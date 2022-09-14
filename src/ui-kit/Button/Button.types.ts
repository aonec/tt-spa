import { HTMLAttributes } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
} & HTMLAttributes<HTMLElement>;

export type ButtonStyleType = 'default' | 'white' | 'danger';
