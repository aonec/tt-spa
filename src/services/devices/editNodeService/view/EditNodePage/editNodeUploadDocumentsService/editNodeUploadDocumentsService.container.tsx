import { Empty } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { DocumentsList } from 'ui-kit/DocumentsService/view/DocumentsList';
import { editNodeUploadDocumentsService } from './editNodeUploadDocumentsService.model';
import { OpenModalText } from './editNodeUploadDocumentsService.styled';
import { EditNodeUploadDocumentsModal } from './view/EditNodeUploadDocumentsModal';

const { inputs, outputs } = editNodeUploadDocumentsService;

export const EditNodeUploadDocumentsContainer = () => {
  const documents = useStore(outputs.$documents);
  const isOpen = useStore(outputs.$isOpenModal);

  const updateDocuments = useEvent(inputs.updateDocuments);
  const openModal = useEvent(inputs.openModal);
  const closeModal = useEvent(inputs.closeModal);

  const isDocsExist = documents.length !== 0;

  return (
    <>
      <EditNodeUploadDocumentsModal
        closeModal={() => closeModal()}
        isOpen={isOpen}
        onSubmit={(newDocument) => {
          updateDocuments([...documents, newDocument]);
          closeModal();
        }}
      />

      {!isDocsExist && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет докуменов"
        />
      )}
      {isDocsExist && <DocumentsList documents={documents} isLoading={false} />}

      <OpenModalText onClick={() => openModal()}>
        + Добавить документ
      </OpenModalText>
    </>
  );
};
