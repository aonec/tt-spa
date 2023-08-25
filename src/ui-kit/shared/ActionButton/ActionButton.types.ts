import { ReactNode } from 'react';

export type ActionButtonProps = {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
};
