import { DocumentResponse } from 'api/types';

export type Props = {
  isViewModalOpen: boolean;
  setViewModalOpen: (payload: boolean) => void;
  viewFile: DocumentResponse | null;
};
