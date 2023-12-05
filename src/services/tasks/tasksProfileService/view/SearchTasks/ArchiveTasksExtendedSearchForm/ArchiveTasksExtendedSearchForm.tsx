import React, { ChangeEvent, FC, useMemo } from 'react';
import { ArchiveTasksExtendedSearchFormProps } from './ArchiveTasksExtendedSearchForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import {
  StyledContainerThreeItemsMainTypes,
  StyledFormTwoRows,
} from './ArchiveTasksExtendedSearchForm.styled';
import { StyledContainerFourItems } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import { ETaskClosingStatus } from 'api/types';

const { Option } = Select;

export const ArchiveTasksExtendedSearchForm: FC<
  ArchiveTasksExtendedSearchFormProps
> = ({ setFieldValue, taskTypes, values }) => {
  const taskTypeOptions = useMemo(
    () =>
      (taskTypes || [])
        .filter((elem) => Boolean(elem.key))
        .map(({ value, key }) => (
          <Select.Option key={key} value={key}>
            {value}
          </Select.Option>
        )),
    [taskTypes],
  );

  return (
    <StyledFormTwoRows id="searchForm">
      <StyledContainerFourItems>
        <FormItem label="Город">
          <Input
            small
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            value=""
            placeholder="Город"
            disabled
          />
        </FormItem>

        <FormItem label="Улица">
          <Input
            small
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            value=""
            placeholder="Улица"
            disabled
          />
        </FormItem>

        <FormItem label="Дом">
          <Input
            small
            onChange={(value) =>
              setFieldValue(
                "['Filter.Address.HousingStockNumber']",
                value.target.value,
              )
            }
            value=""
            placeholder="Дом"
            disabled
          />
        </FormItem>

        <FormItem label="Корпус">
          <Input
            small
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value=""
            placeholder="Корпус"
            disabled
          />
        </FormItem>
      </StyledContainerFourItems>
      <StyledContainerThreeItemsMainTypes>
        <FormItem label="Номер задачи">
          <Input
            small
            width={'100%'}
            placeholder="Номер задачи"
            value={values.TaskId}
            onChange={(value: ChangeEvent<HTMLInputElement>) =>
              setFieldValue('TaskId', value.target.value)
            }
            name="TaskId"
          />
        </FormItem>
        <FormItem label="Тип задачи">
          <Select
            small
            id="TaskType"
            placeholder="Тип задачи"
            value={values.TaskType || undefined}
            onChange={(value) => {
              setFieldValue('TaskType', value);
            }}
          >
            {taskTypeOptions}
          </Select>
        </FormItem>
        <FormItem label="Статус Задачи">
          <Select
            small
            placeholder="Статус Задачи"
            value={values?.ClosingStatuses}
            onChange={(value) => {
              setFieldValue('ClosingStatuses', value);
            }}
          >
            <Option key="Properly" value={ETaskClosingStatus.Properly}>
              {'Выполнена в срок'}
            </Option>
            <Select.Option
              key="Interrupted"
              value={ETaskClosingStatus.Interrupted}
            >
              {'Закрыта автоматически'}
            </Select.Option>
          </Select>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
    </StyledFormTwoRows>
  );
};
