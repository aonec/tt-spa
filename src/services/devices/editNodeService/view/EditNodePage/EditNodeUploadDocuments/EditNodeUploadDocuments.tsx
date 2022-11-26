import { FilesList } from '01/shared/ui/FilesList';
import { Empty } from 'antd';
import { DocumentLiteResponse } from 'myApi';
import React, { FC, useState } from 'react';
import { DocumentsList } from 'ui-kit/DocumentsService/view/DocumentsList';
import { EditNodeUploadDocumentsModal } from './EditNodeUploadDocumentsModal';
import { OpenModalText } from './EditNodeUploadDocuments.styled';
import { EditNodeUploadDocumentsProps } from './EditNodeUploadDocuments.types';

export const EditNodeUploadDocuments: FC<EditNodeUploadDocumentsProps> = ({
  documents,
  setDocuments,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDocsExist = documents.length !== 0;

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      {!isDocsExist && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет докуменов"
        />
      )}
      {isDocsExist && (
        <DocumentsList
          documents={documents}
          removeDocument={(id) =>
            setDocuments(documents.filter((document) => document.id !== id))
          }
          isLoading={false}
        />
      )}
      <OpenModalText onClick={openModal}>+ Добавить документ</OpenModalText>

      <EditNodeUploadDocumentsModal
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={(newDocument) => {
          setDocuments([...documents, newDocument]);
          closeModal();
        }}
      />
    </>
  );
};
