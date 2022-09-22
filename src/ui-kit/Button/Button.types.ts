import { HTMLAttributes, ReactElement } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
  icon?: ReactElement;
} & HTMLAttributes<HTMLElement>;

export type ButtonStyleType = 'default' | 'ghost' | 'danger';
