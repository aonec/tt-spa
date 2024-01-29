import { ApartmentActResponsePagedList } from 'api/types';

export type Props = {
  apartmentActs: ApartmentActResponsePagedList | null;
  isLoading: boolean;
  apartmentId: number;
};
