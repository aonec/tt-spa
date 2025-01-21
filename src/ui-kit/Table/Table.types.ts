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
  sortedParam?: (first: T) => number | null;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
  pagination?: Pagination;
  rowStyles?: ((rowData: T) => string) | string;
  headerStyles?: string;
  link?: (elem: T) => string | null;
  isSticky?: boolean;
  floating?: boolean;
  extraHeader?: ReactNode;
  maxWidth?: string;
  isLoading?: boolean;
};
