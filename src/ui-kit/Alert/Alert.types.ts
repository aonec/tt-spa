import { ReactNode } from 'react';

export type AlertProps = {
  icon: 'info' | 'stop' | 'warning' | 'incorrect';
  type?: 'default' | 'danger';
  children?: ReactNode;
  centered?: boolean;
};
