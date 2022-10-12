import { DocumentResponse } from 'myApi';

export type DocumentsCardItemProps = {
  document: DocumentResponse;
  handleSaveFile: (document: DocumentResponse) => void;
};
