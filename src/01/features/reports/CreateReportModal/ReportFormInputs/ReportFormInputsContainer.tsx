import { useForm } from 'effector-forms/dist';
import React, { useMemo } from 'react';
import { form } from '../models';
import { ReportType } from '../types';
import { PeriodDatePicker } from './view/PeriodDatePicker';
import { RangeDatePicker } from './view/RangeDatePicker';

export const ReportFormInputsContainer = () => {
  const {
    fields: {
      type: { value: type },
      period: { value: period, onChange: changePeriod },
      rangePeriod: { value: rangePeriod, onChange: changeRangePeriod },
    },
  } = useForm(form);

  const formInputsLookup = useMemo(
    () => [
      {
        reportTypes: [
          ReportType.HouseManagementsReport,
          ReportType.OperatorsWorkingReport,
          ReportType.InspectorsWorkingReport,
        ],
        element: (
          <PeriodDatePicker
            date={period}
            onChange={changePeriod}
            format="MMMM YYYY"
          />
        ),
      },
      {
        reportTypes: [ReportType.CallCenterWorkingReport],
        element: (
          <RangeDatePicker
            rangePeriod={rangePeriod}
            onChange={changeRangePeriod}
          />
        ),
      },
    ],
    [rangePeriod, period, changePeriod]
  );

  const formInputsElement =
    type &&
    formInputsLookup.find((formInputs) => formInputs.reportTypes.includes(type))
      ?.element!;

  return formInputsElement;
};
