import { Document } from 'ui-kit/DocumentsService';

export type DocumentsStageProps = {
  handleGoPrevStage: () => void;
  documents: DocumentStageForm | null;
  handleSubmitDocumentStage: (payload: DocumentStageForm) => void;
  isDocumentUploadLoading: boolean;
};

export type DocumentStageForm = {
  completedWorks: Document[] | null;
  devicePassport: Document[] | null;
  deviceCheck: Document[] | null;
};
