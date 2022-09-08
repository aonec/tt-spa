import { DocumentResponse, DocumentLiteResponse, EDocumentType } from 'myApi';

export type Document = DocumentResponse | DocumentLiteResponse;

export type DocumentsUploadContainerProps = {
  documents: Document[];
  onChange: (documents: Document[]) => void;
  uniqId: string;
  max?: number;
  type?: EDocumentType;
  lable?: string;
};
