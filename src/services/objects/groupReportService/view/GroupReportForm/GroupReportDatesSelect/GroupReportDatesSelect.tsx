import { StyledRangePicker } from '01/shared/ui/Fields';
import moment from 'moment';
import React, { FC, useCallback, useState } from 'react';
import {
  GroupReportRangeLookup,
  GroupReportRangeOptions,
} from './GroupReportDatesSelect.constants';
import {
  DatePickerWrapper,
  RadioGroupSC,
} from './GroupReportDatesSelect.styled';
import { GroupReportDatesSelectProps } from './GroupReportDatesSelect.types';

export const GroupReportDatesSelect: FC<GroupReportDatesSelectProps> = ({
  value,
  setValue,
}) => {
  const [currentRange, setCurrentRange] = useState<GroupReportRangeOptions>(
    GroupReportRangeOptions.ThisMonth,
  );

  const radioOptions = Object.entries(GroupReportRangeLookup).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const handleRangeTypeChange = useCallback(
    (range: GroupReportRangeOptions) => {
      if (range === GroupReportRangeOptions.ThisMonth) {
        return setValue({
          From: moment().startOf('month').format(),
          To: moment().endOf('day').format(),
        });
      }
      if (range === GroupReportRangeOptions.LastMonth) {
        return setValue({
          From: moment().subtract(1, 'months').startOf('month').format(),
          To: moment().subtract(1, 'months').endOf('month').format(),
        });
      }
    },
    [setValue],
  );

  return (
    <div>
      <RadioGroupSC
        options={radioOptions}
        value={currentRange}
        onChange={(e) => {
          setCurrentRange(e.target.value);
          handleRangeTypeChange(e.target.value);
        }}
      />
      <DatePickerWrapper>
        <label>Выберите дату</label>
        <StyledRangePicker
          disabled={currentRange !== GroupReportRangeOptions.CustomRange}
          disabledDate={(date) => {
            const currentDay = moment().startOf('day');
            const diff = currentDay.diff(date.startOf('day'));
            return diff < 0;
          }}
          allowClear={false}
          format="DD.MM.YYYY"
          value={[moment(value.From), moment(value.To)]}
          onChange={(range) => {
            if (
              !range ||
              currentRange !== GroupReportRangeOptions.CustomRange
            ) {
              return null;
            }
            const [From, To] = range;
            setValue({ From: From?.format(), To: To?.format() });
          }}
        />
      </DatePickerWrapper>
    </div>
  );
};
