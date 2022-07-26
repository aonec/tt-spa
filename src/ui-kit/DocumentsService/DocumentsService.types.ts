import { DocumentResponse, DocumentLiteResponse, EDocumentType } from '../../api/types';

export type Document = DocumentResponse | DocumentLiteResponse;

export type DocumentsUploadContainerProps = {
  documents: Document[];
  onChange: (documents: Document[]) => void;
  uniqId: string;
  max?: number;
  type?: EDocumentType;
};
