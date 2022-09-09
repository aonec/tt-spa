import { DocumentResponse } from 'myApi';

export type TaskDocumentsListProps = {
  documents: DocumentResponse[];
  handleDeleteDocument: (id: number) => void;
};
