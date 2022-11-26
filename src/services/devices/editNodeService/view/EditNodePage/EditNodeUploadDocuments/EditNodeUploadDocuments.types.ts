import { DocumentLiteResponse } from 'myApi';

export type EditNodeUploadDocumentsProps = {
  documents: DocumentLiteResponse[];
  setDocuments: (docs: DocumentLiteResponse[]) => void;
};
