import { useUnit } from 'effector-react';
import { ExportStandartReportModal } from './ExportStandartReportModal';
import { exportStandartReportService } from './exportStandartReportService.models';
import { lastIndividualDevicesExportPollQuery } from './exportStandartReportService.api';
import { organizationsQuery } from '../standartReportService.api';

const { inputs, outputs } = exportStandartReportService;

export const ExportStandartReportContainer = () => {
  const {
    isModalOpen,
    closeModal,
    handleStartExport,
    lastPollState,
    isLoadingPollState,
    organizations,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
    handleStartExport: inputs.handleStartIndividualDevicesExportPoll,
    lastPollState: lastIndividualDevicesExportPollQuery.$data,
    isLoadingPollState: lastIndividualDevicesExportPollQuery.$pending,
    organizations: organizationsQuery.$data,
  });

  return (
    <>
      <ExportStandartReportModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleStartExport={handleStartExport}
        lastPollState={lastPollState}
        isLoadingPollState={isLoadingPollState}
        organizations={organizations}
      />
    </>
  );
};
