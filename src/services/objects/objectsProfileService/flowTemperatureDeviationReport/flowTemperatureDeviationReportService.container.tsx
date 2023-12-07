import React from 'react';
import { flowTemperatureDeviationReportService } from './flowTemperatureDeviationReportService.models';
import { useUnit } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FeedFlowTemperatureReportForm } from './view/FeedFlowTemperatureReportForm';

const formId = 'feed-flow-temperature-report-form';

const { inputs, outputs } = flowTemperatureDeviationReportService;

export const FlowTemperatureDeviationReportContainer = () => {
  const {
    closeModal,
    existingCities,
    handleExportReport,
    houseManagements,
    isLoading,
    isModalOpen,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    existingCities: outputs.$existingCities,
    houseManagements: outputs.$houseManagements,
    isLoading: outputs.$isLoading,
    closeModal: inputs.closeFlowTemperatureDeviationReportModal,
    handleExportReport: inputs.handleExportReport,
  });

  return (
    <FormModal
      title="Выгрузить сводный отчёт по ГВС"
      submitBtnText="Выгрузить отчёт"
      onCancel={() => closeModal()}
      visible={isModalOpen}
      formId={formId}
      loading={isLoading}
      form={
        <FeedFlowTemperatureReportForm
          formId={formId}
          existingCities={existingCities}
          houseManagements={houseManagements}
          handleExportReport={handleExportReport}
        />
      }
    />
  );
};
