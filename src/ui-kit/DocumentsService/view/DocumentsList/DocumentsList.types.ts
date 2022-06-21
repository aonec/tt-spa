import { Document } from '../../DocumentsService.types';

export type DocumentsListProps = {
  documnets: Document[];
  removeDocument: (id: number) => void;
  isLoading: boolean;
};
