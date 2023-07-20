import { DocumentResponse } from 'api/myApi';

export type DocumentsPanelProps = {
  handleClick: () => void;
  documents: DocumentResponse[];
};
