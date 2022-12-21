import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { consolidatedReportService } from './consolidatedReportService.model';
import { ConsolidatedReportForm } from './view/ConsolidatedReportForm';

const { inputs, outputs } = consolidatedReportService;

const formId = 'consolidated-report-form';

export const ConsolidatedReportContainer = () => {
  const closeModal = useEvent(inputs.closeConsolidatedReportModal);

  const isModalOpen = useStore(outputs.$isModalOpen);

  return (
    <FormModal
      title="Выгрузка сводного отчёта"
      visible={isModalOpen}
      onCancel={() => closeModal()}
      formId={formId}
      submitBtnText="Выгрузить отчет"
      form={<ConsolidatedReportForm formId={formId} />}
    />
  );
};
