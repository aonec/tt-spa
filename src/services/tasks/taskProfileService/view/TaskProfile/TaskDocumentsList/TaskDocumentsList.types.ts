import { DocumentResponse } from 'api/myApi';

export type TaskDocumentsListProps = {
  documents: DocumentResponse[];
  openDeleteDocumentModal: (id: number) => void;
};
