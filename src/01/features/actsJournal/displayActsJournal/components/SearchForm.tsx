import React from 'react';
import { useForm } from 'effector-forms';

import { useStore } from 'effector-react';
import { clearFilters, searchForm } from '../models';
import { useOnEnterSwitch } from '../../../readings/accountingNodesReadings/components/Filter';
import { $existingCities, ExistingCitiesGate } from '../../../housingStocks/displayHousingStockCities/models';
import { $existingStreets, ExistingStreetsGate } from '../../../housingStocks/displayHousingStockStreets/model';
import { Grid } from '../../../../shared/ui/Layout/Grid';
import { SelectSC, StyledAutocomplete } from '../../../../shared/ui/Fields';
import { fromEnter } from '../../../housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { useAutocomplete } from '../../../../_pages/MetersPage/hooks/useFilter';
import { ButtonTT } from '../../../../tt-components';

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

  const { match: streetMatch, options } = useAutocomplete(
    fields.street.value,
    existingStreets
  );

  function onSendHandler() {
    submit();
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
      <Grid temp="0.75fr 1.5fr 0.75fr 0.75fr 0.3fr" gap="15px">
        <SelectSC
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onFocus={clearValuesOnFocusCallback(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value!}
        >
          {cities?.map((elem, index) => (
            <SelectSC.Option key={index} value={elem}>
              {elem}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <StyledAutocomplete
          placeholder="Улица"
          ref={streetRef}
          value={fields.street.value}
          onChange={fields.street.onChange}
          onKeyDown={(e) => {
            fromEnter(() => fields.street.onChange(streetMatch))(e);
            fromEnter(onSendHandler)(e);
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
            fromEnter(onSendHandler)(e);
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
        <ButtonTT color="white" small onClick={clearFilters}>
          Очистить
        </ButtonTT>
      </Grid>
    </>
  );
};
