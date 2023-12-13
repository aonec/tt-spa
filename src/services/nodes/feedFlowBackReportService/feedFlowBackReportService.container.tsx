import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { feedFlowBackReportService } from './feedFlowBackReportService.model';
import { FeedFlowBackReportForm } from './view/FeedFlowBackReportForm';

const formId = 'feed-flow-back-report-form';

const { inputs, outputs } = feedFlowBackReportService;

export const FeedFlowBackReportContainer = () => {
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
    closeModal: inputs.closeFeedFlowBackReportModal,
    handleExportReport: inputs.handleExportReport,
  });

  return (
    <FormModal
      title="Выгрузить сводный отчёт по обратной магистрали"
      submitBtnText="Выгрузить отчёт"
      onCancel={() => closeModal()}
      visible={isModalOpen}
      formId={formId}
      loading={isLoading}
      form={
        <FeedFlowBackReportForm
          formId={formId}
          existingCities={existingCities}
          houseManagements={houseManagements}
          handleExportReport={handleExportReport}
        />
      }
    />
  );
};
