export type DialogProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  type: 'danger' | 'warn' | 'success';
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

export enum BtnType {
  danger = 'red',
  warn = 'yellow',
  success = 'blue',
}
