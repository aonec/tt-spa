import dayjs from 'api/dayjs';
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
import { RangePicker } from 'ui-kit/RangePicker';

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
          From: dayjs().startOf('month').format(),
          To: dayjs().endOf('day').format(),
        });
      }
      if (range === GroupReportRangeOptions.LastMonth) {
        return setValue({
          From: dayjs().subtract(1, 'months').startOf('month').format(),
          To: dayjs().subtract(1, 'months').endOf('month').format(),
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
        <RangePicker
          small
          disabled={currentRange !== GroupReportRangeOptions.CustomRange}
          disabledDate={(date) => {
            const currentDay = dayjs().startOf('day');
            const diff = currentDay.diff(date.startOf('day'));
            return diff < 0;
          }}
          allowClear={false}
          format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          value={[dayjs(value.From), dayjs(value.To)]}
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
