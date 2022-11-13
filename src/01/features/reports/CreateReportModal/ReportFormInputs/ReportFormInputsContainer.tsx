import { useForm } from 'effector-forms/dist';
import React, { useMemo } from 'react';
import { form } from '../models';
import { ReportType } from '../types';
import { ClosedIndividualDevicesFormContainer } from './closedIndividualDevicesFormService';
import { PeriodDatePicker } from './view/PeriodDatePicker';
import { RangeDatePicker } from './view/RangeDatePicker';
import { ResourceSelect } from './view/ResourceSelect';

export const ReportFormInputsContainer = () => {
  const {
    fields: {
      type: { value: type },
      period: { value: period, onChange: changePeriod },
      rangePeriod: { value: rangePeriod, onChange: changeRangePeriod },
      resources: { value: resources, onChange: handleChangeResources },
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
            label="Период выхода поверки"
          />
        ),
      },
      {
        reportTypes: [ReportType.CheckingDatesReport],
        element: (
          <>
            <ResourceSelect
              resources={resources}
              onChange={handleChangeResources}
            />
            <RangeDatePicker
              label="Период выхода поверки"
              rangePeriod={rangePeriod}
              onChange={changeRangePeriod}
            />
          </>
        ),
      },
      {
        reportTypes: [ReportType.ClosedDevicesReport],
        element: <ClosedIndividualDevicesFormContainer />,
      },
    ],
    [rangePeriod, period, changePeriod, resources]
  );

  const formInputsElement = (type &&
    formInputsLookup.find((formInputs) => formInputs.reportTypes.includes(type))
      ?.element) || <></>;

  return formInputsElement;
};
