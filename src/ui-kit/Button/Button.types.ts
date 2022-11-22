import { HTMLAttributes, ReactElement } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
  icon?: ReactElement;
  size?: ButtonSizeType;
  isLoading?: boolean;
} & HTMLAttributes<HTMLElement>;

export type ButtonSizeType = 'middle' | 'small';

export type ButtonStyleType = 'default' | 'ghost' | 'danger';
