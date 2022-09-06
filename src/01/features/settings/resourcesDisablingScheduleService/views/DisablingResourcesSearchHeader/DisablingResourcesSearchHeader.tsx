import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { SelectSC } from 'services/tasks/tasksProfileService/view/SearchTasks/SearchTasks.styled';
import {
  FormItem,
  StyledDisablingResourcesSearchHeader,
} from './DisablingResourcesSearchHeader.styled';
import { DisablingResourcesProps } from '../../ResourceDisablingScheduleContainer.types';
import { DisablingResourcesSearchProps } from './DisablingResourcesSearchHeader.types';
import { Select } from 'antd';
import { EResourceDisconnectingType, EResourceType } from 'myApi';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { ClassLookUp } from './DisablingResourcesSearchHeader.utils';

const { Option } = Select;

export const DisablingResourcesSearch: React.FC<DisablingResourcesSearchProps> = ({
  applyFilters,
  cities,
}) => {
  const city = cities && cities?.length === 1 ? cities[0] : undefined;

  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<DisablingResourcesProps>({
    initialValues: {
      City: city,
      Resource: undefined,
      DisconnectingType: undefined,
      OrderRule: undefined,
      HousingStockId: undefined,
      Status: undefined,
      PageNumber: undefined,
      PageSize: undefined,
      OrderBy: undefined,
    },
    enableReinitialize: true,
    onSubmit: applyFilters,
  });

  return (
    <StyledDisablingResourcesSearchHeader>
      <FormItem>
        <SelectSC
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
        </SelectSC>
      </FormItem>

      <FormItem>
        <SelectSC
          placeholder="Ресурс"
          value={values.Resource}
          defaultValue={''}
          onChange={(value) => {
            setFieldValue('Resource', value);
            handleSubmit();
          }}
          //   onSelect={() => applyFilters(values)}
        >
          <Option value={''}>{'Все типы ресурсов'}</Option>
          {Object.keys(EResourceType).map((el) => {
            return (
              <Option value={el}>{ResourceLookUp[el as EResourceType]}</Option>
            );
          })}
        </SelectSC>
      </FormItem>

      <FormItem>
        <SelectSC
          placeholder="Класс"
          value={values.DisconnectingType}
          defaultValue={''}
          onChange={(value) => {
            setFieldValue('DisconnectingType', value);
            handleSubmit();
          }}
          //   onSelect={() => applyFilters(values)}
        >
          <Option value={''}>{'Все классы отключения'}</Option>
          {Object.keys(EResourceDisconnectingType).map((el) => {
            return (
              <Option value={el}>
                {ClassLookUp[el as EResourceDisconnectingType]}{' '}
              </Option>
            );
          })}
        </SelectSC>
      </FormItem>
      <FormItem>
        <label>Сортировать по: </label>
      </FormItem>
      <FormItem>
        <SelectSC
          value={values?.OrderBy}
          placeholder="Дате проверки"
          onChange={(value) => {
            setFieldValue('OrderBy', value);
            handleSubmit();
          }}
        >
          <Option value="Descending">Дате отключения (уб.)</Option>
          <Option value="Ascending">Дате отключения (возр.)</Option>
        </SelectSC>
      </FormItem>
    </StyledDisablingResourcesSearchHeader>
  );
};
