import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { groupReportFormId } from './groupReportService.constants';
import { groupReportService } from './groupReportService.model';
import { SendReportToEmailContainer } from './sendReportToEmailService';
import { GroupReportForm } from './view/GroupReportForm';
import './groupReportService.relations';

const { inputs, outputs, gates } = groupReportService;
const { GroupReportGate } = gates;

export const GroupReportContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const reportFilters = useStore(outputs.$reportFilters);
  const isFiltersLoading = useStore(outputs.$isFiltersLoading);
  const isDownloading = useStore(outputs.$isDownloading);

  const handleCloseModal = useEvent(inputs.closeModal);
  const downloadReport = useEvent(inputs.setGroupReportPayload);

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
