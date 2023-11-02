import React, { FC } from 'react';
import { SetApplicationCompletionDate } from './view/SetApplicationCompletionDate';
import { ActionComponentProps } from '../TaskActionsPanel.types';

export const SetApplicationCompletionDateContainer: FC<
  ActionComponentProps
> = ({ handleChange }) => {
  function handleDateChange(applicationCompletionDate: string) {
    handleChange({ applicationCompletionDate });
  }

  return <SetApplicationCompletionDate handleDateChange={handleDateChange} />;
};
