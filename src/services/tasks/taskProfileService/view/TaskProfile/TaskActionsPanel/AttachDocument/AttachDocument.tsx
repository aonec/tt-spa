import React, { FC } from 'react';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { AttachDocumentProps } from './AttachDocument.types';

export const AttachDocument: FC<AttachDocumentProps> = ({ type }) => {
  return (
    <DocumentsUploadContainer
      documents={[]}
      onChange={() => {}}
      uniqId="task-profile-documents-attach"
      lable=""
    />
  );
};
