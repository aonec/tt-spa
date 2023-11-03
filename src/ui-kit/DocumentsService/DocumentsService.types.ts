import {
  DocumentResponse,
  DocumentLiteResponse,
  EDocumentType,
} from 'api/types';

export type Document = DocumentResponse | DocumentLiteResponse;

export type DocumentsUploadContainerProps = {
  onChange: (documents: Document[]) => void;
  uniqId: string;
  documents?: Document[] | null;
  max?: number;
  type?: EDocumentType;
  label?: string;
  componentType?: DocumentsUploadComponentType;
  isPhoto?: boolean;
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
