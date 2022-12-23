import { ReactNode } from 'react';
import { ModalProps } from 'antd/es/modal';

export interface FormModalProps {
  innerModalProps?: ModalProps;
  visible: boolean;
  onCancel?(): void;
  title: string | ReactNode;
  submitBtnText?: string;
  cancelBtnText?: string;
  loading?: boolean;
  onSubmit?(): void;
  customSubmit?: ReactNode;
  centered?: boolean;
  customFooter?: ReactNode;
  customCancelButton?(): void;
  disabled?: boolean;
  formId: string;
  form: ReactNode;
  description?: string;
}
