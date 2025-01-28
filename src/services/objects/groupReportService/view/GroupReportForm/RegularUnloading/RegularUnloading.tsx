import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Switch } from 'antd';
import dayjs from 'api/dayjs';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { RadioGroupSC } from '../GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { RowWrapper } from '../GroupReportForm.styled';
import { SubsTypeRadioOptions } from './RegularUnloading.constants';
import {
  OptionItemWrapper,
  SelectExpandable,
  SwitchWrapper,
  TopWrapper,
  UserNameWrapper,
  Wrapper,
} from './RegularUnloading.styled';
import { RegularUnloadingProps } from './RegularUnloading.types';
import { getUserFullName } from 'utils/getUserFullName';
import { Select } from 'ui-kit/Select';
import { ArrowRightLongIconDim } from 'services/tasks/addTaskFromDispatcherService/view/AddTaskModal/AddTaskForm/AddTaskForm.styled';
import { autocompleteUsersWithEmail } from './RegularUnloading.utils';

export const RegularUnloading: FC<RegularUnloadingProps> = ({
  contractors,
  handleChangeSubsType,
  handleThriggerAt,
  handleChangeIsRegular,
  values,
  errors,
  setRegularUpload,
  staffList,
  handleChangeEmail,
}) => {
  const { isRegular } = values;

  const contractorsOptions = useMemo(
    () =>
      contractors.map((elem) => ({
        key: String(elem.id),
        value: elem.id,
        name: elem.title,
        email: elem.email,
      })),
    [contractors],
  );

  const staffListOptions = useMemo(
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
          name: fullName,
          email: elem.email,
        };
      }),
    [staffList],
  );

  const users = [...contractorsOptions, ...staffListOptions];

  useEffect(() => {
    if (!isRegular) {
      handleChangeSubsType();
      handleThriggerAt();
    }
  }, [isRegular, handleChangeSubsType, handleThriggerAt]);

  const [userSearch, setUserSearch] = useState<string>('');

  const taskReasonOptions = useMemo(
    () =>
      autocompleteUsersWithEmail(userSearch, users).map((user) => {
        return {
          label: (
            <OptionItemWrapper>
              <TopWrapper>
                {user.email}
                <ArrowRightLongIconDim />
                <UserNameWrapper>{user.name}</UserNameWrapper>
              </TopWrapper>
            </OptionItemWrapper>
          ),
          value: `${user.email}@@${user.name}`,
          key: user.email,
        };
      }),
    [users],
  );

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
          <FormItem label="Email">
            <SelectExpandable
              mode="multiple"
              onChange={(search) => handleChangeEmail(search as string[])}
              searchValue={userSearch}
              onSearch={(search) => setUserSearch(search as string)}
              onSelect={() => setUserSearch('')}
            >
              {taskReasonOptions.map((elem) => (
                <Select.Option value={elem.value} key={elem.key}>
                  {elem.label}
                </Select.Option>
              ))}
            </SelectExpandable>
          </FormItem>
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
          <FormItem label="Регулярность">
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
