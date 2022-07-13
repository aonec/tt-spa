import { useForm } from 'effector-forms/dist';
import React, { useMemo } from 'react';
import { form } from '../models';
import { ReportType } from '../types';
import { PeriodDatePicker } from './view/PeriodDatePicker';

export const ReportFormInputsContainer = () => {
  const {
    fields: {
      type: { value: type },
      monthPeriod: { value: monthPeriod, onChange: changeMonthPeriod },
    },
  } = useForm(form);

  const formInputsLookup = useMemo(
    () => [
      {
        reportTypes: [
          ReportType.HouseManagementsReport,
          ReportType.OperatorsWorkingReport,
        ],
        element: (
          <PeriodDatePicker date={monthPeriod} onChange={changeMonthPeriod} />
        ),
      },
    ],
    [monthPeriod, changeMonthPeriod]
  );

  const formInputsElement =
    type &&
    formInputsLookup.find((formInputs) => formInputs.reportTypes.includes(type))
      ?.element!;

  return formInputsElement;
};
