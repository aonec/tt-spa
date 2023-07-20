import FormItem from 'antd/lib/form/FormItem';
import { SelectValue } from 'antd/lib/select';
import React, { FC, useCallback } from 'react';
import { ReportFormInputsContainer } from '../ReportFormInputs';
import { ReportType, reportTypeTitleNames } from '../types';
import { Select } from 'ui-kit/Select';

interface Props {
  type: ReportType | null;
  setType: (type: ReportType) => void;
}

export const CreateReportForm: FC<Props> = ({ type, setType }) => {
  const handleChange = useCallback(
    (value: SelectValue) => value && setType(value as ReportType),
    [setType],
  );
  return (
    <>
      <FormItem label="Тип отчета">
        <Select
          placeholder="Выберите тип отчета"
          value={type || undefined}
          onChange={handleChange}
        >
          {reportTypeTitleNames.map(({ type, name }) => (
            <Select.Option key={type} value={type}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <div style={{ marginTop: '16px' }}>
          <ReportFormInputsContainer />
        </div>
      </FormItem>
    </>
  );
};
