import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Switch } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import dayjs from 'api/dayjs';
import React, { FC, useEffect, useMemo } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { RadioGroupSC } from '../GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { RowWrapper } from '../GroupReportForm.styled';
import { SubsTypeRadioOptions } from './RegularUnloading.constants';
import { SwitchWrapper, Wrapper } from './RegularUnloading.styled';
import { RegularUnloadingProps } from './RegularUnloading.types';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { getUserFullName } from 'utils/getUserFullName';

export const RegularUnloading: FC<RegularUnloadingProps> = ({
  contractors,
  handleChangeContractorIds,
  handleChangeSubsType,
  handleThriggerAt,
  handleChangeIsRegular,
  values,
  errors,
  setRegularUpload,
  staffList,
  handleChangeOrganizationUserIds,
}) => {
  const { isRegular } = values;

  const contractorsOptions: LabeledValue[] = useMemo(
    () =>
      contractors.map((elem) => ({
        key: String(elem.id),
        value: elem.id,
        label: elem.title,
      })),
    [contractors],
  );

  const staffListOptions: LabeledValue[] = useMemo(
    () =>
      staffList.map((elem) => {
        const fullName = getUserFullName({
          firstname: elem.firstName,
          lastname: elem.lastName,
          middlename: elem.middleName,
        });

        return {
          key: String(elem.id),
          value: elem.id,
          label: fullName,
        };
      }),
    [staffList],
  );

  useEffect(() => {
    if (!isRegular) {
      handleChangeContractorIds();
      handleChangeOrganizationUserIds();
      handleChangeSubsType();
      handleThriggerAt();
    }
  }, [
    isRegular,
    handleChangeContractorIds,
    handleChangeOrganizationUserIds,
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
            <FormItem label="Сотрудники">
              <SelectMultiple
                placeholder="Выберите из списка"
                options={staffListOptions}
                value={values?.['Subscription.OrganizationUserIds']}
                onChange={(ids) => {
                  handleChangeOrganizationUserIds(ids as number[]);
                }}
              />
            </FormItem>

            <FormItem label="Контрагенты">
              <SelectMultiple
                placeholder="Выберите из списка"
                options={contractorsOptions}
                value={values?.['Subscription.ContractorIds']}
                onChange={(ids) => {
                  handleChangeContractorIds(ids as number[]);
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
