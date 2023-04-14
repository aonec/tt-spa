import React, { ChangeEvent } from 'react';
import { ExtendedSearchTypes } from './SearchTasks.types';
import { StyledContainerFourItems } from 'services/housingMeteringDevices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import {
  StyledContainerThreeItemsMainTypes,
  StyledFormTwoRows,
} from './SearchTasks.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';

const { Option } = Select;

export const ArchiveTasksExtendedSearchForm: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
}) => {
  return (
    <StyledFormTwoRows id="searchForm">
      <StyledContainerFourItems>
        <FormItem label="Город">
          <Input
            search
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
            search
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
            search
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
            search
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
            search
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
            search
            id="TaskType"
            placeholder="Тип задачи"
            value={values.TaskType!}
            onChange={(value) => {
              setFieldValue('TaskType', value);
            }}
          >
            {taskTypes &&
              taskTypes.map(({ value, key }) => (
                <Select.Option key={key!} value={key!}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </FormItem>
        <FormItem label="Статус Задачи">
          <Select
            search
            placeholder="Статус Задачи"
            value={values?.ClosingStatuses}
            onChange={(value) => {
              setFieldValue('ClosingStatuses', value);
            }}
          >
            <Option key="Properly" value="Properly">
              {'Выполнена в срок'}
            </Option>
            <Select.Option key="Lated" value="Lated" disabled>
              {'Просрочена'}
            </Select.Option>
            <Select.Option key="Interrupted" value="Interrupted">
              {'Закрыта автоматически'}
            </Select.Option>
          </Select>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
    </StyledFormTwoRows>
  );
};
