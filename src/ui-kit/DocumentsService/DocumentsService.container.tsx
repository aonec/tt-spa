import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import React, { FC } from 'react';
import { useDocumentsUpload } from './DocumentsService.hook';
import { DocumentsUploadContainerProps } from './DocumentsService.types';
import { DocumentsList } from './view/DocumentsList';

const accept =
  'application/msword, application/vnd.ms-excel, application/pdf, image/*';

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
          accept={accept}
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
