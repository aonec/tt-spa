import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { DevicesReportModalForm } from './view/DevicesReportModalForm';
import { devicesReportService } from './devicesReportService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = devicesReportService;
const formId = 'devices-report-modal';

export const DevicesReportContainer = () => {
  const { closeModal, handleDownloadDeviceReport, isLoading, isOpen } = useUnit(
    {
      isOpen: outputs.$isOpen,
      isLoading: outputs.$isLoading,
      closeModal: inputs.closeModal,
      handleDownloadDeviceReport: inputs.downloadDeviceReport,
    },
  );

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
