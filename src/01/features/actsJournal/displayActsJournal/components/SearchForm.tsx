import React from 'react';
import { useForm } from 'effector-forms';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useAutocomplete } from '01/hooks/useFilter';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { clearFilters, searchForm } from '../models';
import { Button } from 'ui-kit/Button';
import { Select } from 'ui-kit/Select';

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
    existingStreets,
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
      <Grid temp="0.75fr 1.5fr 0.75fr 0.75fr 0.3fr" gap="16px">
        <Select
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onFocus={clearValuesOnFocusCallback(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value!}
          search
        >
          {cities?.map((elem, index) => (
            <Select.Option key={index} value={elem}>
              {elem}
            </Select.Option>
          ))}
        </Select>
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
        <Button type="ghost" size="small" onClick={() => clearFilters()}>
          Очистить
        </Button>
      </Grid>
    </>
  );
};
