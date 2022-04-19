import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import {
  StyledAutocomplete,
  StyledInput,
  StyledSelector,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { Form, Select } from 'antd';
import React, { FC } from 'react';
import { ExtendedSearchWrap, Wrap } from './components';
import { SearchInspectorsHousingStocksProps } from './types';

export const SearchInspectorsHousingStocks: FC<SearchInspectorsHousingStocksProps> = ({
  form,
  cities,
  existingStreets,
  isExtendedSearchOpen,
  handelExtendedSearchOpen,
  handleExtendedSearchClose,
}) => {
  const street = form.fields.Street.value;

  const { match: streetMatch, options } = useAutocomplete(
    street,
    existingStreets
  );

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  return (
    <>
      <Wrap>
        <ExtendedSearch
          open={isExtendedSearchOpen}
          handleClose={handleExtendedSearchClose}
          handleOpen={handelExtendedSearchOpen}
          extendedSearchContent={
            <ExtendedSearchWrap>
              <Form.Item label="Инспектор">
                <StyledSelector placeholder="Выберите из списка"></StyledSelector>
              </Form.Item>
              <Form.Item label="Домоуправление">
                <StyledSelector placeholder="Выберите из списка"></StyledSelector>
              </Form.Item>
            </ExtendedSearchWrap>
          }
        >
          <Grid temp="0.5fr 1fr 0.25fr" gap="15px" style={{ width: '100%' }}>
            <StyledSelector
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(0)(e);
              }}
              ref={cityRef}
              placeholder="Город"
              value={form.fields.City.value}
              onChange={form.fields.City.onChange}
            >
              {cities &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </StyledSelector>
            <StyledAutocomplete
              ref={streetRef}
              value={form.fields.Street.value}
              onChange={form.fields.Street.onChange}
              onKeyDown={(e) => {
                fromEnter(() => form.fields.Street.onChange(streetMatch))(e);
                keyDownEnterGuardedHandler(1)(e);
              }}
              options={options}
              placeholder="Улица"
            />
            <StyledInput
              ref={homeNumberRef}
              placeholder="Дом"
              onKeyDown={(e) => {
                keyDownEnterGuardedHandler(2)(e);
              }}
            />
          </Grid>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};
