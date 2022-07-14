import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Select, Tooltip } from 'antd';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { InputSC } from '01/shared/ui/Fields';
import { ExtendedSearchTypes } from './SearchTasks.types';
import { StyledForm } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import {
  FormItem,
  OverFlowSelectSC,
  StyledContainerAdressSection,
  StyledContainerThreeItemsWithMarginTop,
  StyledTooltiContainer,
} from './SearchTasks.styled';
import { axios } from '01/axios';
import {
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
} from 'myApi';

const { Option } = Select;

export const TasksExtendedSearchFormExecution: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
}) => {
  const [housingStocks, setHousingStocks] = useState<
    GuidStringDictionaryItem[] | null
  >(null);

  useEffect(() => {
    axios
      .get<any, HousingStockFilterResponse>('/HousingStocks/filters')
      .then((res) => setHousingStocks(res.houseManagements));
  }, []);

  return (
    <StyledForm id="searchForm">
      <StyledContainerAdressSection>
        <FormItem>
          <label>Город: </label>
          <Input
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
          <Input
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
          <Input
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
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value=""
            placeholder="Корпус"
            disabled
          />
        </FormItem>
        <FormItem>
          <StyledTooltiContainer>
            <label>Кв: </label>
            <Tooltip
              placement="topRight"
              title={`Поиск по квартире будет доступен только при выборе типов задач "Проверка ИПУ" и "Отсутствие показаний ИПУ"`}
            >
              <QuestionCircleOutlined width={14} height={14} />
            </Tooltip>
          </StyledTooltiContainer>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            value=""
            placeholder="Квартира"
            disabled
          />
        </FormItem>
      </StyledContainerAdressSection>
      <StyledContainerThreeItemsWithMarginTop>
        <FormItem>
          <label>Элемент инженерной сети: </label>
          <InputSC
            disabled
            placeholder="Элемент"
            value=''
            onChange={(value: ChangeEvent<HTMLInputElement>) =>
              setFieldValue('TaskId', value.target.value)
            }
            name="TaskId"
          />
        </FormItem>
        <FormItem>
          <label>Тип ресурса: </label>
          <Select
            disabled
            placeholder="Тип ресурса"
            value={''}
            onChange={(value) => {
              setFieldValue('', value);
            }}
          ></Select>
        </FormItem>
        <FormItem>
          <label>Домоуправление: </label>
          <Select
            id="HouseManagementId"
            placeholder="Домоуправление"
            value={values?.HouseManagementId}
            onChange={(value) => {
              setFieldValue('HouseManagementId', value);
            }}
            style={{ textOverflow: 'ellipsis', maxWidth: '300' }}
          >
            {housingStocks &&
              housingStocks.map(({ value, key }) => (
                <Select.Option key={key!} value={key!}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </FormItem>
      </StyledContainerThreeItemsWithMarginTop>
      <StyledContainerThreeItemsWithMarginTop>
        <FormItem>
          <label>Статус: </label>
          <Select
            disabled
            placeholder="Статус"
            value={''}
            onChange={(value) => {
              setFieldValue('', value);
            }}
          ></Select>
        </FormItem>
        <FormItem>
          <label>Тип задачи: </label>
          <OverFlowSelectSC
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
          </OverFlowSelectSC>
        </FormItem>
        <FormItem>
          <label>Исполнитель: </label>
          <Select
            disabled
            placeholder="Исполнитель"
            value={''}
            onChange={(value) => {
              setFieldValue('', value);
            }}
          ></Select>
        </FormItem>
      </StyledContainerThreeItemsWithMarginTop>
    </StyledForm>
  );
};

