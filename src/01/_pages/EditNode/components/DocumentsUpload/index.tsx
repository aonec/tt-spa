import { FileData } from '01/hooks/useFilesUpload';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { StyledModal, Header, Footer } from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { Button } from 'antd';
import React, { useState } from 'react';

interface Props {
  onAddHandler(file: FileData): void;
}

export const DocumentsUpload: React.FC<Props> = ({ onAddHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [file, setFile] = useState<FileData | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onAddFileHandler = () => {
    closeModal();
    setFile(null);
    onAddHandler(file!);
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
      <FilesUpload
        uniqId="upload-documents-in-node-modal"
        max={1}
        text="Нажмите для выбора"
        onChange={(files) => {
          console.log(files);
          setFile(files.length ? files[0] : null);
        }}
      />
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
