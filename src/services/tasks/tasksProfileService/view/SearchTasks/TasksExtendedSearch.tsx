import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import {
  StyledForm,
  StyledContainerThreeItems,
  StyledContainerFourItems,
} from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import _ from 'lodash';
import { InputSC, SelectSC } from '01/shared/ui/Fields';

import { ExtendedSearchTypes } from './SearchTasks.types';
import styled from 'styled-components';

const { Option } = Select;
export const TasksExtendedSearchForm: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
}) => {
  return (
    <StyledForm
      id="searchForm"
    >
      <StyledContainerFourItems>
        <FormItem>
          <label>Город: </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            value="тест"
            placeholder="Город"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Улица: </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            value={'тест'}
            placeholder="Улица"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Дом: </label>
          <Input
            onChange={(value) =>
              setFieldValue(
                "['Filter.Address.HousingStockNumber']",
                value.target.value
              )
            }
            value={'тест'}
            placeholder="Дом"
            disabled
          />
        </FormItem>

        <FormItem>
          <label>Корпус: </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value="тест"
            placeholder="Корпус"
            disabled
          />
        </FormItem>
      </StyledContainerFourItems>
      <StyledContainerThreeItems>
        <FormItem>
          <label>Номер задачи: </label>
          <InputSC
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
          <SelectSC
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
          </SelectSC>
        </FormItem>

        <FormItem>
          <label>Статус Задачи: </label>
          <SelectSC
            placeholder="Статус Задачи"
            value={values?.ClosingStatuses}
            onChange={(value) => {
              setFieldValue('ClosingStatuses', value);
            }}
          >
            <Option key={'Properly'} value={'Properly'}>
              {'Обычная'}
            </Option>
            <Select.Option key={'Interrupted'} value={'Interrupted'}>
              {'Закрыта автоматически'}
            </Select.Option>
          </SelectSC>
        </FormItem>
      </StyledContainerThreeItems>
    </StyledForm>
  );
};

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;
