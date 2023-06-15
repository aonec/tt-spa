import React, { useEffect, useMemo } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ExtendedSearchTypes, taskCategotiesProps } from './SearchTasks.types';
import {
  ApartmentNumberWrapper,
  OverFlowSelectSC,
  StyledContainerAdressSection,
  StyledContainerThreeItemsMainTypes,
  StyledTooltiContainer,
  ToExecutionWrapper,
} from './SearchTasks.styled';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  EResourceType,
  ETaskEngineeringElement,
  EStageTimeStatus,
} from 'myApi';
import {
  EngineeringElementLookUp,
  ResourceLookUp,
  TimeStatusesLookUp,
} from '../../tasksProfileService.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { AddressSearchFieldsNameLookup } from './SearchTasks.constants';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { FormItem } from 'ui-kit/FormItem';
import { taskCategories } from './ToExecutionTasksExtendedSearchForm.constants';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';

const { Option } = Select;

export const ToExecutionTasksExtendedSearchForm: React.FC<
  ExtendedSearchTypes
> = ({ setFieldValue, values, taskTypes, housingManagments, perpetrators }) => {
  const isIndividualDevice = values.EngineeringElement === 'IndividualDevice';

  const next = useSwitchInputOnEnter('tasksExtendedSearch', true);

  const TaskCategory =
    taskCategories[
      (values?.EngineeringElement as keyof taskCategotiesProps) || 'All'
    ];

  useEffect(() => {
    if (!values.ApartmentNumber) {
      setFieldValue('ApartmentNumber', null);
    }
    if (!values?.TaskType) return;
    if (!TaskCategory.includes(values?.TaskType)) {
      setFieldValue('TaskType', null);
    }
  }, [values, setFieldValue, TaskCategory]);

  const isValueExists = useMemo(
    () =>
      values?.EngineeringElement
        ? Object.values(
            taskCategories[
              values?.EngineeringElement as keyof taskCategotiesProps
            ],
          )
        : [],
    [values],
  );

  const FilteredTaskTypes = useMemo(() => {
    if (!taskTypes) return [];
    if (isValueExists.length === 0) return taskTypes;
    return taskTypes.filter(
      (el: EManagingFirmTaskFilterTypeNullableStringDictionaryItem) => {
        if (!el.key) return true;
        return isValueExists.includes(el.key);
      },
    );
  }, [taskTypes, isValueExists]);

  return (
    <ToExecutionWrapper>
      <StyledContainerAdressSection>
        <AddressSearchContainer
          onChange={(key, value) =>
            setFieldValue(AddressSearchFieldsNameLookup[key], value)
          }
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
          ]}
          showLabels
          initialValues={{
            city: values.City,
            street: values.Street,
            house: values.HousingStockNumber,
            corpus: values.Corpus,
          }}
          customTemplate={[
            { fieldType: SearchFieldType.City, templateValue: '300px' },
            { fieldType: SearchFieldType.Street, templateValue: '300px' },
            { fieldType: SearchFieldType.House, templateValue: '1fr' },
            { fieldType: SearchFieldType.Corpus, templateValue: '1fr' },
          ]}
        />

        <ApartmentNumberWrapper>
          <StyledTooltiContainer>
            <label>Кв: </label>
            <Tooltip
              placement="topRight"
              title={`Поиск по квартире будет доступен только при выборе элемента инженерной сети "Индивидуальный прибор учета"`}
            >
              <QuestionCircleOutlined width={14} height={14} />
            </Tooltip>
          </StyledTooltiContainer>
          <Input
            small
            data-reading-input="tasksExtendedSearch"
            onChange={(value) =>
              setFieldValue('ApartmentNumber', value.target.value)
            }
            value={values.ApartmentNumber}
            onKeyDown={
              isIndividualDevice ? fromEnter(() => next(0)) : undefined
            }
            placeholder="Квартира"
            disabled={values.EngineeringElement !== 'IndividualDevice'}
          />
        </ApartmentNumberWrapper>
      </StyledContainerAdressSection>
      <StyledContainerThreeItemsMainTypes>
        <FormItem label="Элемент инженерной сети">
          <Select
            small
            data-reading-input="tasksExtendedSearch"
            showAction={['focus']}
            placeholder="Элемент"
            value={values.EngineeringElement}
            onChange={(value) => setFieldValue('EngineeringElement', value)}
            onKeyDown={fromEnter(() => next(1))}
          >
            <Option value={''}>Все</Option>
            {Object.keys(ETaskEngineeringElement).map((el) => {
              return (
                <Option value={el} key={el}>
                  {EngineeringElementLookUp[el as ETaskEngineeringElement]}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label="Тип ресурса">
          <Select
            small
            data-reading-input="tasksExtendedSearch"
            showAction={['focus']}
            placeholder="Тип ресурса"
            value={values.Resource}
            onChange={(value) => {
              setFieldValue('Resource', value);
            }}
            onKeyDown={fromEnter(() => next(2))}
          >
            <Option value={''}>Все</Option>
            {Object.keys(EResourceType).map((el) => {
              return (
                <Option value={el} key={el}>
                  {ResourceLookUp[el as EResourceType]}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label="Домоуправление">
          <Select
            small
            data-reading-input="tasksExtendedSearch"
            showAction={['focus']}
            id="HouseManagementId"
            placeholder="Домоуправление"
            value={values?.HouseManagementId}
            onChange={(value) => {
              setFieldValue('HouseManagementId', value);
            }}
            style={{ textOverflow: 'ellipsis', maxWidth: '300' }}
            onKeyDown={fromEnter(() => next(3))}
          >
            <Option value={''}>Все</Option>
            {housingManagments &&
              housingManagments.map(({ value, key }) => (
                <Option key={key!} value={key!}>
                  {value}
                </Option>
              ))}
          </Select>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
      <StyledContainerThreeItemsMainTypes>
        <FormItem label="Статус">
          <Select
            small
            data-reading-input="tasksExtendedSearch"
            showAction={['focus']}
            placeholder="Статус"
            value={values.TimeStatus}
            onChange={(value) => {
              setFieldValue('TimeStatus', value);
            }}
            onKeyDown={fromEnter(() => next(4))}
          >
            <Option value={''}>Все</Option>
            {Object.keys(EStageTimeStatus).map((el) => {
              return (
                <Option value={el} key={el}>
                  {TimeStatusesLookUp[el as EStageTimeStatus]}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label="Тип задачи">
          <OverFlowSelectSC
            small
            data-reading-input="tasksExtendedSearch"
            id="TaskType"
            placeholder="Тип задачи"
            value={values.TaskType!}
            onChange={(value) => {
              setFieldValue('TaskType', value);
            }}
            onKeyDown={fromEnter(() => next(5))}
          >
            {FilteredTaskTypes &&
              FilteredTaskTypes.map(({ value, key }) => (
                <Option key={key!} value={key!}>
                  {value}
                </Option>
              ))}
          </OverFlowSelectSC>
        </FormItem>
        <FormItem label="Исполнитель">
          <Select
            small
            data-reading-input="tasksExtendedSearch"
            showAction={['focus']}
            placeholder="Исполнитель"
            value={values.PerpetratorId}
            onChange={(value) => {
              setFieldValue('PerpetratorId', value);
            }}
            onKeyDown={
              isIndividualDevice
                ? fromEnter(() => next(6))
                : fromEnter(() => next(0))
            }
          >
            <Option value={''}>Все</Option>
            {perpetrators &&
              perpetrators.map(({ id, firstName, lastName }) => (
                <Option key={id} value={id}>
                  {lastName} {firstName}
                </Option>
              ))}
          </Select>
        </FormItem>
      </StyledContainerThreeItemsMainTypes>
    </ToExecutionWrapper>
  );
};
