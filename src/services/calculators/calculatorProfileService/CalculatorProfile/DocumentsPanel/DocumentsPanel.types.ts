import { DocumentResponse } from 'api/types';

export type DocumentsPanelProps = {
  handleClick: () => void;
  documents: DocumentResponse[];
};
