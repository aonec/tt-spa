import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { feedFlowBackReportService } from './feedFlowBackReportService.model';
import { FeedFlowBackReportForm } from './view/FeedFlowBackReportForm';

const formId = 'feed-flow-back-report-form';

const { inputs, outputs } = feedFlowBackReportService;

export const FeedFlowBackReportContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const existingCities = useStore(outputs.$existingCities);
  const houseManagements = useStore(outputs.$houseManagements);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeFeedFlowBackReportModal);
  const handleExportReport = useEvent(inputs.handleExportReport);

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
