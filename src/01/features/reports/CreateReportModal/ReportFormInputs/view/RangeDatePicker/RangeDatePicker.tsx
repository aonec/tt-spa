import { RangePickerSC } from '01/tt-components';
import FormItem from 'antd/lib/form/FormItem';
import React, { FC, useCallback, useEffect } from 'react';
import { Wrapper } from './RangeDatePicker.styled';
import { RangeDatePickerProps } from './RangeDatePicker.types';

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  rangePeriod,
  onChange,
}) => {
  const handleChange = useCallback(
    (value: [moment.Moment | null, moment.Moment | null] | null) =>
      value && onChange(value),
    [onChange]
  );

  return (
    <FormItem label="Период">
      <Wrapper>
        <RangePickerSC
          value={rangePeriod}
          onChange={(range) => handleChange(range)}
        />
      </Wrapper>
    </FormItem>
  );
};
