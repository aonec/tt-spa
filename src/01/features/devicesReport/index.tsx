import React from 'react';
import { Footer, Header } from '../../shared/ui/Modal/Modal';
import { StyledModal, StyledModalBody } from '../../tt-components/Modal';
import { useStore } from 'effector-react';
import {
  $downloadDevicesReportError,
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
} from './models';
import InputTT from '../../tt-components/InputTT';
import { Alert, Form } from 'antd';
import { Button } from 'ui-kit/Button';

export const DevicesReportModal = () => {
  const isVisible = useStore($isDeviceReportModalVisible);
  const pending = useStore(downloadDevicesReportFx.pending);
  const downloadError = useStore($downloadDevicesReportError);
  const handleCancel = () => downloadDeviceReportCancelButtonClicked();
  const onSubmit = () => downloadDeviceReportConfirmButtonClicked();

  return (
    <StyledModal
      visible={isVisible}
      width={800}
      onCancel={handleCancel}
      footer={
        <Footer>
          <Button type="ghost" key="back" onClick={handleCancel}>
            Отмена
          </Button>
          <Button isLoading={pending} disabled={pending} onClick={onSubmit}>
            Выгрузить
          </Button>
        </Footer>
      }
    >
      <StyledModalBody>
        <Header style={{ marginBottom: 8 }}>Выгрузить список приборов</Header>
        {downloadError ? (
          <Alert
            message="Ошибка"
            // description="Не удалось выгрузить список приборов. Попробуйте еще раз или обратитесь к администратору"
            description={downloadError}
            type="error"
            showIcon
            closable
            style={{ marginBottom: 24 }}
          />
        ) : null}
        <div style={{ marginBottom: 16 }}>
          При выгрузке списка приборов сохраняются все параметры фильтрации
        </div>
        <Form.Item label="Название списка">
          <InputTT readOnly value={'Список приборов.xlsx'} />
        </Form.Item>
      </StyledModalBody>
    </StyledModal>
  );
};
