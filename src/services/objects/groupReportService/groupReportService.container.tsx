import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { groupReportFormId } from './groupReportService.constants';
import { groupReportService } from './groupReportService.model';
import { SendReportToEmailContainer } from './sendReportToEmailService';
import { GroupReportForm } from './view/GroupReportForm';

const { inputs, outputs, gates } = groupReportService;
const { GroupReportGate } = gates;

export const GroupReportContainer = () => {
  const {
    downloadReport,
    handleCloseModal,
    isDownloading,
    isFiltersLoading,
    isOpen,
    reportFilters,
  } = useUnit({
    isOpen: outputs.$isOpen,
    reportFilters: outputs.$reportFilters,
    isFiltersLoading: outputs.$isFiltersLoading,
    isDownloading: outputs.$isDownloading,
    handleCloseModal: inputs.closeModal,
    downloadReport: inputs.setGroupReportPayload,
  });

  return (
    <>
      <GroupReportGate />
      <SendReportToEmailContainer />
      <FormModal
        title="Выгрузить групповой отчёт"
        formId={groupReportFormId}
        visible={isOpen}
        submitBtnText="Выгрузить отчёт"
        onCancel={() => handleCloseModal()}
        loading={isDownloading}
        form={
          <WithLoader isLoading={isFiltersLoading}>
            {reportFilters && (
              <GroupReportForm
                formId={groupReportFormId}
                handleDownload={downloadReport}
                reportFilters={reportFilters}
              />
            )}
          </WithLoader>
        }
      />
    </>
  );
};
