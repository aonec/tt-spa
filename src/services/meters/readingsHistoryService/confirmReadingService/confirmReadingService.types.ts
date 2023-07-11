import { ReactNode } from 'react';

export type ConfirmReadingCallbackPayload = {
  onSubmit(): void;
  onCancel?: () => void;
  title: string | ReactNode;
};
