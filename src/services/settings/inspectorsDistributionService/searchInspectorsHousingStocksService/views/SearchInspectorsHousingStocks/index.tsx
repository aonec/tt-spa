import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Form } from 'antd';
import React, { FC } from 'react';
import { ExtendedSearchWrap, Wrap } from './components';
import { SearchInspectorsHousingStocksProps } from './types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { useAutocomplete } from 'hooks/useAutocomplete';

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

  const next = useSwitchInputOnEnter(dataKey, false);

  const fieldsArray = [
    form.fields.City,
    form.fields.Street,
    form.fields.HousingStockNumber,
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
                      form.fields.InspectorId.onChange(value);
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
                      form.fields.HouseManagement.onChange(value);
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
          <Grid temp="0.5fr 1fr 0.25fr" gap="15px" style={{ width: '100%' }}>
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
              onChange={form.fields.City.onChange}
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
                    form.fields.Street.value ? streetMatch : '',
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
              value={form.fields.HousingStockNumber.value}
              onChange={(e) =>
                form.fields.HousingStockNumber.onChange(e.target.value)
              }
              onFocus={() => clearValuesOnFocus(2)}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                next(2);
                handleSearch();
              })}
            />
          </Grid>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};
