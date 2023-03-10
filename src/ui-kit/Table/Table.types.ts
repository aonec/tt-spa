import { ReactNode } from 'react';

export type Pagination = {
  pageSize: number;
};

export type TableColumn<T> = {
  label: string;
  size: string;
  render: (element: T, index: number) => ReactNode;
  hidden?: boolean;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
  pagination?: Pagination;
};
