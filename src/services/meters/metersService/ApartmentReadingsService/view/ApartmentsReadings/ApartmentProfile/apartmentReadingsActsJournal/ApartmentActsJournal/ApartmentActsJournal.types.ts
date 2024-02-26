import { ApartmentActResponsePagedList, DocumentResponse } from 'api/types';

export type Props = {
  apartmentActs: ApartmentActResponsePagedList | null;
  isLoading: boolean;
  apartmentId: number;
  handleSaveFile: (payload: DocumentResponse) => void;
};
