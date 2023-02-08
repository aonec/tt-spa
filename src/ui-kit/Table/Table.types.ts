import { ReactNode } from 'react';

export type TableColumn<T> = {
  label: string;
  size: string;
  render: (element: T, index: number) => ReactNode;
  hidden?: boolean;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
};