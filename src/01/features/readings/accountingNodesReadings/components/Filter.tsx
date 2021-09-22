import React from 'react';
import { useForm } from 'effector-forms';
import { accountingNodesFilterForm } from '../models';
import { StyledAutocomplete, StyledSelector } from '01/shared/ui/Fields';
import { Grid } from '01/shared/ui/Layout/Grid';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { useRef } from 'react';
import {
  cities,
  fromEnter,
} from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useStreetAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';

export const AccountingNodesFilter = () => {
  const { fields, submit } = useForm(accountingNodesFilterForm);

  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef],
  } = useOnEnterSwitch(3);

  const existingStreets = useStore($existingStreets);

  const { streetMatch, options } = useStreetAutocomplete(
    fields.street.value,
    existingStreets
  );

  return (
    <>
      <ExistingStreetsGate City={fields.city.value} />
      <Grid temp="0.75fr 1.5fr 0.75fr" gap="15px">
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
          onKeyDown={keyDownEnterGuardedHandler(2)}
        />
      </Grid>
    </>
  );
};

export function useOnEnterSwitch(amount: number) {
  const refs = getArrayByCountRange(amount, useRef) as any[];

  const lastRef = refs[refs.length - 1];

  function onEnterHandler(index: number) {
    if (index === amount - 1) lastRef?.current?.blur();

    refs[index + 1]?.current?.focus();
  }

  const keyDownEnterGuardedHandler = (index: number) =>
    fromEnter(() => onEnterHandler(index));

  return { keyDownEnterGuardedHandler, refs };
}
