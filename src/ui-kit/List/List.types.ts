import { ReactNode } from 'react';

export type ListProps = {
  gridTemp: string;
  children: { key: string | number; nodes: ReactNode[] }[];
};
