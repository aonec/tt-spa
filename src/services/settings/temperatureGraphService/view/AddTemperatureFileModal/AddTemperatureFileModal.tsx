import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Alert } from 'ui-kit/Alert';
import { DocumentBlueIcon } from 'ui-kit/icons';
import { DocumentPreload } from 'ui-kit/DocumentPreload';
import { AddTemperatureFileModalProps } from './AddTemperatureFileModal.types';
import {
  AlertWrapper,
  ButtonFloat,
  FormWrapper,
  LeftBlock,
  RightBlock,
} from './AddTemperatureFileModal.styled';

const formId = 'Add-Temperature-File-Modal';
const accept = '.xlsx';

export const AddTemperatureFileModal: FC<AddTemperatureFileModalProps> = ({
  isModalOpen,
  setModalOpen,
  handleGetTemplateFile,
  isFileLoading,
  handlePostTemplateFile,
  file,
  setFile,
}) => {
  const handleSubmit = () => {
    if (file) handlePostTemplateFile(file);
  };

  return (
    <FormModal
      title="Загрузить новый температурный график"
      visible={isModalOpen}
      onCancel={() => setModalOpen(false)}
      formId={formId}
      customSubmit={
        <ButtonFloat
          disabled={!file}
          onClick={handleSubmit}
          isLoading={isFileLoading}
        >
          Загрузить график
        </ButtonFloat>
      }
      form={
        <FormWrapper>
          <Alert icon="info" centered>
            <AlertWrapper>
              <LeftBlock>
                <DocumentBlueIcon />
                <div>Пример файла для загрузки</div>
              </LeftBlock>
              <RightBlock onClick={handleGetTemplateFile}>
                Скачать файл
              </RightBlock>
            </AlertWrapper>
          </Alert>

          <DocumentPreload
            label="Перетащите файл или загрузите его с компьютера"
            uniqId="temperature-file"
            file={file}
            setFile={setFile}
            accept={accept}
          />
        </FormWrapper>
      }
    />
  );
};
