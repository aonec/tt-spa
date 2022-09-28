import { DocumentResponse } from 'myApi';

export type TaskDocumentsListProps = {
  documents: DocumentResponse[];
  openDeleteDocumentModal: (id: number) => void;
};
