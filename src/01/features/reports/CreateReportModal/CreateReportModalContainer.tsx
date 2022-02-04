import { useStore } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { createReportOutputs } from './models';

const { $isModalOpen } = createReportOutputs;

export const CreateReportModalContainer = () => {
  const isOpen = useStore($isModalOpen);

  return <CreateReportModal isOpen={isOpen} />;
};
