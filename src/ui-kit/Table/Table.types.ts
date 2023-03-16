import { ReactNode } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';

export type Pagination = {
  pageSize: number;
};

export type TableColumn<T> = {
  label: string;
  size: string;
  render: (element: T, rowIndex: number) => ReactNode;
  hidden?: boolean;
  css?: (isHeader: boolean) => FlattenSimpleInterpolation;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  elements: T[];
  pagination?: Pagination;
};
