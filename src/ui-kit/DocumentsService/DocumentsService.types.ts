import {
  DocumentResponse,
  DocumentLiteResponse,
  EDocumentType,
} from 'api/types';

export type Document = DocumentResponse | DocumentLiteResponse;

export type DocumentsUploadContainerProps = {
  uniqId: string;
  onChange: (documents: Document[]) => void;
  documents?: Document[] | null;
  max?: number;
  type?: EDocumentType;
  label?: string;
  componentType?: DocumentsUploadComponentType;
  url?: string;
};

export enum DocumentsUploadComponentType {
  DragAndDrop = 'DragAndDrop',
  Line = 'Line',
}
export interface FileData {
  id: number;
  status?: 'done' | 'failed' | 'pending';
  fileResponse: DocumentResponse | null;
  error?: Error;
  onRemove?(): void;
}
