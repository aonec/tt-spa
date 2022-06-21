import { ApartmentListResponse } from 'myApi';

export type ApartmentsListProps = {
  apartments: ApartmentListResponse[];
  isLoading: boolean;
};
