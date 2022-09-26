import { useStore } from 'effector-react';
import { ETaskConfirmationType } from 'myApi';
import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { completionStageService } from './completionStageService.model';
import { CompletionSelect } from './view/CompletionSelect';

const { outputs } = completionStageService;

export const CompletionStageContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const taskConfirmationTypes = useStore(outputs.$taskConfirmationTypes);

  function handleChangeConfirmation(confirmationType: ETaskConfirmationType) {
    handleChange({ taskConfirmationType: confirmationType });
  }

  return (
    <CompletionSelect
      taskConfirmationTypes={taskConfirmationTypes}
      handleChangeConfirmation={handleChangeConfirmation}
    />
  );
};
