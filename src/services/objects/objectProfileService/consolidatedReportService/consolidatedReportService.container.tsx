import React, { FC } from 'react';
import { useEvent, useStore } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { consolidatedReportService } from './consolidatedReportService.model';
import { ConsolidatedReportForm } from './view/ConsolidatedReportForm';
import { Props } from './consolidatedReportService.types';

const { inputs, outputs } = consolidatedReportService;

const formId = 'consolidated-report-form';

export const ConsolidatedReportContainer: FC<Props> = ({ housingStock }) => {
  const closeModal = useEvent(inputs.closeConsolidatedReportModal);
  const handleSubmit = useEvent(inputs.handleSubmit);

  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <FormModal
      title="Выгрузка сводного отчёта"
      visible={isModalOpen}
      loading={isLoading}
      onCancel={() => closeModal()}
      formId={formId}
      submitBtnText="Выгрузить отчет"
      form={
        <ConsolidatedReportForm
          handleSubmit={handleSubmit}
          housingStock={housingStock}
          formId={formId}
        />
      }
    />
  );
};
