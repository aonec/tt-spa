import { useUnit } from 'effector-react';
import { ExportStandartReportModal } from './ExportStandartReportModal';
import { exportStandartReportService } from './exportStandartReportService.models';

const { inputs, outputs } = exportStandartReportService;

export const ExportStandartReportContainer = () => {
  const { isModalOpen, closeModal } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    closeModal: inputs.closeModal,
  });

  return (
    <>
      <ExportStandartReportModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
