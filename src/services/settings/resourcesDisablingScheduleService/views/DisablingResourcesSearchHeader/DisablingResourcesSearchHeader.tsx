import React from 'react';
import { useFormik } from 'formik';
import { EResourceDisconnectingType, EResourceType } from 'myApi';
import {
  FormItem,
  StyledDisablingResourcesSearchHeader,
} from './DisablingResourcesSearchHeader.styled';
import { DisablingResourcesProps } from '../../ResourceDisablingScheduleContainer.types';
import { DisablingResourcesSearchProps } from './DisablingResourcesSearchHeader.types';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { ResourceDisconnectingClassLookUp } from './DisablingResourcesSearchHeader.utils';
import _ from 'lodash';
import { Select } from 'ui-kit/Select';

const { Option } = Select;

export const DisablingResourcesSearch: React.FC<
  DisablingResourcesSearchProps
> = ({ applyFilters, cities, filters }) => {
  const city: string | undefined = _.get(cities, ['0'], undefined);

  const { values, handleSubmit, setFieldValue } =
    useFormik<DisablingResourcesProps>({
      initialValues: {
        City: filters?.City || city,
        Resource: filters?.Resource,
        DisconnectingType: filters?.DisconnectingType,
        OrderRule: filters?.OrderRule,
        HousingStockId: filters?.HousingStockId,
        Status: filters?.Status,
        PageNumber: filters?.PageNumber,
        PageSize: filters?.PageSize,
        OrderBy: filters?.OrderBy,
      },
      enableReinitialize: true,
      onSubmit: applyFilters,
    });

  return (
    <StyledDisablingResourcesSearchHeader>
      <FormItem>
        <Select
          small
          placeholder="Город"
          value={values.City}
          onChange={(value) => {
            setFieldValue('City', value);
            handleSubmit();
          }}
        >
          {cities &&
            cities.map((el) => {
              return <Option value={el}>{el}</Option>;
            })}
        </Select>
      </FormItem>

      <FormItem>
        <Select
          small
          placeholder="Ресурс"
          value={values.Resource}
          defaultValue={''}
          onChange={(value) => {
            setFieldValue('Resource', value);
            handleSubmit();
          }}
        >
          <Option value={''}>{'Все типы ресурсов'}</Option>
          {Object.keys(EResourceType).map((el) => {
            return (
              <Option value={el}>{ResourceLookUp[el as EResourceType]}</Option>
            );
          })}
        </Select>
      </FormItem>

      <FormItem>
        <Select
          small
          placeholder="Класс"
          value={values.DisconnectingType}
          defaultValue={''}
          onChange={(value) => {
            setFieldValue('DisconnectingType', value);
            handleSubmit();
          }}
        >
          <Option value={''}>{'Все классы отключения'}</Option>
          {Object.keys(EResourceDisconnectingType).map((el) => {
            return (
              <Option value={el}>
                {
                  ResourceDisconnectingClassLookUp[
                    el as EResourceDisconnectingType
                  ]
                }{' '}
              </Option>
            );
          })}
        </Select>
      </FormItem>
      <FormItem>
        <label>Сортировать по: </label>
      </FormItem>
      <FormItem>
        <Select
          small
          value={values?.OrderBy}
          placeholder="Дате отключения"
          onChange={(value) => {
            setFieldValue('OrderBy', value);
            handleSubmit();
          }}
        >
          <Option value="Descending">Дате отключения (уб.)</Option>
          <Option value="Ascending">Дате отключения (возр.)</Option>
        </Select>
      </FormItem>
    </StyledDisablingResourcesSearchHeader>
  );
};