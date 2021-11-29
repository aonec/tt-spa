import React from 'react';
import { useForm } from 'effector-forms';
import { StyledAutocomplete, StyledSelector } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { searchForm } from '../models';

export const SearchForm = () => {
  const { fields, submit } = useForm(searchForm);

  const fieldsArray = [
    fields.city,
    fields.street,
    fields.house,
    fields.apartment,
  ];

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef, apartmentNumberRef],
  } = useOnEnterSwitch(4);

  const existingStreets = useStore($existingStreets);

  const { streetMatch, options } = useAutocomplete(
    fields.street.value,
    existingStreets
  );

  function onSendHandler() {
    if (fields.city && fields.street && fields.house) submit();
  }

  function clearValuesOnFocus(index: number) {
    const subFieldsArray = fieldsArray.slice(index, fieldsArray.length);

    subFieldsArray.forEach((field) => field.onChange(''));
  }

  const clearValuesOnFocusCallback = (index: number) => () =>
    clearValuesOnFocus(index);

  const cities = useStore($existingCities);

  return (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={fields.city.value} />
      <Grid temp="0.75fr 1.5fr 0.75fr 0.75fr" gap="15px">
        <StyledSelector
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onFocus={clearValuesOnFocusCallback(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value}
        >
          {cities?.map((elem, index) => (
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
          onFocus={clearValuesOnFocusCallback(1)}
          options={options}
        />
        <StyledAutocomplete
          placeholder="Дом"
          value={fields.house.value}
          onChange={fields.house.onChange}
          ref={homeNumberRef}
          onFocus={clearValuesOnFocusCallback(2)}
          onKeyDown={(e) => {
            keyDownEnterGuardedHandler(2)(e);
          }}
        />
        <StyledAutocomplete
          placeholder="Кв."
          value={fields.apartment.value}
          onChange={fields.apartment.onChange}
          ref={apartmentNumberRef}
          onFocus={clearValuesOnFocusCallback(3)}
          onKeyDown={(e) => {
            fromEnter(onSendHandler)(e);
            keyDownEnterGuardedHandler(3)(e);
          }}
        />
      </Grid>
    </>
  );
};
