import { DocumentResponse } from 'api/types';

export type NodeDocumentsItemProps = {
  document: DocumentResponse;
  saveFile: (payload: DocumentResponse) => void;
};
