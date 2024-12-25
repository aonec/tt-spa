import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Switch } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import dayjs from 'api/dayjs';
import React, { FC, useEffect, useMemo } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { RadioGroupSC } from '../GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { RowWrapper } from '../GroupReportForm.styled';
import { SubsTypeRadioOptions } from './RegularUnloading.constants';
import { SwitchWrapper, Wrapper } from './RegularUnloading.styled';
import { RegularUnloadingProps } from './RegularUnloading.types';
import { SelectMultiple } from 'ui-kit/SelectMultiple';

export const RegularUnloading: FC<RegularUnloadingProps> = ({
  contractors,
  handleChangeContractorIds,
  handleChangeEmail,
  handleChangeSubsType,
  handleThriggerAt,
  handleChangeIsRegular,
  values,
  errors,
  setRegularUpload,
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

  return (
    <Wrapper>
      <SwitchWrapper
        onClick={() => {
          handleChangeIsRegular(!isRegular);
          setRegularUpload(!isRegular);
        }}
      >
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
                placeholder="Введите email"
                value={values['Subscription.Email']}
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
              <ErrorMessage>{errors['Subscription.Email']}</ErrorMessage>
            </FormItem>

            <FormItem label="Контрагенты">
              <SelectMultiple
                placeholder="Выберите из списка"
                options={contractorsOptions}
                value={values?.['Subscription.ContractorIds']}
                onChange={(ids) => {
                  console.log(ids);
                  handleChangeContractorIds(ids as string[]);
                }}
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
                placeholder="Введите дату"
                onChange={(date) =>
                  handleThriggerAt(date?.format('YYYY-MM-DD'))
                }
                allowClear={false}
                format={'DD.MM.YYYY'}
              />
              <ErrorMessage>{errors['Subscription.TriggerAt']}</ErrorMessage>
            </FormItem>
          </RowWrapper>
          <FormItem label="Период">
            <RadioGroupSC
              options={SubsTypeRadioOptions}
              onChange={(e) => handleChangeSubsType(e.target.value)}
              value={values['Subscription.Type']}
            />
            <ErrorMessage>{errors['Subscription.Type']}</ErrorMessage>
          </FormItem>
        </>
      )}
    </Wrapper>
  );
};
