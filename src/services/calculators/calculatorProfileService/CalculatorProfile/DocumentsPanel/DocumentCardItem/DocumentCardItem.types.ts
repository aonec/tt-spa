import { DocumentResponse } from 'api/types';

export type DocumentCardItemProps = {
  document: DocumentResponse;
  saveFile: (payload: DocumentResponse) => void;
};
