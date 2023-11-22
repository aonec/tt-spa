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
  sortedCb?: (first: T, second: T) => number;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
  pagination?: Pagination;
  rowStyles?: string;
  headerStyles?: string;
  link?: (elem: T) => string;
  isSticky?: boolean;
  floating?: boolean;
};
