import React from 'react';
import { useStore } from 'effector-react';
import {
  $downloadDevicesReportError,
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
} from './models';
import { Alert, Form } from 'antd';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Input } from 'ui-kit/Input';

const formId = 'device-report-modal';

export const DevicesReportModal = () => {
  const isVisible = useStore($isDeviceReportModalVisible);
  const pending = useStore(downloadDevicesReportFx.pending);
  const downloadError = useStore($downloadDevicesReportError);
  const handleCancel = () => downloadDeviceReportCancelButtonClicked();
  const onSubmit = () => downloadDeviceReportConfirmButtonClicked();

  return (
    <FormModal
      title="Выгрузить список приборов"
      visible={isVisible}
      onCancel={handleCancel}
      loading={pending}
      onSubmit={onSubmit}
      formId={formId}
      form={
        <>
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
            <Input disabled value={'Список приборов.xlsx'} />
          </Form.Item>
        </>
      }
    />
  );
};
