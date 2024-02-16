import React, { FC, useState } from 'react';
import { AddTemperatureFileModalProps } from './AddTemperatureFileModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import {
  LeftBlock,
  ButtonFloat,
  RightBlock,
  AlertWrapper,
  FormWrapper,
} from './AddTemperatureFileModal.styled';
import { Alert } from 'ui-kit/Alert';
import { DocumentBlueIcon } from 'ui-kit/icons';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';

const formId = 'Add-Temperature-File-Modal';

export const AddTemperatureFileModal: FC<AddTemperatureFileModalProps> = ({
  isModalOpen,
  setModalOpen,
  handleGetTemplateFile,
  isFileLoading,
}) => {
  const [document, setDocument] = useState<Document | null>(null);

  return (
    <FormModal
      loading={isFileLoading}
      title="Загрузить новый температурный график"
      visible={isModalOpen}
      onCancel={() => setModalOpen(false)}
      formId={formId}
      customSubmit={<ButtonFloat>Загрузить график</ButtonFloat>}
      form={
        <FormWrapper>
          <Alert centered>
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

          <DocumentsUploadContainer
            label="Перетащите файл или загрузите его с компьютера"
            uniqId="temperature-file"
            documents={document ? [document] : []}
            onChange={(value) => {
              setDocument(value[0]);
            }}
            max={1}
            url="ManagingFirms/TemperatureNormatives/CreateOrUpdateFromFile"
          />
        </FormWrapper>
      }
    />
  );
};
