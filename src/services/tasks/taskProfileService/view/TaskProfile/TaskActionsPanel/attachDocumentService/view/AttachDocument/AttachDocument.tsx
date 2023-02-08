import React, { FC, useEffect, useState } from 'react';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { DocumentsUploadComponentType } from 'ui-kit/DocumentsService/DocumentsService.types';
import { AttachDocumentProps } from './AttachDocument.types';

export const AttachDocument: FC<AttachDocumentProps> = ({
  handleDocumentsChange,
  componentData,
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
      label={componentData.lable}
      componentType={DocumentsUploadComponentType.Line}
      max={componentData.maxDocuments}
    />
  );
};
