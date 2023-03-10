import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import React, { FC } from 'react';
import { useDocumentsUpload } from './DocumentsService.hook';
import {
  DocumentsUploadComponentType,
  DocumentsUploadContainerProps,
} from './DocumentsService.types';
import { DocumentsLineUpload } from './view/DocumentsLineUpload';
import { DocumentsList } from './view/DocumentsList';
import { useStore } from 'effector-react';
import { currentUserService } from 'services/currentUserService';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'myApi';

const accept =
  'application/msword, application/vnd.ms-excel, application/pdf, image/*';

export const DocumentsUploadContainer: FC<DocumentsUploadContainerProps> = ({
  uniqId,
  max = Infinity,
  documents,
  onChange,
  label,
  type,
  componentType = DocumentsUploadComponentType.DragAndDrop,
}) => {
  if (!documents) {
    documents = [];
  }

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);

  const isPermitionToDeleteExistedDocument = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
      ESecuredIdentityRoleName.ManagingFirmDispatcher,
      ESecuredIdentityRoleName.Controller,
    ]).length,
  );

  const { handleFile, isLoading, removeDocument } = useDocumentsUpload(
    documents,
    onChange,
  );

  const isMaxDocuments = documents.length >= max;

  return componentType === DocumentsUploadComponentType.DragAndDrop ? (
    <div>
      {!isMaxDocuments && (
        <DragAndDrop
          disabled={isLoading}
          accept={accept}
          fileHandler={(files) => handleFile(files[0], type)}
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
