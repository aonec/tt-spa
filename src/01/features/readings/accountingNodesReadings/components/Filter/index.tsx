import React from 'react';
import { useForm } from 'effector-forms';
import { accountingNodesFilterForm } from '../../models';
import { StyledAutocomplete, SelectSC } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { useRef } from 'react';
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

export const AccountingNodesFilter = () => {
  const { fields, submit } = useForm(accountingNodesFilterForm);
  const fieldsArray = [fields.city, fields.street, fields.house];

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
      <Grid temp="0.75fr 1.5fr 0.75fr" gap="15px">
        <SelectSC
          placeholder="Город"
          ref={cityRef}
          onKeyDown={keyDownEnterGuardedHandler(0)}
          onChange={fields.city.onChange as any}
          value={fields.city.value}
          onFocus={clearValuesOnFocusCallback(0)}
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
      </Grid>
    </>
  );
};

export function useOnEnterSwitch(amount: number, difference?: number) {
  const refs = getArrayByCountRange(amount, useRef) as any[];

  const lastRef = refs[refs.length - 1];
  const refWithoutDisabled = refs.slice(
    0,
    (amount -= difference !== undefined ? difference : 0)
  );

  
  function onEnterHandler(index: number) {
    try {
      if (refs[index]?.current) refs[index]?.current?.blur();
    } catch (error) {}

    if (index === amount - 1) {
      if (lastRef?.current?.blur) lastRef?.current?.blur();
    }

    if (refs[index + 1]?.current?.focus) {
      refs[index + 1]?.current?.focus();
    }
  }

  const keyDownEnterGuardedHandler = (index: number) =>
    fromEnter(() => onEnterHandler(index));

  return {
    keyDownEnterGuardedHandler,
    refs,
    onEnterHandler,
    refWithoutDisabled,
  };
}
