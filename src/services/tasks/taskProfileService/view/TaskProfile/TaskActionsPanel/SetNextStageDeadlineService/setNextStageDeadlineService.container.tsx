import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { SetNextStageDeadlineDatepicker } from './view/SetNextStageDeadlineDatepicker';

export const SetNextStageDeadlineContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  function handleDateChange(nextStageDeadline: string) {
    handleChange({ nextStageDeadline });
  }

  return <SetNextStageDeadlineDatepicker handleDateChange={handleDateChange} />;
};
