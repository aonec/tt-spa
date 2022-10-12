import { DocumentResponse } from 'myApi';

export type ApartmentDocumentsListItemProps = {
  document: DocumentResponse;
  handleSaveFile: (document: DocumentResponse) => void;
};
