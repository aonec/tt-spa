import React, { ChangeEvent } from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import { InputSC } from '01/shared/ui/Fields';
import { ExtendedSearchTypes } from './SearchTasks.types';
import { StyledContainerFourItems } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import {
  FormItem,
  SelectSCC,
  StyledContainerThreeItemsWithMarginTop,
  StyledFormThreeRows,
} from './SearchTasks.styled';

const { Option } = Select;

export const TasksExtendedSearchFormArchive: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
}) => {
  return (
    <StyledFormThreeRows id="searchForm">
      <StyledContainerFourItems>
        <FormItem>
          <label>Город: </label>
          <InputSC
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            value=""
            placeholder="Город"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Улица: </label>
          <InputSC
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            value=""
            placeholder="Улица"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Дом: </label>
          <InputSC
            onChange={(value) =>
              setFieldValue(
                "['Filter.Address.HousingStockNumber']",
                value.target.value
              )
            }
            value=""
            placeholder="Дом"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Корпус: </label>
          <InputSC
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value=""
            placeholder="Корпус"
            disabled
          />
        </FormItem>
      </StyledContainerFourItems>
      <StyledContainerThreeItemsWithMarginTop>
        <FormItem>
          <label>Номер задачи: </label>
          <InputSC
            width={'100%'}
            placeholder="Номер задачи"
            value={values.TaskId}
            onChange={(value: ChangeEvent<HTMLInputElement>) =>
              setFieldValue('TaskId', value.target.value)
            }
            name="TaskId"
          />
        </FormItem>
        <FormItem>
          <label>Тип задачи: </label>
          <SelectSCC
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
          </SelectSCC>
        </FormItem>
        <FormItem>
          <label>Статус Задачи: </label>
          <SelectSCC
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
          </SelectSCC>
        </FormItem>
      </StyledContainerThreeItemsWithMarginTop>
    </StyledFormThreeRows>
  );
};
