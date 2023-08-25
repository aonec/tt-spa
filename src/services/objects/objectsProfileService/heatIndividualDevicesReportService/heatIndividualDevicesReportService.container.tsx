import React from 'react';
import { useUnit } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { heatIndividualDevicesReportService } from './heatIndividualDevicesReportService.model';
import { HeatIndividualDevicesReportForm } from './view/HeatIndividualDevicesReportForm';

const { inputs, outputs } = heatIndividualDevicesReportService;
const formId = 'heat-individual-devices-report';

export const HeatIndividualDevicesReportContainer = () => {
  const {
    isOpen,
    selectedCity,
    treeData,
    isLoading,
    selectedBuilding,
    closeModal,
    handleDownloadModal,
    selectCity,
  } = useUnit({
    isOpen: outputs.$isOpen,
    selectedCity: outputs.$selectedCity,
    treeData: outputs.$treeData,
    isLoading: outputs.$isLoading,
    selectedBuilding: outputs.$selectedBuilding,
    closeModal: inputs.closeModal,
    handleDownloadModal: inputs.downloadReport,
    selectCity: inputs.selectCity,
  });

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
          selectedBuilding={selectedBuilding}
        />
      }
    />
  );
};
