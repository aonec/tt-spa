import { HTMLAttributes } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type ButtonStyleType = 'default' | 'white' | 'danger';
