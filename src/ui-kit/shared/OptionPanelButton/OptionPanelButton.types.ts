import { ReactNode } from 'react';

export type Props = {
  title: string;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};
