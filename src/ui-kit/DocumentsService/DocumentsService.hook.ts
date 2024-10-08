import { message } from 'antd';
import { EDocumentType } from 'api/types';
import { useState } from 'react';
import { uploadDocument } from './DocumentsService.api';
import { Document } from './DocumentsService.types';
import { EffectFailDataAxiosError } from 'types';

export function useDocumentsUpload(
  documents: Document[],
  onChange: (documents: Document[]) => void,
  url?: string,
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFile(file: File, type?: EDocumentType) {
    setIsLoading(true);
    try {
      const document = await uploadDocument(file, type, url);

      onChange([...documents, document]);
    } catch (e) {
      message.error(
        (e as EffectFailDataAxiosError).response.data.error.Text ||
          (e as EffectFailDataAxiosError).response.data.error.Message ||
          'Не удалось загрузить документ',
      );
    }
    setIsLoading(false);
  }

  function removeDocument(id: number) {
    onChange(documents.filter((document) => document.id !== id));
  }

  return { handleFile, removeDocument, isLoading };
}
