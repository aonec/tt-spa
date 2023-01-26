import { EDocumentType } from 'myApi';
import React, { FC, useState } from 'react';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { ChangeNodeStatusDocumentProps } from './ChangeNodeStatusDocument.types';

export const ChangeNodeStatusDocument: FC<ChangeNodeStatusDocumentProps> = ({
  label,
  handleChange,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  return (
    <DocumentsUploadContainer
      documents={documents}
      uniqId="change-node-status-document"
      onChange={(files) => {
        if (files[0]?.id) {
          setDocuments(files);
          handleChange(files[0].id);
        }
      }}
      max={1}
      label={label}
      type={EDocumentType.NodeAdmissionAct}
    />
  );
};
