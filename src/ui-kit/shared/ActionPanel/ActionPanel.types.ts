import { ReactNode } from 'react';

export type ActionPanelProps = {
  text: ReactNode;
  onClick: () => void;
  icon: ReactNode;
  additionalInfo?: ReactNode;
};
