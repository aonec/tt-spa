import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { message, Skeleton } from 'antd';
import { EDocumentType } from 'myApi';
import React, { FC, useState } from 'react';
import { uploadDocument } from './DocumentsService.api';
import { useDocumentsUpload } from './DocumentsService.hook';
import {
  Document,
  DocumentsUploadContainerProps,
} from './DocumentsService.types';
import { DocumentsList } from './view/DocumentsList';

export const DocumentsUploadContainer: FC<DocumentsUploadContainerProps> = ({
  uniqId,
  max = Infinity,
  documents,
  onChange,
}) => {
  const { handleFile, isLoading, removeDocument } = useDocumentsUpload(
    documents,
    onChange
  );

  const isMaxDocuments = documents.length >= max;

  return (
    <div>
      {!isMaxDocuments && (
        <DragAndDrop
          disabled={isLoading}
          accept="application/msword, application/vnd.ms-excel, application/pdf, image/*"
          fileHandler={(files) => handleFile(files[0])}
          uniqId={uniqId}
          style={{ marginBottom: 15 }}
        />
      )}
      <DocumentsList
        isLoading={isLoading}
        removeDocument={removeDocument}
        documnets={documents}
      />
    </div>
  );
};
