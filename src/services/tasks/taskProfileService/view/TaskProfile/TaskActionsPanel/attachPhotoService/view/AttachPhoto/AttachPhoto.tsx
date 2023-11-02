import React, { FC, useEffect, useState } from 'react';
import { Wrapper } from './AttachPhoto.styled';
import { AttachPhotoProps } from './AttachPhoto.types';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import {
  Document,
  DocumentsUploadComponentType,
} from 'ui-kit/DocumentsService/DocumentsService.types';
import { EDocumentType } from 'api/types';

export const AttachPhoto: FC<AttachPhotoProps> = ({
  handleDocumentsChange,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    handleDocumentsChange(documents.map((elem) => elem.id));
  }, [documents, handleDocumentsChange]);

  return (
    <DocumentsUploadContainer
      documents={documents}
      onChange={setDocuments}
      uniqId="task-profile-documents-attach"
      label="Загрузить фото"
      componentType={DocumentsUploadComponentType.Line}
      max={9}
      type={EDocumentType.Photo}
    />
  );
};
