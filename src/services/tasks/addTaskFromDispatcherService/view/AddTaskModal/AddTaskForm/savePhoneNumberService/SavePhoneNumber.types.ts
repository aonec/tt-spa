import { ReactNode } from 'react';

export type SavePhoneNumberProps = {
  children: ReactNode;
  isOpen: boolean;
  handleReplacePhoneNumber: () => void;
  handleClosePhoneNumber: () => void;
};
