import { DragAndDrop } from 'ui-kit/DragAndDrop';
import React, { FC, useEffect } from 'react';
import { useDocumentsUpload } from './DocumentsService.hook';
import {
  DocumentsUploadComponentType,
  DocumentsUploadContainerProps,
} from './DocumentsService.types';
import { DocumentsLineUpload } from './view/DocumentsLineUpload';
import { DocumentsList } from './view/DocumentsList';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { documentService } from './DocumentsService.model';
import { useUnit } from 'effector-react';

const accept =
  'application/msword, application/vnd.ms-excel, application/pdf, image/*';

const { inputs } = documentService;

export const DocumentsUploadContainer: FC<DocumentsUploadContainerProps> = ({
  uniqId,
  max = Infinity,
  documents,
  onChange,
  label,
  type,
  componentType = DocumentsUploadComponentType.DragAndDrop,
  url,
}) => {
  if (!documents) {
    documents = [];
  }

  const isPermitionToDeleteExistedDocument = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
    ESecuredIdentityRoleName.Controller,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  const { handleFile, isLoading, removeDocument } = useDocumentsUpload(
    documents,
    onChange,
    url,
  );

  const { setIsLoading } = useUnit({ setIsLoading: inputs.setIsLoading });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const isMaxDocuments = documents.length >= max;

  return componentType === DocumentsUploadComponentType.DragAndDrop ? (
    <div>
      {!isMaxDocuments && (
        <DragAndDrop
          disabled={isLoading}
          accept={accept}
          fileHandler={(files: FileList) => handleFile(files[0], type)}
          uniqId={uniqId}
          text={label}
          style={{
            marginBottom: Boolean(documents.length) || isLoading ? 16 : 0,
          }}
        />
      )}
      {(Boolean(documents.length) || isLoading) && (
        <DocumentsList
          isLoading={isLoading}
          removeDocument={removeDocument}
          documents={documents}
          isPermitionToDeleteExistedDocument={
            isPermitionToDeleteExistedDocument
          }
        />
      )}
    </div>
  ) : (
    <DocumentsLineUpload
      fileHandler={(files) => handleFile(files[0], type)}
      isLoading={isLoading}
      removeDocument={removeDocument}
      documents={documents}
      accept={accept}
      uniqId={uniqId}
      label={label}
      isMaxDocuments={isMaxDocuments}
    />
  );
};
