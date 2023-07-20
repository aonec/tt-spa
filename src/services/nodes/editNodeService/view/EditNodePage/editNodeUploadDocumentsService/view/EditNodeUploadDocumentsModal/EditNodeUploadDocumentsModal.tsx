import { DocumentLiteResponse, EDocumentType } from 'api/myApi';
import React, { FC, useState } from 'react';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditNodeUploadDocumentsModalProps } from './EditNodeUploadDocumentsModal.types';

export const EditNodeUploadDocumentsModal: FC<
  EditNodeUploadDocumentsModalProps
> = ({ closeModal, isOpen, onSubmit }) => {
  const [docs, setDocuments] = useState<DocumentLiteResponse[]>([]);

  return (
    <FormModal
      formId="edit-node-document-upload"
      onCancel={closeModal}
      form={
        <DocumentsUploadContainer
          documents={docs}
          uniqId="edit-apartment-act-form"
          onChange={(files) => {
            setDocuments(files);
          }}
          max={1}
          type={EDocumentType.Common}
        />
      }
      visible={isOpen}
      submitBtnText="Добавить"
      title="Добавление документа"
      disabled={docs.length === 0}
      onSubmit={() => onSubmit(docs[0])}
    />
  );
};
