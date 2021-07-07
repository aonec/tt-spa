import { FileData } from '01/hooks/useFilesUpload';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { StyledModal, Header, Footer } from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { Button } from 'antd';
import React, { useState } from 'react';

export const DocumentsUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [file, setFile] = useState<FileData | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <Button type="link" onClick={openModal}>
        + Добавить документ
      </Button>
      {modal}
    </>
  );
};
