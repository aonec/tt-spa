
import { Button } from 'antd';
import React, { useState } from 'react';
import { FileData, useFilesUpload } from '../../../../hooks/useFilesUpload';
import { DragAndDrop } from '../../../../shared/ui/DragAndDrop';
import { FilesList } from '../../../../shared/ui/FilesList';
import { Wide } from '../../../../shared/ui/FilesUpload';
import { StyledModal, Header, Footer } from '../../../../shared/ui/Modal/Modal';
import { ButtonTT } from '../../../../tt-components';

interface Props {
  onAddHandler(file: FileData): void;
}

const max = 1;

export const DocumentsUpload: React.FC<Props> = ({ onAddHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { files, addFile, removeFile, clearFiles } = useFilesUpload();

  const file = files[0];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onAddFileHandler = () => {
    closeModal();
    clearFiles();
    onAddHandler(file);
  };

  const modal = (
    <StyledModal
      title={<Header>Добавление документа</Header>}
      visible={isModalOpen}
      onCancel={closeModal}
      width={800}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={closeModal}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            key="submit"
            disabled={!(file?.status === 'done')}
            onClick={onAddFileHandler}
          >
            Добавить
          </ButtonTT>
        </Footer>
      }
    >
      <Wide>
        <FilesList files={files} removeFile={removeFile} />

        {max > files.length && (
          <DragAndDrop
            accept="application/pdf"
            text={'Нажмите для выбора'}
            style={{ marginTop: '15px' }}
            uniqId={`files-upload-component`}
            fileHandler={(files) => addFile(files[0])}
          />
        )}
      </Wide>
    </StyledModal>
  );

  return (
    <>
      <Button
        size="large"
        type="link"
        onClick={openModal}
        style={{ marginTop: '10px' }}
      >
        + Добавить документ
      </Button>
      {modal}
    </>
  );
};
