import { DocumentResponse } from 'myApi';

export type TaskDocumentsListItemProps = {
  document: DocumentResponse;
  handleDeleteDocument: (id: number) => void;
};
