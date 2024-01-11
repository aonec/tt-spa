import { useUnit } from 'effector-react';
import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { switchStageSelectService } from './switchStageSelectService.model';
import { SwitchStageSelect } from './view/SwitchStageSelect';

const {
  outputs,
  gates: { NextStagesGate },
} = switchStageSelectService;

export const SwitchStageSelectContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const { nextStages } = useUnit({ nextStages: outputs.$nextStages });
  const { taskId } = useParams<{ taskId: string }>();

  const handleSelectedNextStageChange = useCallback(
    (nextStageId: number) => {
      handleChange({ nextStageId });
    },
    [handleChange],
  );

  return (
    <>
      <NextStagesGate taskId={Number(taskId)} />
      <SwitchStageSelect
        nextStages={nextStages}
        handleChange={handleSelectedNextStageChange}
      />
    </>
  );
};
