import { Switch } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import moment from 'moment';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { RadioGroupSC } from '../GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { RowWrapper } from '../GroupReportForm.styled';
import { SubsTypeRadioOptions } from './RegularUnloading.constants';
import { SwitchWrapper, Wrapper } from './RegularUnloading.styled';
import { RegularUnloadingProps } from './RegularUnloading.types';

export const RegularUnloading: FC<RegularUnloadingProps> = ({
  contractors,
  handleChangeContractorIds,
  handleChangeEmail,
  handleChangeSubsType,
  handleThriggerAt,
  values,
}) => {
  const [isRegular, setIsRegular] = useState(false);

  const contractorsOptions: LabeledValue[] = useMemo(
    () =>
      contractors.map((elem) => ({
        key: String(elem.id),
        value: String(elem.id),
        label: elem.title,
      })),
    [contractors]
  );

  useEffect(() => {
    if (!isRegular) {
      handleChangeContractorIds();
      handleChangeEmail();
      handleChangeSubsType();
      handleThriggerAt();
    }
  }, [
    isRegular,
    handleChangeContractorIds,
    handleChangeEmail,
    handleChangeSubsType,
    handleThriggerAt,
  ]);

  const contractorValue = useMemo(() => {
    const contractor = values?.['Subscription.ContractorIds']?.[0];
    if (contractor) {
      return String(contractor);
    }
    return;
  }, [values]);

  return (
    <Wrapper>
      <SwitchWrapper onClick={() => setIsRegular((prev) => !prev)}>
        <Switch checked={isRegular} />
        <div>
          <label>Регулярная выгрузка отчёта</label>
          <div>
            Групповой отчёт будет приходить вам и подрядчикам на почту в
            выбранную дату
          </div>
        </div>
      </SwitchWrapper>
      {isRegular && (
        <>
          <RowWrapper>
            <FormItem label="Email">
              <Input
                value={values['Subscription.Email']}
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
            </FormItem>
            <FormItem label="Подрядчики">
              <Select
                options={contractorsOptions}
                value={contractorValue}
                onChange={(id) => handleChangeContractorIds([Number(id)])}
              />
            </FormItem>
          </RowWrapper>
          <RowWrapper>
            <FormItem label="Дата следующей выгрузки отчёта">
              <DatePicker
                value={moment(values['Subscription.TriggerAt'])}
                onChange={(date) =>
                  handleThriggerAt(date?.format('YYYY-MM-DD'))
                }
                allowClear={false}
                format={'DD.MM.YYYY'}
              />
            </FormItem>
          </RowWrapper>
          <FormItem label="Период">
            <RadioGroupSC
              options={SubsTypeRadioOptions}
              onChange={(e) => handleChangeSubsType(e.target.value)}
              value={values['Subscription.Type']}
            />
          </FormItem>
        </>
      )}
    </Wrapper>
  );
};
