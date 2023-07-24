import { ReactNode } from 'react';

export type Props = {
  isOpen: boolean;
  executeConfirmReading: () => void;
  executeCancelReading: () => void;
  title: ReactNode;
};
