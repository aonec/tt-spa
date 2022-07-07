import React, { ChangeEvent } from 'react';
import { Form, Input, Select } from 'antd';
import {
  StyledForm,
  StyledContainerThreeItems,
  StyledContainerFourItems,
} from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import _ from 'lodash';
import { InputSC, SelectSC } from '01/shared/ui/Fields';

import { ExtendedSearchTypes } from './SearchTasks.types';

const { Option } = Select;
export const TasksExtendedSearchForm: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
}) => {
  console.log(values);
  return (
    <StyledForm
      id="searchForm"
      initialValues={{
        TaskId: values?.TaskId,
        TaskType: values?.TargetType,
        ClosingStatuses: values?.ClosingStatuses,
      }}
    >
      <StyledContainerFourItems>
        <Form.Item name="city" label="Город">
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            value="тест"
            placeholder="Город"
            disabled
          />
        </Form.Item>

        <Form.Item name="street" label="Улица">
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            value={'тест'}
            placeholder="Улица"
            disabled
          />
        </Form.Item>

        <Form.Item name="house" label="Дом">
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
        </Form.Item>

        <Form.Item name="corpus" label="Корпус">
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value="тест"
            placeholder="Корпус"
            disabled
          />
        </Form.Item>
      </StyledContainerFourItems>
      <StyledContainerThreeItems>
        <Form.Item name="TaskId" label="Тип ресурса">
          <InputSC
            placeholder="Номер задачи"
            value={values.TaskId}
            onChange={(value: ChangeEvent<HTMLInputElement>) =>
              setFieldValue('TaskId', value.target.value)
            }
            name="TaskId"
          />
        </Form.Item>
        <Form.Item name="TaskType" label="Тип задачи">
          <SelectSC
            placeholder="Тип задачи"
            defaultValue={values.TaskType!}
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
        </Form.Item>

        <Form.Item name="ClosingStatuses" label="Статус Задачи">
          <SelectSC
            placeholder="Статус Задачи"
            value={values.ClosingStatuses}
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
        </Form.Item>
      </StyledContainerThreeItems>
    </StyledForm>
  );
};
