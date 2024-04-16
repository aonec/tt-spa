import React, { useState } from 'react';
import { useFormik } from 'formik';
import { EResourceDisconnectingType, EResourceType } from 'api/types';
import { StyledDisablingResourcesSearchHeader } from './DisablingResourcesSearchHeader.styled';
import { DisablingResourcesProps } from '../../ResourceDisablingScheduleContainer.types';
import { DisablingResourcesSearchProps } from './DisablingResourcesSearchHeader.types';
import { ResourceDisconnectingClassLookUp } from './DisablingResourcesSearchHeader.utils';
import { Select } from 'ui-kit/Select';
import { FormItem } from 'ui-kit/FormItem';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';

const { Option } = Select;

export const DisablingResourcesSearch: React.FC<
  DisablingResourcesSearchProps
> = ({ applyFilters, cities, filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, handleSubmit, setFieldValue } =
    useFormik<DisablingResourcesProps>({
      initialValues: {
        City: filters?.City,
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
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      isPaddingSearch={false}
      extendedSearchContent={
        <>
          <FormItem>
            <Select
              small
              placeholder="Город"
              value={values.City}
              disabled={!cities?.length}
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
        </>
      }
    >
      <StyledDisablingResourcesSearchHeader>
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
                <Option value={el}>
                  {actResourceNamesLookup[el as EResourceType]}
                </Option>
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
            allowClear
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
    </ExtendedSearch>
  );
};
