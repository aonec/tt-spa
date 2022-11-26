import { HTMLAttributes, ReactElement } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
  icon?: ReactElement;
  size?: ButtonSizeType;
  sidePadding?: number;
  isLoading?: boolean;
  form?: string;
} & HTMLAttributes<HTMLElement>;

export type ButtonSizeType = 'middle' | 'small';

export type ButtonStyleType = 'default' | 'ghost' | 'danger';
