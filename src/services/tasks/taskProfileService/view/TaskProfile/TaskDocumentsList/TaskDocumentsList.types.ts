import { DocumentResponse } from 'api/types';

export type TaskDocumentsListProps = {
  documents: DocumentResponse[];
  openDeleteDocumentModal: (id: number) => void;
};
