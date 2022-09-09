import React, { FC, useState } from 'react';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { DocumentsUploadComponentType } from 'ui-kit/DocumentsService/DocumentsService.types';
import { documentComponentDataDictionary } from './AttachDocument.constants';
import { AttachDocumentProps } from './AttachDocument.types';

export const AttachDocument: FC<AttachDocumentProps> = ({ type }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

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
    />
  );
};
