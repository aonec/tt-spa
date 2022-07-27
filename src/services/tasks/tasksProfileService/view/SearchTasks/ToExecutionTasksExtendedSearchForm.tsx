import React, { useEffect, useMemo } from 'react';
import { Select, Tooltip } from 'antd';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { InputSC, StyledAutocomplete } from '01/shared/ui/Fields';
import { CategotyI, ExtendedSearchTypes } from './SearchTasks.types';
import { StyledForm } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import {
  FormItem,
  OverFlowSelectSC,
  SelectSC,
  StyledContainerAdressSection,
  StyledContainerThreeItemsMainTypes,
  StyledTooltiContainer,
} from './SearchTasks.styled';
import {
  EManagingFirmTaskFilterType,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  EResourceType,
  ETaskEngineeringElement,
  EStageTimeStatus,
} from 'myApi';
import {
  getEngineeringElement,
  getResource,
  getTimeStatuses,
} from '../../tasksProfileService.types';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';

const { Option } = Select;

export const ToExecutionTasksExtendedSearchForm: React.FC<ExtendedSearchTypes> = ({
  setFieldValue,
  values,
  taskTypes,
  housingManagments,
  perpetrators,
  streets,
  cities,
}) => {
  const { match: streetMatch, options } = useAutocomplete(
    values.Street,
    streets
  );

  const { match: cityMatch, options: cityOptions } = useAutocomplete(
    values.City,
    cities
  );

  useEffect(() => {
    if (values.EngineeringElement !== 'IndividualDevice') {
      setFieldValue('TaskType', null);
      setFieldValue('ApartmentNumber', null);
    }
  }, [values.EngineeringElement]);

  const Categories: CategotyI = {
    All: Object.keys(
      EManagingFirmTaskFilterType
    ) as Partial<EManagingFirmTaskFilterType>[],
    Node: [
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.CalculatorMalfunctionAny
      ],
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.HousingDeviceMalfunctionAny
      ],
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.CalculatorLackOfConnection
      ],
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.MeasurementErrorAny
      ],
    ],
    IndividualDevice: [
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.IndividualDeviceCheck
      ],
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.IndividualDeviceReadingsCheck
      ],
      EManagingFirmTaskFilterType[
        EManagingFirmTaskFilterType.IndividualDeviceCheckNoReadings
      ],
    ],
    HouseNetwork: [
      EManagingFirmTaskFilterType[EManagingFirmTaskFilterType.PipeRupture],
    ],
  };

  const FilteredTaskTypes = useMemo(() => {
    return taskTypes?.filter(
      (el: EManagingFirmTaskFilterTypeNullableStringDictionaryItem) => {
        return (values?.EngineeringElement
          ? Object.values(
              Categories[values?.EngineeringElement as keyof CategotyI]
            )
          : Categories.All
        ).includes(el.key as EManagingFirmTaskFilterType);
      }
    );
  }, [values?.EngineeringElement]);

  // const FilteredEngineeringElement = useMemo(() => {
  //   return !values?.TaskType
  //     ? Object.keys(ETaskEngineeringElement)
  //     : Object.keys(ETaskEngineeringElement).filter((el) => {
  //         return (
  //           Object.values(Categories[el as keyof CategotyI]).filter((ell) => {
  //             return (
  //               ell ===
  //               (values?.TaskType as Partial<EManagingFirmTaskFilterType>)
  //             );
  //           }).length > 0
  //         );
  //       });
  // }, [values?.TaskType]);

  return (
    <StyledForm id="searchForm">
      <StyledContainerAdressSection>
        <FormItem>
          <label>Город:</label>
          <StyledAutocomplete
            placeholder="Город"
            value={values.City}
            onChange={(value) => setFieldValue('City', value.toString())}
            onKeyDown={(e) => {
              fromEnter(() => {
                if (values.Street) setFieldValue('City', cityMatch);
              })(e);
            }}
            options={cityOptions}
          />
        </FormItem>

        <FormItem>
          <label>Улица: </label>
          <StyledAutocomplete
            placeholder="Улица"
            value={values.Street}
            onChange={(value) => setFieldValue('Street', value.toString())}
            onKeyDown={(e) => {
              fromEnter(() => {
                if (values.Street) setFieldValue('Street', streetMatch);
              })(e);
            }}
            options={options}
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
              title={`Поиск по квартире будет доступен только при выборе элемента инженерной сети "Индивидуальный прибор учета"`}
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
            disabled={values.EngineeringElement !== 'IndividualDevice'}
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
            <Option value={null!}>Все</Option>
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
            <Option value={null!}>Все</Option>
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
            <Option value={null!}>Все</Option>
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
            <Option value={null!}>Все</Option>
            {Object.keys(EStageTimeStatus).map((el) => {
              return (
                <Option value={el}>
                  {getTimeStatuses(el as EStageTimeStatus)}
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
            <Option value={null!}>Все</Option>
            {FilteredTaskTypes &&
              FilteredTaskTypes.map(({ value, key }) => (
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
            <Option value={null!}>Все</Option>
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
