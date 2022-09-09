import { HTMLAttributes } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
} & HTMLAttributes<HTMLDivElement>;

export type ButtonStyleType = 'default' | 'white' | 'danger';
