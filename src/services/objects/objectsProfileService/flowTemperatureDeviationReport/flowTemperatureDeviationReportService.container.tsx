import React from 'react';
import { flowTemperatureDeviationReportService } from './flowTemperatureDeviationReportService.models';
import { useEvent, useStore } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FeedFlowTemperatureReportForm } from './view/FeedFlowTemperatureReportForm';

const formId = 'feed-flow-temperature-report-form';

const { inputs, outputs } = flowTemperatureDeviationReportService;

export const FlowTemperatureDeviationReportContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const existingCities = useStore(outputs.$existingCities);
  const houseManagements = useStore(outputs.$houseManagements);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeFlowTemperatureDeviationReportModal);
  const handleExportReport = useEvent(inputs.handleExportReport);

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
