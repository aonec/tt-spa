import { ButtonColorType } from 'antd/lib/button';
import { HTMLAttributes, ReactElement } from 'react';

export type ButtonProps = {
  type?: ButtonStyleType;
  disabled?: boolean;
  icon?: ReactElement;
  size?: ButtonSizeType;
  floating?: boolean;
  isLoading?: boolean;
  htmlForm?: string;
  htmlType?: 'submit' | 'button';
  color?: ButtonColorType;
} & HTMLAttributes<HTMLButtonElement>;

export type ButtonSizeType = 'middle' | 'small';

export type ButtonStyleType = 'primary' | 'ghost' | 'danger';
