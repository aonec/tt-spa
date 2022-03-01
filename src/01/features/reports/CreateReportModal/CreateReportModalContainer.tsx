import { useStore } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { outputs } from './models';

export const CreateReportModalContainer = () => {
  const { $isModalOpen } = outputs;
  const isOpen = useStore($isModalOpen);

  return <CreateReportModal isOpen={isOpen} />;
};
