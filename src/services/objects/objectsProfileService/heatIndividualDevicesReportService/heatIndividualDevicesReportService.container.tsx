import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { heatIndividualDevicesReportService } from './heatIndividualDevicesReportService.model';
import { HeatIndividualDevicesReportForm } from './view/HeatIndividualDevicesReportForm';

const { inputs, outputs } = heatIndividualDevicesReportService;
const formId = 'heat-individual-devices-report';

export const HeatIndividualDevicesReportContainer = () => {
  const isOpen = useStore(outputs.$isOpen);

  const closeModal = useEvent(inputs.closeModal);
  const handleDownloadModal = useEvent(inputs.downloadReport);

  return (
    <FormModal
      title="Выгрузить сводный отчёт по ИПУ"
      submitBtnText="Выгрузить отчёт"
      formId={formId}
      visible={isOpen}
      onCancel={closeModal}
      form={
        <HeatIndividualDevicesReportForm
          handleDownloadModal={handleDownloadModal}
        />
      }
    />
  );
};
