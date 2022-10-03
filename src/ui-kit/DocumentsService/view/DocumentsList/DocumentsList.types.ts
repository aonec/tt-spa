import { Document } from '../../DocumentsService.types';

export type DocumentsListProps = {
  documents: Document[];
  removeDocument: (id: number) => void;
  isLoading: boolean;
};
