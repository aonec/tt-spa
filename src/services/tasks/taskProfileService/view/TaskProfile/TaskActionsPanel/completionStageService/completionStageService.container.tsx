import { useStore } from 'effector-react';
import { ETaskConfirmationType } from 'myApi';
import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { completionStageService } from './completionStageService.model';
import { CompletionSelect } from './view/CompletionSelect';
import { CompletionComment } from './view/CompletionComment';

const { outputs } = completionStageService;

export const CompletionStageContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const taskConfirmationTypes = useStore(outputs.$taskConfirmationTypes);

  const taskType = useStore(outputs.$taskType);

  function handleChangeConfirmation(confirmationType: ETaskConfirmationType) {
    handleChange({ taskConfirmationType: confirmationType });
  }

  return (
    <>
      <CompletionSelect
        taskConfirmationTypes={taskConfirmationTypes}
        handleChangeConfirmation={handleChangeConfirmation}
        taskType={taskType}
      />
      <CompletionComment />
    </>
  );
};
