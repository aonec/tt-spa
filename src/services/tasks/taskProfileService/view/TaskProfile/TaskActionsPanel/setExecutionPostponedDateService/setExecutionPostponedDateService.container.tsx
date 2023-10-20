import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { ExecutionPostponedDatePicker } from './view/ExecutionPostponedDatePicker';
import { StageChanges } from './setExecutionPostponedDateService.types';

export const SetExecutionPostponedDateContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  function handleStageChanges({
    applicationPostponeDate,
    comment,
  }: StageChanges) {
    handleChange({ applicationPostponeDate, comment });
  }

  return <ExecutionPostponedDatePicker handleStageChanges={handleStageChanges} />;
};
