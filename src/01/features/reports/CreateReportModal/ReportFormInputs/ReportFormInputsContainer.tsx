import { useForm } from 'effector-forms/dist';
import { EResourceType } from 'myApi';
import React, { useMemo } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
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
      {
        reportTypes: [ReportType.CheckingDatesReport],
        element: (
          <>
            <FormItem label="Ресурс">
              <Select mode="multiple">
                {Object.values(EResourceType).map((resource) => (
                  <Select.Option key={resource} value={resource}>
                    <ResourceIconLookup resource={resource} />
                    {resourceNamesLookup[resource]}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </>
        ),
      },
    ],
    [rangePeriod, period, changePeriod]
  );

  const formInputsElement = (type &&
    formInputsLookup.find((formInputs) => formInputs.reportTypes.includes(type))
      ?.element) || <></>;

  return formInputsElement;
};
