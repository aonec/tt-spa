import { ReactNode } from 'react';

export type Pagination = {
  pageSize: number;
};

export type TableColumn<T> = {
  label: ReactNode;
  size: string;
  render: (element: T, rowIndex: number) => ReactNode;
  hidden?: boolean;
  css?: (isHeader: boolean) => string;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
  pagination?: Pagination;
  rowStyles?: string;
};
