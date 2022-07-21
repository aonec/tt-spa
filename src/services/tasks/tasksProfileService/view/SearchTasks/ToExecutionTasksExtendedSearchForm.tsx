import React from 'react';
import { Select, Tooltip } from 'antd';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { InputSC } from '01/shared/ui/Fields';
import { ExtendedSearchTypes } from './SearchTasks.types';
import { StyledForm } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import {
  FormItem,
  OverFlowSelectSC,
  SelectSC,
  StyledContainerAdressSection,
  StyledContainerThreeItemsMainTypes,
  StyledTooltiContainer,
} from './SearchTasks.styled';
import { EResourceType, ETaskEngineeringElement, ETaskTimeStatus } from 'myApi';
import {
  getEngineeringElement,
  getResource,
  getTimeStatuses,
} from '../../tasksProfileService.types';

const { Option } = Select;

export const ToExecutionTasksExtendedSearchForm: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
  housingManagments,
  perpetrators,
}) => {
  return (
    <StyledForm id="searchForm">
      <StyledContainerAdressSection>
        <FormItem>
          <label>Город:</label>
          <InputSC
            onChange={(value) => setFieldValue('City', value.target.value)}
            value={values.City}
            placeholder="Город"
          />
        </FormItem>

        <FormItem>
          <label>Улица: </label>
          <InputSC
            onChange={(value) => setFieldValue('Street', value.target.value)}
            value={values.Street}
            placeholder="Улица"
          />
        </FormItem>

        <FormItem>
          <label>Дом: </label>
          <InputSC
            onChange={(value) =>
              setFieldValue('HousingStockNumber', value.target.value)
            }
            value={values.HousingStockNumber}
            placeholder="Дом"
          />
        </FormItem>

        <FormItem>
          <label>Корпус: </label>
          <InputSC
            onChange={(value) => setFieldValue('Corpus', value.target.value)}
            value={values.Corpus}
            placeholder="Корпус"
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
          <InputSC
            onChange={(value) =>
              setFieldValue('ApartmentNumber', value.target.value)
            }
            value={values.ApartmentNumber}
            placeholder="Квартира"
            disabled
          />
        </FormItem>
      </StyledContainerAdressSection>
      <StyledContainerThreeItemsMainTypes>
        <FormItem>
          <label>Элемент инженерной сети: </label>
          <SelectSC
            placeholder="Элемент"
            value={values.EngineeringElement}
            onChange={(value) => setFieldValue('EngineeringElement', value)}
          >
            <Option value={''}>Все</Option>
            {Object.keys(ETaskEngineeringElement).map((el) => {
              return (
                <Option value={el}>
                  {getEngineeringElement(el as ETaskEngineeringElement)}
                </Option>
              );
            })}
          </SelectSC>
        </FormItem>
        <FormItem>
          <label>Тип ресурса: </label>
          <SelectSC
            placeholder="Тип ресурса"
            value={values.Resource}
            onChange={(value) => {
              setFieldValue('Resource', value);
            }}
          >
            <Option value={''}>Все</Option>
            {Object.keys(EResourceType).map((el) => {
              return (
                <Option value={el}>{getResource(el as EResourceType)}</Option>
              );
            })}
          </SelectSC>
        </FormItem>
        <FormItem>
          <label>Домоуправление: </label>
          <SelectSC
            id="HouseManagementId"
            placeholder="Домоуправление"
            value={values?.HouseManagementId}
            onChange={(value) => {
              setFieldValue('HouseManagementId', value);
            }}
            style={{ textOverflow: 'ellipsis', maxWidth: '300' }}
          >
            <Option value={''}>Все</Option>
            {housingManagments &&
              housingManagments.map(({ value, key }) => (
                <Option key={key!} value={key!}>
                  {value}
                </Option>
              ))}
          </SelectSC>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
      <StyledContainerThreeItemsMainTypes>
        <FormItem>
          <label>Статус: </label>
          <SelectSC
            placeholder="Статус"
            value={values.TimeStatus}
            onChange={(value) => {
              setFieldValue('TimeStatus', value);
            }}
          >
            <Option value={''}>Все</Option>
            {Object.keys(ETaskTimeStatus).map((el) => {
              return (
                <Option value={el}>
                  {getTimeStatuses(el as ETaskTimeStatus)}
                </Option>
              );
            })}
          </SelectSC>
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
                <Option key={key!} value={key!}>
                  {value}
                </Option>
              ))}
          </OverFlowSelectSC>
        </FormItem>
        <FormItem>
          <label>Исполнитель: </label>
          <SelectSC
            placeholder="Исполнитель"
            value={values.PerpetratorId}
            onChange={(value) => {
              setFieldValue('PerpetratorId', value);
            }}
          >
            <Option value={''}>Все</Option>
            {perpetrators &&
              perpetrators.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
          </SelectSC>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
    </StyledForm>
  );
};
