import React, { FC } from 'react';
import { AddTemperatureFileModalProps } from './AddTemperatureFileModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import {
  LeftBlock,
  ButtonFloat,
  RightBlock,
  AlertWrapper,
} from './AddTemperatureFileModal.styled';
import { Alert } from 'ui-kit/Alert';
import { DocumentBlueIcon } from 'ui-kit/icons';

const formId = 'Add-Temperature-File-Modal';

export const AddTemperatureFileModal: FC<AddTemperatureFileModalProps> = ({
  isModalOpen,
  setModalOpen,
  handleGetTemplateFile,
}) => {
  return (
    <FormModal
      // loading={isLoading}
      title="Загрузить новый температурный график"
      visible={isModalOpen}
      onCancel={() => setModalOpen(false)}
      formId={formId}
      customSubmit={<ButtonFloat>Загрузить график</ButtonFloat>}
      form={
        <>
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
        </>
      }
    />
  );
};
