import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import React, { FC } from 'react';
import { useDocumentsUpload } from './DocumentsService.hook';
import {
  DocumentsUploadComponentType,
  DocumentsUploadContainerProps,
} from './DocumentsService.types';
import { DocumentsLineUpload } from './view/DocumentsLineUpload';
import { DocumentsList } from './view/DocumentsList';

const accept =
  'application/msword, application/vnd.ms-excel, application/pdf, image/*';

export const DocumentsUploadContainer: FC<DocumentsUploadContainerProps> = ({
  uniqId,
  max = Infinity,
  documents,
  onChange,
  lable,
  componentType = DocumentsUploadComponentType.DragAndDrop,
}) => {
  const { handleFile, isLoading, removeDocument } = useDocumentsUpload(
    documents,
    onChange
  );

  const isMaxDocuments = documents.length >= max;

  return componentType === DocumentsUploadComponentType.DragAndDrop ? (
    <div>
      {!isMaxDocuments && (
        <DragAndDrop
          disabled={isLoading}
          accept={accept}
          fileHandler={(files) => handleFile(files[0])}
          uniqId={uniqId}
          text={lable}
          style={{ marginBottom: 15 }}
        />
      )}
      <DocumentsList
        isLoading={isLoading}
        removeDocument={removeDocument}
        documents={documents}
      />
    </div>
  ) : (
    <DocumentsLineUpload
      fileHandler={(files) => handleFile(files[0])}
      isLoading={isLoading}
      removeDocument={removeDocument}
      documents={documents}
      accept={accept}
      uniqId={uniqId}
    />
  );
};
