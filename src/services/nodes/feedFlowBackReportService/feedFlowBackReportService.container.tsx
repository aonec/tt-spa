import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { feedFlowBackReportService } from './feedFlowBackReportService.model';
import { FeedFlowBackReportForm } from './view/FeedFlowBackReportForm';

const formId = 'feed-flow-back-report-form';

const { inputs, outputs } = feedFlowBackReportService;

export const FeedFlowBackReportContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const closeModal = useEvent(inputs.closeFeedFlowBackReportModal);

  return (
    <FormModal
      title="Выгрузить сводный отчёт по обратной магистрали"
      submitBtnText="Выгрузить отчёт"
      onCancel={() => closeModal()}
      visible={isModalOpen}
      formId={formId}
      form={<FeedFlowBackReportForm />}
    />
  );
};
