import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { Form } from 'antd';
import React, { FC } from 'react';
import { SearchInspectorsHousingStocksProps } from './types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { useAutocomplete } from 'hooks/useAutocomplete';
import {
  ExtendedSearchWrap,
  GridContainer,
  Wrap,
} from './SearchInspectorsHousingStocks.styled';

const dataKey = 'search-inspectors-housing-stocks-input';

export const SearchInspectorsHousingStocks: FC<
  SearchInspectorsHousingStocksProps
> = ({
  form,
  cities,
  existingStreets,
  isExtendedSearchOpen,
  handelExtendedSearchOpen,
  handleExtendedSearchClose,
  inspectors,
  hosuingManagements,
  handleSearch,
  handleApplyFilters,
  handleClearExtendedSearchValues,
}) => {
  const street = form.fields.Street.value;

  const autocomplete = useAutocomplete(street, existingStreets || []);
  const streetMatch = autocomplete?.bestMatch;
  const options = autocomplete?.options;

  const next = useSwitchInputOnEnter(dataKey, false, false);

  const fieldsArray = [
    form.fields.City,
    form.fields.Street,
    form.fields.BuildingNumber,
  ];

  function clearValuesOnFocus(index: number) {
    const subFieldsArray = fieldsArray.slice(index, fieldsArray.length);

    subFieldsArray.forEach((field) => field.onChange(''));
  }

  return (
    <>
      <Wrap>
        <ExtendedSearch
          isOpen={isExtendedSearchOpen}
          handleClose={handleExtendedSearchClose}
          handleOpen={handelExtendedSearchOpen}
          handleApply={handleApplyFilters}
          handleClear={handleClearExtendedSearchValues}
          extendedSearchContent={
            <ExtendedSearchWrap>
              <Form.Item label="Инспектор">
                <Select
                  small
                  placeholder="Выберите из списка"
                  value={form.fields.InspectorId.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.InspectorId.reset();
                    } else {
                      form.fields.InspectorId.onChange(value as number);
                    }
                  }}
                  allowClear
                >
                  {inspectors?.map((inspector) => (
                    <Select.Option key={inspector.id} value={inspector.id}>
                      {inspector.fullName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Домоуправление">
                <Select
                  small
                  value={form.fields.HouseManagement.value || undefined}
                  onChange={(value) => {
                    if (!value) {
                      form.fields.HouseManagement.reset();
                    } else {
                      form.fields.HouseManagement.onChange(value as string);
                    }
                  }}
                  allowClear
                  placeholder="Выберите из списка"
                >
                  {hosuingManagements?.map((houseManagement) => (
                    <Select.Option
                      key={houseManagement.key}
                      value={houseManagement.value!}
                    >
                      {houseManagement.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </ExtendedSearchWrap>
          }
        >
          <GridContainer>
            <Select
              small
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                next(0);
                handleSearch();
              })}
              showAction={['focus']}
              placeholder="Город"
              value={form.fields.City.value || undefined}
              onChange={(value) => form.fields.City.onChange(value as string)}
              onFocus={() => clearValuesOnFocus(0)}
            >
              {cities &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </Select>
            <AutoComplete
              small
              data-reading-input={dataKey}
              value={form.fields.Street.value}
              onChange={form.fields.Street.onChange}
              onKeyDown={(e) => {
                fromEnter(() =>
                  form.fields.Street.onChange(
                    form.fields.Street.value ? streetMatch || '' : '',
                  ),
                )(e);
                fromEnter(() => {
                  next(1);
                  handleSearch();
                })(e);
              }}
              onFocus={() => clearValuesOnFocus(1)}
              options={options}
              placeholder="Улица"
            />
            <Input
              small
              placeholder="Дом"
              value={form.fields.BuildingNumber.value}
              onChange={(e) =>
                form.fields.BuildingNumber.onChange(e.target.value)
              }
              onFocus={() => clearValuesOnFocus(2)}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                next(2);
                handleSearch();
              })}
            />
          </GridContainer>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};
