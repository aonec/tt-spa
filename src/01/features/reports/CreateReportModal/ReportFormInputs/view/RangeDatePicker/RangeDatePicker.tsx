import FormItem from 'antd/lib/form/FormItem';
import React, { FC } from 'react';
import { Wrapper } from './RangeDatePicker.styled';
import { RangeDatePickerProps } from './RangeDatePicker.types';
import { RangePicker } from 'ui-kit/RangePicker';

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  rangePeriod,
  onChange,
  label,
}) => {
  return (
    <FormItem label={label || 'Период'}>
      <Wrapper>
        <RangePicker
          value={rangePeriod}
          onChange={(range) => onChange(range)}
          format="DD MMMM YYYY"
        />
      </Wrapper>
    </FormItem>
  );
};
