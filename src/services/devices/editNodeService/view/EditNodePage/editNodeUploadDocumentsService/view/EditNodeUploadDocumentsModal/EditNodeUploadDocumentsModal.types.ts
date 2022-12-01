import { DocumentLiteResponse } from 'myApi';

export type EditNodeUploadDocumentsModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  onSubmit: (document: DocumentLiteResponse) => void;
};
