import { HTMLAttributes, ReactElement } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
  icon?: ReactElement;
  size?: ButtonSizeType;
} & HTMLAttributes<HTMLElement>;

export type ButtonStyleType = 'default' | 'white' | 'danger';

export type ButtonSizeType = 'middle' | 'small';
