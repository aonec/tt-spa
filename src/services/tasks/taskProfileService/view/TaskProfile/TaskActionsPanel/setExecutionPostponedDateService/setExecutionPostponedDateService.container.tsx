import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { ExecutionPostponedDatePicker } from './view/ExecutionPostponedDatePicker';
import { StageChanges } from './setExecutionPostponedDateService.types';

export const SetExecutionPostponedDateContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const handleStageChanges = useCallback(
    function ({ applicationPostponeDate }: StageChanges) {
      handleChange({ applicationPostponeDate });
    },
    [handleChange],
  );

  return (
    <ExecutionPostponedDatePicker handleStageChanges={handleStageChanges} />
  );
};
