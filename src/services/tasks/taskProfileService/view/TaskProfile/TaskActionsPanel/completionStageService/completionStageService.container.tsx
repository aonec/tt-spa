import { useUnit } from 'effector-react';
import { ETaskConfirmationType } from 'api/types';
import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { completionStageService } from './completionStageService.model';
import { CompletionSelect } from './view/CompletionSelect';
import { CompletionComment } from './view/CompletionComment';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const { outputs } = completionStageService;

export const CompletionStageContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const { payload, taskConfirmationTypes, taskType } = useUnit({
    taskConfirmationTypes: outputs.$taskConfirmationTypes,
    taskType: outputs.$taskType,
    payload: taskProfileService.outputs.$pushStageRequestPayload,
  });

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

  const handleChangeComment = useCallback(
    (comment: string) => {
      handleChange((prev) => {
        if (!prev.taskConfirmation) {
          return {};
        }

        return {
          ...prev,
          taskConfirmation: { ...(prev.taskConfirmation || {}), comment },
        };
      });
    },
    [handleChange],
  );

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
