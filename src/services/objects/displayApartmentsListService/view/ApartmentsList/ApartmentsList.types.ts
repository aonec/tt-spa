import { ApartmentListResponse } from 'api/myApi';

export type ApartmentsListProps = {
  apartments: ApartmentListResponse[];
  isLoading: boolean;
};
