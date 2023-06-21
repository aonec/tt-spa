import { message } from 'antd';
import { EDocumentType } from 'myApi';
import { useEffect, useState } from 'react';
import { uploadDocument } from './DocumentsService.api';
import { Document } from './DocumentsService.types';
import { EffectFailDataAxiosError } from 'types';

export function useDocumentsUpload(
  documents: Document[],
  onChange: (documents: Document[]) => void,
  setIsLoading2?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setIsLoading2 && setIsLoading2(isLoading), [isLoading]);

  async function handleFile(file: File, type?: EDocumentType) {
    setIsLoading(true);
    try {
      const document = await uploadDocument(file, type);

      onChange([...documents, document]);
    } catch (e) {
      message.error(
        (e as unknown as EffectFailDataAxiosError).response.data.error.Text ||
          (e as unknown as EffectFailDataAxiosError).response.data.error
            .Message ||
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
