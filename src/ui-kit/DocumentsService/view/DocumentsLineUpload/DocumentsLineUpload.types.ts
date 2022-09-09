import { Document } from 'ui-kit/DocumentsService/DocumentsService.types';

export type DocumentsLineUploadProps = {
  fileHandler: (files: FileList) => void;
  isLoading: boolean;
  removeDocument: (id: number) => void;
  documents: Document[];
  accept: string;
  uniqId: string;
  lable?: string;
};
