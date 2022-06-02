import { ApartmentListResponse } from 'myApi';

export type ApartmentsListProps = {
  apartmentsList?: ApartmentListResponse[] | null;
  isLoading: boolean;
};
