import { useStore } from 'effector-react';
import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { switchOrCompleteService } from './switchOrCompleteService.model';
import { SwitchOrCompleteCheckbox } from './view/SwitchOrCompleteCheckbox';

const { outputs, gates } = switchOrCompleteService;

const { NextStagesGate } = gates;

export const SwitchOrCompleteContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const { taskId } = useParams<{ taskId: string }>();

  const nextStages = useStore(outputs.$nextStages);

  const handleChangeCheckbox = useCallback(
    (checked: boolean) => {
      const finalStage = nextStages?.find((elem) => elem.type === 'Final');

      handleChange({
        nextStageId: checked ? finalStage?.id : undefined,
      });
    },
    [nextStages, handleChange],
  );

  return (
    <>
      <NextStagesGate taskId={Number(taskId)} />
      <SwitchOrCompleteCheckbox handleChange={handleChangeCheckbox} />
    </>
  );
};
