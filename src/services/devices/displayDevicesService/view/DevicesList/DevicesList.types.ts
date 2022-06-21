import { CalculatorListResponse } from 'myApi';

export type DevicesListProps = {
  calculators: CalculatorListResponse[];
  isLoading: boolean;
  total?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber: (pageNumber: number) => void;
};
