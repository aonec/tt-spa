import React, { FC, useEffect, useState } from 'react';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { DocumentsUploadComponentType } from 'ui-kit/DocumentsService/DocumentsService.types';
import { documentComponentDataDictionary } from './AttachDocument.constants';
import { AttachDocumentProps } from './AttachDocument.types';

export const AttachDocument: FC<AttachDocumentProps> = ({
  type,
  handleChange,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    handleChange({ documentsIds: documents.map((elem) => elem.id) });
  }, [documents]);

  const componentData =
    (type && documentComponentDataDictionary[type]) ||
    documentComponentDataDictionary['Default'];

  return (
    <DocumentsUploadContainer
      documents={documents}
      onChange={setDocuments}
      uniqId="task-profile-documents-attach"
      lable={componentData.lable}
      componentType={DocumentsUploadComponentType.Line}
      max={componentData.maxDocuments}
    />
  );
};
