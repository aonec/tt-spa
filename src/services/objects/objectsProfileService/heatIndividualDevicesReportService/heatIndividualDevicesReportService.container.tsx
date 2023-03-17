import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { heatIndividualDevicesReportService } from './heatIndividualDevicesReportService.model';
import { HeatIndividualDevicesReportForm } from './view/HeatIndividualDevicesReportForm';

const { inputs, outputs } = heatIndividualDevicesReportService;
const formId = 'heat-individual-devices-report';

export const HeatIndividualDevicesReportContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const selectedCity = useStore(outputs.$selectedCity);
  const treeData = useStore(outputs.$treeData);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeModal);
  const handleDownloadModal = useEvent(inputs.downloadReport);
  const selectCity = useEvent(inputs.selectCity);

  return (
    <FormModal
      title="Выгрузить сводный отчёт по ИПУ"
      submitBtnText="Выгрузить отчёт"
      formId={formId}
      visible={isOpen}
      loading={isLoading}
      onCancel={closeModal}
      form={
        <HeatIndividualDevicesReportForm
          handleDownloadModal={handleDownloadModal}
          selectCity={selectCity}
          selectedCity={selectedCity}
          formId={formId}
          treeData={treeData}
        />
      }
    />
  );
};
