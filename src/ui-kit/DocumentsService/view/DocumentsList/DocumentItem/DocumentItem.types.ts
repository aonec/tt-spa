import { Document } from '../../../DocumentsService.types';

export type DocumentItemProps = {
  document: Document;
  removeDocument: (id: number) => void;
};
