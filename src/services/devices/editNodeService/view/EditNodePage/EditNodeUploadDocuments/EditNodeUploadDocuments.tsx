import { FilesList } from '01/shared/ui/FilesList';
import { Empty } from 'antd';
import { DocumentLiteResponse } from 'myApi';
import React, { FC, useState } from 'react';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { DocumentsList } from 'ui-kit/DocumentsService/view/DocumentsList';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditNodeUploadDocumentsModal } from './EditNodeUploadDocumentsModal';
import { OpenModalText } from './EditNodeUploadDocuments.styled';
import { EditNodeUploadDocumentsProps } from './EditNodeUploadDocuments.types';

export const EditNodeUploadDocuments: FC<EditNodeUploadDocumentsProps> = ({
  documents,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [docs, setDocuments] = useState<DocumentLiteResponse[]>(documents);

  const isDocsExist = docs.length !== 0;

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
          documents={docs}
          removeDocument={(id) =>
            setDocuments((prev) =>
              prev.filter((document) => document.id !== id)
            )
          }
          isLoading={false}
        />
      )}
      <OpenModalText onClick={openModal}>+ Добавить документ</OpenModalText>

      <EditNodeUploadDocumentsModal
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={(newDocument) => {
          setDocuments((docs) => [...docs, newDocument]);
          closeModal();
        }}
      />
    </>
  );
};
