import { RangePickerSC } from '01/tt-components';
import FormItem from 'antd/lib/form/FormItem';
import React, { FC } from 'react';
import { Wrapper } from './RangeDatePicker.styled';
import { RangeDatePickerProps } from './RangeDatePicker.types';

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  rangePeriod,
  onChange,
}) => {

  return (
    <FormItem label="Период">
      <Wrapper>
        <RangePickerSC
          value={rangePeriod}
          onChange={(range) => onChange(range)}
          format="DD MMMM YYYY"
        />
      </Wrapper>
    </FormItem>
  );
};
