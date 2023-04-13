import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/hooks/useFilter';
import { Form } from 'antd';
import React, { FC } from 'react';
import { ExtendedSearchWrap, Wrap } from './components';
import { SearchInspectorsHousingStocksProps } from './types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';

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

  const { match: streetMatch, options } = useAutocomplete(
    street,
    existingStreets,
  );

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

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
                  search
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
                  search
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
              search
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(0)(e);
                fromEnter(handleSearch)(e);
              }}
              ref={cityRef}
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
            <StyledAutocomplete
              ref={streetRef}
              value={form.fields.Street.value}
              onChange={form.fields.Street.onChange}
              onKeyDown={(e) => {
                fromEnter(() =>
                  form.fields.Street.onChange(
                    form.fields.Street.value ? streetMatch : '',
                  ),
                )(e);
                keyDownEnterGuardedHandler(1)(e);
                fromEnter(handleSearch)(e);
              }}
              onFocus={() => clearValuesOnFocus(1)}
              options={options}
              placeholder="Улица"
            />
            <Input
              search
              ref={homeNumberRef}
              placeholder="Дом"
              value={form.fields.HousingStockNumber.value}
              onChange={(e) =>
                form.fields.HousingStockNumber.onChange(e.target.value)
              }
              onFocus={() => clearValuesOnFocus(2)}
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(2)(e);
                fromEnter(handleSearch)(e);
              }}
            />
          </Grid>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};
