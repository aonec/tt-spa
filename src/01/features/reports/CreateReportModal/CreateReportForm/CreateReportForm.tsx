import { Space } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/tt-components/StyledSelect/StyledSelect';
import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { SelectValue } from 'antd/lib/select';
import React, { FC, useCallback } from 'react';
import { ReportFormInputsContainer } from '../ReportFormInputs';
import { ReportType, reportTypeTitleNames } from '../types';

interface Props {
  type: ReportType | null;
  setType: (type: ReportType) => void;
}

export const CreateReportForm: FC<Props> = ({ type, setType }) => {
  const handleChange = useCallback(
    (value: SelectValue) => value && setType(value as ReportType),
    [setType]
  );
  return (
    <>
      <FormItem label="Тип отчета">
        <StyledSelect
          placeholder="Выберите тип отчета"
          value={type || undefined}
          onChange={handleChange}
        >
          {reportTypeTitleNames.map(({ type, name }) => (
            <Select.Option key={type} value={type}>
              {name}
            </Select.Option>
          ))}
        </StyledSelect>
        <Space />
        <ReportFormInputsContainer />
      </FormItem>
    </>
  );
};
