import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Switch } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import dayjs from 'api/dayjs';
import React, { FC, useEffect, useMemo } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
// import { RadioGroupSC } from '../GroupReportDatesSelect/GroupReportDatesSelect.styled'; // todo: регулярная выгрузка
import { RowWrapper } from '../GroupReportForm.styled';
// import { SubsTypeRadioOptions } from './RegularUnloading.constants'; // todo: регулярная выгрузка
import { SwitchWrapper, Wrapper } from './RegularUnloading.styled';
import { RegularUnloadingProps } from './RegularUnloading.types';

export const RegularUnloading: FC<RegularUnloadingProps> = ({
  contractors,
  handleChangeContractorIds,
  handleChangeEmail,
  // handleChangeSubsType, // todo: регулярная выгрузка
  handleThriggerAt,
  handleChangeIsRegular,
  values,
  errors,
}) => {
  const { isRegular } = values;

  const contractorsOptions: LabeledValue[] = useMemo(
    () =>
      contractors.map((elem) => ({
        key: String(elem.id),
        value: String(elem.id),
        label: elem.title,
      })),
    [contractors],
  );

  useEffect(() => {
    if (!isRegular) {
      handleChangeContractorIds();
      handleChangeEmail();
      // handleChangeSubsType(); // todo: регулярная выгрузка
      handleThriggerAt();
    }
  }, [
    isRegular,
    handleChangeContractorIds,
    handleChangeEmail,
    // handleChangeSubsType, // todo: регулярная выгрузка
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
      <SwitchWrapper onClick={() => handleChangeIsRegular(!isRegular)}>
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
              <ErrorMessage>{errors['Subscription.Email']}</ErrorMessage>
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
                value={
                  values['Subscription.TriggerAt']
                    ? dayjs(values['Subscription.TriggerAt'])
                    : undefined
                }
                placeholder={'Введите дату'}
                onChange={(date) =>
                  handleThriggerAt(date?.format('YYYY-MM-DD'))
                }
                allowClear={false}
                format={'DD.MM.YYYY'}
              />
              <ErrorMessage>{errors['Subscription.TriggerAt']}</ErrorMessage>
            </FormItem>
          </RowWrapper>
          {/* <FormItem label="Период"> // todo: регулярная выгрузка
            <RadioGroupSC
              options={SubsTypeRadioOptions}
              onChange={(e) => handleChangeSubsType(e.target.value)}
              value={values['Subscription.Type']}
            />
            <ErrorMessage>{errors['Subscription.Type']}</ErrorMessage>
          </FormItem> */}
        </>
      )}
    </Wrapper>
  );
};
