import { DocumentLiteResponse } from 'api/myApi';

export type EditNodeUploadDocumentsModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  onSubmit: (document: DocumentLiteResponse) => void;
};
