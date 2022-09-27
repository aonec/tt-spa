import { SelectValue } from 'antd/lib/select';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { emailNotifyService } from '../../emailNotifyService.model';
import { EmailNotifySelectProps } from './EmailNotifySelect.types';

const { gates } = emailNotifyService;

const { ContractorsGate } = gates;

export const EmailNotifySelect: FC<EmailNotifySelectProps> = ({
  contractors,
  handleContractorChange,
}) => {
  const [contractorsIds, setContractorsIds] = useState<number[]>([]);

  useEffect(() => {
    handleContractorChange(contractorsIds);
  }, [contractorsIds]);

  const handleChange = useCallback((value: SelectValue) => {
    if (Array.isArray(value)) setContractorsIds(value as number[]);
  }, []);

  return (
    <>
      <ContractorsGate />
      <FormItem label="Получатели пригласительного письма">
        <Select
          placeholder="Выберите получателей"
          mode="multiple"
          onChange={handleChange}
        >
          {contractors.map((contractor) => (
            <Select.Option key={contractor.id} value={contractor.id}>
              {contractor.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    </>
  );
};
