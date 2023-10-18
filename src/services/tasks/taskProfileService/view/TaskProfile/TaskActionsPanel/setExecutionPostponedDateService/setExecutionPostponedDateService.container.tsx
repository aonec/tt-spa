import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { ExecutionPostponedDatePicker } from './view/ExecutionPostponedDatePicker';

export const SetExecutionPostponedDateContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  function handleDateChange(applicationPostponeDate: string) {
    handleChange({ applicationPostponeDate });
  }

  return <ExecutionPostponedDatePicker handleDateChange={handleDateChange} />;
};
