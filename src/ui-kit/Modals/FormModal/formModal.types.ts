import { ReactNode } from 'react';

export interface FormModalProps {
    width?: number;
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
    submitButtonType?: 'blue' | 'red';
    formId: string;
    form: ReactNode
  }
