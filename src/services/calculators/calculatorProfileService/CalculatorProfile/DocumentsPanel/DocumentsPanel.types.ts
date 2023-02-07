import { DocumentResponse } from 'myApi';

export type DocumentsPanelProps = {
  handleClick: () => void;
  documents: DocumentResponse[];
};
