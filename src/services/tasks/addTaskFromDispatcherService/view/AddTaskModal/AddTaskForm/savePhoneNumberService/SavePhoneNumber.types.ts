import { ReactNode } from 'react';

export type SavePhoneNumberProps = {
  children: ReactNode;
  isOpen: boolean;
  handleSavePhoneNumber: () => void;
  handleReplacePhoneNumber: () => void;
  handleClosePhoneNumber: () => void;
};
