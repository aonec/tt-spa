import { DocumentResponse } from 'api/types';

export type NodeDocumentsListProps = {
  documents: DocumentResponse[];
  saveFile: (payload: DocumentResponse) => void;
};
