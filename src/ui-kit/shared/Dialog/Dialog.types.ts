import { ReactNode } from 'react';
import { ButtonType } from 'ui-kit/Button/Button.types';

export type DialogProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onSubmit?: () => void;
  type?: ButtonType;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  description?: ReactNode;
  footer?: ReactNode;
  zIndex?: number;
  children?: ReactNode;
  width?: number;
};
