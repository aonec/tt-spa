import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { DevicesReportModalForm } from './view/DevicesReportModalForm';
import { devicesReportService } from './devicesReportService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = devicesReportService;
const formId = 'devices-report-modal';

export const DevicesReportContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeModal);
  const handleDownloadDeviceReport = useEvent(inputs.downloadDeviceReport);

  return (
    <FormModal
      title="Выгрузить список приборов"
      description="При выгрузке списка прибров сохраняются все параметры фильтрации"
      submitBtnText="Выгрузить список"
      formId={formId}
      visible={isOpen}
      loading={isLoading}
      onCancel={closeModal}
      form={
        <DevicesReportModalForm
          formId={formId}
          handleDownloadDeviceReport={handleDownloadDeviceReport}
        />
      }
    />
  );
};
