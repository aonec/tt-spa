import { DocumentLiteResponse } from 'api/types';

export type EditNodeUploadDocumentsModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  onSubmit: (document: DocumentLiteResponse) => void;
};
