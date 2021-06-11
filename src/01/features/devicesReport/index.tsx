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
import ButtonTT from '../../tt-components/ButtonTT';
import { Loader } from '../../_components/Loader';
import InputTT from '../../tt-components/InputTT';
import { Alert, Form } from 'antd';

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
          <ButtonTT color={'white'} key="back" onClick={handleCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            disabled={pending}
            key="submit"
            onClick={onSubmit}
          >
            {pending ? <Loader show={true} /> : 'Выгрузить'}
          </ButtonTT>
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
