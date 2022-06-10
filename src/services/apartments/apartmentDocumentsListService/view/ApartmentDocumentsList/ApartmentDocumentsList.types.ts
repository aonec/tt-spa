import { DocumentResponse } from 'myApi';

export type ApartmentDocumentsListProps = {
  documents: DocumentResponse[];
  isLoading: boolean;
};
