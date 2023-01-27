import { useStore } from 'effector-react';
import { ETaskConfirmationType } from 'myApi';
import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { completionStageService } from './completionStageService.model';
import { CompletionSelect } from './view/CompletionSelect';
import { CompletionComment } from './view/CompletionComment';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const { outputs } = completionStageService;

export const CompletionStageContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const taskConfirmationTypes = useStore(outputs.$taskConfirmationTypes);

  const taskType = useStore(outputs.$taskType);

  const payload = useStore(taskProfileService.outputs.$pushStageRequestPayload);

  function handleChangeConfirmationType(
    confirmationType: ETaskConfirmationType,
  ) {
    handleChange((prev) => ({
      ...prev,
      taskConfirmation: {
        ...(prev.taskConfirmation || {}),
        type: confirmationType,
      },
    }));
  }

  function handleChangeComment(comment: string) {
    handleChange((prev) => {
      if (!prev.taskConfirmation) {
        return {};
      }

      return {
        ...prev,
        taskConfirmation: { ...(prev.taskConfirmation || {}), comment },
      };
    });
  }

  if (!taskConfirmationTypes?.length) return null;

  return (
    <>
      <CompletionSelect
        taskConfirmationTypes={taskConfirmationTypes}
        handleChangeConfirmation={handleChangeConfirmationType}
        taskType={taskType}
      />
      <CompletionComment
        disabled={!payload.taskConfirmation?.type}
        handleChangeComment={handleChangeComment}
      />
    </>
  );
};
