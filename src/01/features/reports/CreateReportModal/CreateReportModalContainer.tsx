import { useStore } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { inputs, outputs } from './models';

export const CreateReportModalContainer = () => {
  const { $isModalOpen } = outputs;
  const { closeModalButonClicked } = inputs;
  const isOpen = useStore($isModalOpen);

  return <CreateReportModal isOpen={isOpen} onHide={closeModalButonClicked} />;
};
