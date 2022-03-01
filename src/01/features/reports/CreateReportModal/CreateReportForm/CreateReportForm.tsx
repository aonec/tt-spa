import { Space } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { PeriodDatePickerContainer } from '../PeriodDatePicker/PeriodDatePickerContainer';
import { reportTypeTitleNames } from '../types';

export const CreateReportForm = () => {
  return (
    <>
      <FormItem label="Тип отчета">
        <StyledSelect placeholder="Выберите тип отчета">
          {reportTypeTitleNames.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </StyledSelect>
        <Space />
        <PeriodDatePickerContainer />
      </FormItem>
    </>
  );
};
