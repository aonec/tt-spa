import { ReactNode } from 'react';
import { ButtonStyleType } from 'ui-kit/Button/Button.types';

export type DialogProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onSubmit?: () => void;
  type: ButtonStyleType;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  description?: ReactNode;
  footer?: ReactNode;
};
