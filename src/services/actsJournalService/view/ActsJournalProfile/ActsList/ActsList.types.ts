import { ApartmentActResponsePagedList } from 'myApi';

export type ActsListProps = {
  actsPagedData: ApartmentActResponsePagedList | null;
  isActsLoading: boolean;
  setPageNumber: (pageNumber: number) => void;
};
