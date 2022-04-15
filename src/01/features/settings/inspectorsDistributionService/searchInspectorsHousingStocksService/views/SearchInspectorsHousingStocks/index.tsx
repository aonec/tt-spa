import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import {
  StyledAutocomplete,
  StyledInput,
  StyledSelector,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { Select } from 'antd';
import { useStore } from 'effector-react';
import React, { useState } from 'react';
import styled from 'styled-components';

export const SearchInspectorsHousingStocks = () => {
  const [street, setStreet] = useState('');

  const cities = useStore($existingCities);

  const existingStreets = useStore($existingStreets);

  const { match: streetMatch, options } = useAutocomplete(
    street,
    existingStreets
  );

  return (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={'Нижнекамск'} />
      <Wrap>
        <ExtendedSearch
          handleClose={() => {}}
          handleOpen={() => {}}
          extendedSearchContent={<></>}
        >
          <Grid temp="0.5fr 1fr 0.25fr" gap="15px" style={{ width: '100%' }}>
            <StyledSelector placeholder="Город">
              {cities &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </StyledSelector>
            <StyledAutocomplete
              value={street}
              onChange={setStreet}
              onKeyDown={fromEnter(() => setStreet(streetMatch))}
              options={options}
              placeholder="Улица"
            />
            <StyledInput placeholder="Дом" />
          </Grid>
        </ExtendedSearch>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 1000px;
`;
