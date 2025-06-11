import { DocumentResponse } from 'api/types';

export type Props = {
  name: string | null;
  setViewModalOpen: (payload: boolean) => void;
  handleDeleteDoc: (payload: number) => void;
  doc: DocumentResponse;
};
