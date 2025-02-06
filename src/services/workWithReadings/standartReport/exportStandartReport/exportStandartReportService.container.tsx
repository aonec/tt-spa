import { useUnit } from 'effector-react';
import { ExportStandartReportModal } from './ExportStandartReportModal';
import { exportStandartReportService } from './exportStandartReportService.models';
import { lastIndividualDevicesExportPollQuery } from './exportStandartReportService.api';

const { inputs, outputs } = exportStandartReportService;

export const ExportStandartReportContainer = () => {
  const { isModalOpen, closeModal, handleStartExport } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
    handleStartExport: inputs.handleStartIndividualDevicesExportPoll,
    lastPollState: lastIndividualDevicesExportPollQuery.$data,
  });

  return (
    <>
      <ExportStandartReportModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleStartExport={handleStartExport}
        lastPollState={null}
      />
    </>
  );
};
