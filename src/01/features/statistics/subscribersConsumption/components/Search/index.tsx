import {
  cities,
  fromEnter,
} from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import {
  StyledAutocomplete,
  FilterButton,
  StyledSelector,
} from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { useStreetAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isExpandedSearchOpen,
  openExpandedSearch,
  subscribersConsumptionFilterForm,
} from '../../models';
import { ExpandedSearch } from '../ExpandedSearch';

export const Search: React.FC = () => {
  const { fields, submit } = useForm(subscribersConsumptionFilterForm);

  const isOpenExpandedSearch = useStore($isExpandedSearchOpen);

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  const existingStreets = useStore($existingStreets);

  const { streetMatch, options } = useStreetAutocomplete(
    fields.street.value,
    existingStreets
  );

  function onSendHandler() {
    if (fields.city && fields.street && fields.house) submit();
  }

  const baseSearch = (
    <>
      <ExistingStreetsGate City={fields.city.value} />
      <Grid temp="32px 0.5fr 1fr 0.2fr" gap="15px">
        <div onClick={() => void openExpandedSearch()}>
          <FilterButton />
        </div>
        <StyledSelector
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value}
        >
          {cities.map((elem, index) => (
            <StyledSelector.Option key={index} value={elem}>
              {elem}
            </StyledSelector.Option>
          ))}
        </StyledSelector>
        <StyledAutocomplete
          placeholder="Улица"
          ref={streetRef}
          value={fields.street.value}
          onChange={fields.street.onChange}
          onKeyDown={(e) => {
            fromEnter(() => fields.street.onChange(streetMatch))(e);
            keyDownEnterGuardedHandler(1)(e);
          }}
          options={options}
        />
        <StyledAutocomplete
          placeholder="Дом"
          value={fields.house.value}
          onChange={fields.house.onChange}
          ref={homeNumberRef}
          onKeyDown={(e) => {
            fromEnter(onSendHandler)(e);
            keyDownEnterGuardedHandler(2)(e);
          }}
        />
      </Grid>
    </>
  );

  const expandedSearch = <ExpandedSearch />;

  return isOpenExpandedSearch ? expandedSearch : baseSearch;
};
