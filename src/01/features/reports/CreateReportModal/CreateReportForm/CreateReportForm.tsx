import { Space } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { SelectValue } from 'antd/lib/select';
import React, { FC, useCallback } from 'react';
import { PeriodDatePickerContainer } from '../PeriodDatePicker/PeriodDatePickerContainer';
import { ReportType, reportTypeTitleNames } from '../types';

interface Props {
  type: ReportType | null;
  setType: (type: ReportType) => void;
}

export const CreateReportForm: FC<Props> = ({ type, setType }) => {
  const hadnleChange = useCallback(
    (value: SelectValue) => value && setType(value as ReportType),
    [setType]
  );
  return (
    <>
      <FormItem label="Тип отчета">
        <StyledSelect
          placeholder="Выберите тип отчета"
          value={type || undefined}
          onChange={hadnleChange}
        >
          {reportTypeTitleNames.map(({ type, name }) => (
            <Select.Option key={type} value={type}>
              {name}
            </Select.Option>
          ))}
        </StyledSelect>
        <Space />
        <PeriodDatePickerContainer />
      </FormItem>
    </>
  );
};
