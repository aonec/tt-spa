import { MouseEventHandler, ReactElement, ReactNode } from 'react';

export type ButtonSize = 's' | 'm';

export type ButtonType = 'primary' | 'ghost' | 'danger';

export type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
  children?: ReactNode;
  icon?: ReactElement;
  disabled?: boolean;
  floating?: boolean;
  isLoading?: boolean;
  htmlForm?: string;
  htmlType?: 'submit' | 'button';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
