import { ApartmentActResponsePagedList } from 'api/types';

export type ActsListProps = {
  actsPagedData: ApartmentActResponsePagedList | null;
  isActsLoading: boolean;
  setPageNumber: (pageNumber: number) => void;
  handleOpenDoc: (payload: number) => void;
};
