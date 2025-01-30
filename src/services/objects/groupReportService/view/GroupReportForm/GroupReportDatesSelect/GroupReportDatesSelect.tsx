import dayjs from 'api/dayjs';
import React, { FC, useCallback, useState } from 'react';
import { GroupReportRangeOptions } from './GroupReportDatesSelect.constants';
import {
  DatePickerWrapper,
  RadioGroupSC,
} from './GroupReportDatesSelect.styled';
import { GroupReportDatesSelectProps } from './GroupReportDatesSelect.types';
import { RangePicker } from 'ui-kit/RangePicker';

export const GroupReportDatesSelect: FC<GroupReportDatesSelectProps> = ({
  value,
  setValue,
  isDisabled,
}) => {
  const [currentRange, setCurrentRange] = useState<GroupReportRangeOptions>(
    GroupReportRangeOptions.ThisMonth,
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
        value={currentRange}
        onChange={(e) => {
          setCurrentRange(e.target.value);
          handleRangeTypeChange(e.target.value);
        }}
        options={[
          {
            value: GroupReportRangeOptions.ThisMonth,
            label: 'С начала месяца',
          },
          {
            value: GroupReportRangeOptions.LastMonth,
            label: 'За прошлый месяц',
          },
          {
            value: GroupReportRangeOptions.CustomRange,
            label: 'Произвольный период',
            disabled: isDisabled,
          },
        ]}
      />

      <DatePickerWrapper>
        <label>Выберите дату</label>
        <RangePicker
          small
          disabled={
            currentRange !== GroupReportRangeOptions.CustomRange || isDisabled
          }
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
