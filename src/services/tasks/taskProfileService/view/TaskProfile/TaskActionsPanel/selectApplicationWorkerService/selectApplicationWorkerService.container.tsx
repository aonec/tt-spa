import React from 'react';
import { useUnit } from 'effector-react';
import { SelectApplicationWorker } from './view/SelectApplicationWorker';
import { selectApplicationWorkerService } from './selectApplicationWorkerService.models';
import { useParams } from 'react-router-dom';

const {
  gates: { SelectApplicationWorkerGate },
  inputs,
  outputs,
} = selectApplicationWorkerService;

export const SelectApplicationWorkerContainer = () => {
  const { applicationBrigade } = useUnit({
    applicationBrigade: outputs.$applicationBrigade,
  });

  const taskId = useParams<{ taskId: string }>();

  return (
    <>
      <SelectApplicationWorkerGate taskId={Number(taskId)} />
      <SelectApplicationWorker applicationBrigade={applicationBrigade} />
    </>
  );
};
