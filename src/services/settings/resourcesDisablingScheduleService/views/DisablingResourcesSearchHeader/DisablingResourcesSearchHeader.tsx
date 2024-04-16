import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { EResourceDisconnectingType, EResourceType } from 'api/types';
import {
  ExtendedSearchContent,
  SortLable,
  StyledDisablingResourcesSearchHeader,
} from './DisablingResourcesSearchHeader.styled';
import { DisablingResourcesProps } from '../../ResourceDisablingScheduleContainer.types';
import { DisablingResourcesSearchProps } from './DisablingResourcesSearchHeader.types';
import { ResourceDisconnectingClassLookUp } from './DisablingResourcesSearchHeader.utils';
import { Select } from 'ui-kit/Select';
import { FormItem } from 'ui-kit/FormItem';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Input } from 'ui-kit/Input';
import { useDebounce } from 'hooks/useDebounce';

const { Option } = Select;

export const DisablingResourcesSearch: React.FC<
  DisablingResourcesSearchProps
> = ({ applyFilters, filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, handleSubmit, setFieldValue, setValues, resetForm } =
    useFormik<DisablingResourcesProps>({
      initialValues: {
        addressCity: filters.addressCity,
        addressStreet: filters.addressStreet,
        addressHousingStockNumber: filters.addressHousingStockNumber,
        addressCorpus: filters.addressCorpus,

        Resource: filters.Resource,
        DisconnectingType: filters.DisconnectingType,
        OrderBy: filters.OrderBy,
      },
      onSubmit: applyFilters,
    });

  const deouncedFiltes = useDebounce(values, 500);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit, deouncedFiltes]);

  const addressFilters = useMemo<AddressSearchValues>(() => {
    return {
      city: values.addressCity,
      street: values.addressStreet,
      house: values.addressHousingStockNumber,
      corpus: values.addressCorpus,
    };
  }, [values]);

  const setAddressFilters = useCallback(
    (values: Partial<AddressSearchValues>) => {
      const newValues = {
        addressCity: values.city,
        addressStreet: values.street,
        addressHousingStockNumber: values.house,
        addressCorpus: values.corpus,
      };

      setValues((prev) => ({ ...prev, ...newValues }));
    },
    [setValues],
  );

  const addressSearch = (
    <AddressSearchContainer
      initialValues={addressFilters}
      handleSubmit={setAddressFilters}
      showLabels={isOpen}
      customTemplate={[
        {
          fieldType: SearchFieldType.City,
          templateValue: '1fr',
        },
        {
          fieldType: SearchFieldType.Street,
          templateValue: '1fr',
        },
        {
          fieldType: SearchFieldType.House,
          templateValue: '0.5fr',
        },
        {
          fieldType: SearchFieldType.Corpus,
          templateValue: '0.5fr',
        },
      ]}
      fields={[
        SearchFieldType.City,
        SearchFieldType.Street,
        SearchFieldType.House,
        SearchFieldType.Corpus,
      ]}
    />
  );

  return (
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      handleApply={() => setIsOpen(false)}
      handleClear={resetForm}
      isPaddingSearch={false}
      extendedSearchContent={
        <>
          {addressSearch}
          <ExtendedSearchContent>
            <FormItem label="Тип ресурса">
              <Select
                small
                placeholder="Ресурс"
                value={values.Resource}
                defaultValue={''}
                onChange={(value) => {
                  setFieldValue('Resource', value);
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
            <FormItem label="Класс отключения">
              <Select
                small
                placeholder="Класс"
                value={values.DisconnectingType}
                defaultValue={''}
                onChange={(value) => {
                  setFieldValue('DisconnectingType', value);
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
            <FormItem label="Домоуправление">
              <Select small placeholder="Выберите"></Select>
            </FormItem>
            <FormItem label="Отправитель">
              <Input small placeholder="Отправитель" />
            </FormItem>
          </ExtendedSearchContent>
        </>
      }
    >
      <StyledDisablingResourcesSearchHeader>
        {addressSearch}
        <SortLable>Сортировать по:</SortLable>
        <Select
          small
          allowClear
          value={values?.OrderBy}
          placeholder="Дате отключения"
          onChange={(value) => {
            setFieldValue('OrderBy', value);
          }}
        >
          <Option value="Descending">Дате отключения (уб.)</Option>
          <Option value="Ascending">Дате отключения (возр.)</Option>
        </Select>
      </StyledDisablingResourcesSearchHeader>
    </ExtendedSearch>
  );
};
