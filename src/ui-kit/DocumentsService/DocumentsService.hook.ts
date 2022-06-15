import { message } from 'antd';
import { EDocumentType } from 'myApi';
import { useState } from 'react';
import { uploadDocument } from './DocumentsService.api';
import { Document } from './DocumentsService.types';

export function useDocumentsUpload(
  documents: Document[],
  onChange: (documents: Document[]) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFile(file: File, type?: EDocumentType) {
    setIsLoading(true);
    try {
      const document = await uploadDocument(file, type);

      onChange([...documents, document]);
    } catch (e) {
      message.error('Не удалось загрузить документ');
    }
    setIsLoading(false);
  }

  function removeDocument(id: number) {
    onChange(documents.filter((document) => document.id !== id));
  }

  return { handleFile, removeDocument, isLoading };
}
