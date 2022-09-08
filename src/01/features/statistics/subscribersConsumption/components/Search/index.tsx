import axios from '01/axios';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import {
  StyledAutocomplete,
  FilterButton,
  SelectSC,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import { HousingStockListResponsePagedList } from 'myApi';
import React from 'react';
import {
  $isExpandedSearchOpen,
  openExpandedSearch,
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
} from '../../models';
import { ExpandedSearch } from '../ExpandedSearch';
import { Wrapper } from './Search.styled';

export const Search: React.FC = () => {
  const { fields, submit } = useForm(subscribersConsumptionFindForm);

  const isOpenExpandedSearch = useStore($isExpandedSearchOpen);

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  const existingStreets = useStore($existingStreets);

  const { match: streetMatch, options } = useAutocomplete(
    fields.street.value,
    existingStreets
  );

  function onSendHandler() {
    if (fields.city && fields.street && fields.house) submit();
  }

  async function onFindHandler() {
    const city = fields.city.value;
    const street = fields.street.value;
    const house = fields.house.value;

    if (!city || !street || !house) return;

    try {
      const res: HousingStockListResponsePagedList = await axios.get(
        'HousingStocks',
        {
          params: {
            City: city,
            Street: street,
            HousingStockNumber: house,
            PageSize: 1,
            PageNumber: 1,
          },
        }
      );

      if (!res.items) return;

      const housingStock = res.items[0];

      if (!housingStock) return;

      setSelectedHousingStockId(housingStock.id);
    } catch (error) {}
  }

  const cities = useStore($existingCities);

  const baseSearch = (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={fields.city.value} />
      <Grid temp="32px 0.5fr 1fr 0.2fr" gap="15px">
        <div onClick={() => void openExpandedSearch()}>
          <FilterButton />
        </div>
        <SelectSC
          onBlur={onFindHandler}
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value}
        >
          {cities?.map((elem, index) => (
            <SelectSC.Option key={index} value={elem}>
              {elem}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <StyledAutocomplete
          onBlur={onFindHandler}
          placeholder="Улица"
          ref={streetRef}
          value={fields.street.value}
          onChange={fields.street.onChange}
          onKeyDown={(e) => {
            fromEnter(() => fields.street.onChange(streetMatch))(e);
            keyDownEnterGuardedHandler(1)(e);
          }}
          options={options}
          onClick={() => {
            fields.street.onChange('');
            fields.house.onChange('');
          }}
        />
        <StyledAutocomplete
          onBlur={onFindHandler}
          placeholder="Дом"
          value={fields.house.value}
          onChange={fields.house.onChange}
          ref={homeNumberRef}
          onClick={() => fields.house.onChange('')}
          onKeyDown={(e) => {
            fromEnter(onSendHandler)(e);
            keyDownEnterGuardedHandler(2)(e);
          }}
        />
      </Grid>
    </>
  );

  const expandedSearch = <ExpandedSearch />;

  return (
    <Wrapper>
      {isOpenExpandedSearch ? expandedSearch : baseSearch}
    </Wrapper>
  );
};
