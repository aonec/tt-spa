import { DocumentResponse } from 'api/myApi';

export type TaskDocumentsListItemProps = {
  document: DocumentResponse;
  handleDeleteDocument: (id: number) => void;
};
