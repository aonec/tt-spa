import { useForm } from 'effector-forms/dist';
import React, { ReactElement } from 'react';
import { form } from '../models';
import { ReportType } from '../types';
import { PeriodDatePicker } from './PeriodDatePicker';

export const PeriodDatePickerContainer = () => {
  const {
    fields: {
      type: { value: type },
      monthPeriod: { value: monthPeriod, onChange: changeMonthPeriod }
    },
  } = useForm(form);

  const datePickers: { [key in ReportType]: ReactElement } = {
    [ReportType.OperatorsWorkingReport]: (
      <PeriodDatePicker date={monthPeriod} onChange={changeMonthPeriod} />
    ),
  };

  const datePicker = type && datePickers[type];

  return datePicker;
};
