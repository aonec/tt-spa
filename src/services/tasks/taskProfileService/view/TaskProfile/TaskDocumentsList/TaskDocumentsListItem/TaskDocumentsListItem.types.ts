import { DocumentResponse } from 'api/types';

export type TaskDocumentsListItemProps = {
  document: DocumentResponse;
  handleDeleteDocument: (id: number) => void;
};
