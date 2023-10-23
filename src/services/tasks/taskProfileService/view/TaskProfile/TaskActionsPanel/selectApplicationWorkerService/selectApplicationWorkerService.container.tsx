import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { SelectApplicationWorker } from './view/SelectApplicationWorker';
import { selectApplicationWorkerService } from './selectApplicationWorkerService.models';
import { ActionComponentProps } from '../TaskActionsPanel.types';

const {
  gates: { SelectApplicationWorkerGate },
  inputs,
  outputs,
} = selectApplicationWorkerService;

export const SelectApplicationWorkerContainer: FC<ActionComponentProps> = ({
  handleChange,
  task,
}) => {
  const { applicationBrigade } = useUnit({
    applicationBrigade: outputs.$applicationBrigade,
  });

  const handleSelectWorker = (workerId: number) => {
    handleChange();
  };

  return (
    <>
      <SelectApplicationWorkerGate taskId={task.id} />
      <SelectApplicationWorker applicationBrigade={applicationBrigade} />
    </>
  );
};
