import { DocumentResponse } from 'myApi';

export type ApartmentActsListProps = {
  documents: DocumentResponse[];
  isLoading: boolean;
  isDocumentsEmpty: boolean;
  handleOpeningCreateDocumentModal: () => void;
};
