import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { soiReportService } from './soiReportService.model';
import { SoiReportModal } from './view/SoiReportModal';

const { inputs, outputs } = soiReportService;

export const SoiReportContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const closeSoiReportModal = useEvent(inputs.closeSoiReportModal);

  return (
    <SoiReportModal
      isModalOpen={isModalOpen}
      closeSoiReportModal={() => closeSoiReportModal()}
    />
  );
};
