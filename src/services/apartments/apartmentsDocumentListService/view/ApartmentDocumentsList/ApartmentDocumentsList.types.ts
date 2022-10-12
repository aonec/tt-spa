import { DocumentResponse } from 'myApi';

export type ApartmentDocumentsListProps = {
  isLoading: boolean;
  documentsList: DocumentResponse[];
  handleSaveFile: (document: DocumentResponse) => void;
};
