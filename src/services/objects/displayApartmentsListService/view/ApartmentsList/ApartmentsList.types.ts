import { ApartmentListResponse } from 'api/types';

export type ApartmentsListProps = {
  apartments: ApartmentListResponse[];
  isLoading: boolean;
  isApartmentFetched: boolean;
  isEmpty: boolean;
};
