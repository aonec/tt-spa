import { useForm } from 'effector-forms/dist';
import React, { ReactElement } from 'react';
import { form } from '../models';
import { ReportType } from '../types';
import { PeriodDatePicker } from './PeriodDatePicker';

export const PeriodDatePickerContainer = () => {
  const {
    fields: {
      type: { value: type },
    },
  } = useForm(form);

  const datePickers: { [key in ReportType]: ReactElement } = {
    [ReportType.OperatorsWorkingReport]: <PeriodDatePicker />,
  };

  const datePicker = type && datePickers[type];

  return datePicker;
};
