import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import {
  StyledAutocomplete,
  StyledInput,
  StyledSelector,
} from '01/shared/ui/Fields';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import React, { FC } from 'react';
import { Wrapper } from './AddressSearch.styled';
import { AddressSearchProps } from './AddressSearch.types';

export const AddressSearch: FC<AddressSearchProps> = ({
  streets,
  cities,
  values,
  handleSubmit,
  handleChange,
}) => {
  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef, corpusRef, apartmentRef],
  } = useOnEnterSwitch(5);

  const { match: streetMatch, options } = useAutocomplete(
    values.street,
    streets
  );

  return (
    <Wrapper>
      <StyledSelector
        placeholder="Город"
        ref={cityRef}
        onKeyDown={keyDownEnterGuardedHandler(0)}
        onChange={(value) => handleChange('city', value.toString())}
        value={values.city}
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
        value={values.street}
        onChange={(value) => handleChange('street', value.toString())}
        onKeyDown={(e) => {
          fromEnter(() => {
            if (values.street) handleChange('street', streetMatch);
            handleSubmit();
          })(e);
          keyDownEnterGuardedHandler(1)(e);
        }}
        options={options}
        onClick={() => {
          handleChange('street', '');
          handleChange('house', '');
          handleChange('apartment', '');
        }}
      />
      <StyledInput
        placeholder="Дом"
        value={values.house}
        onChange={(e) => handleChange('house', e.target.value)}
        ref={homeNumberRef}
        onClick={() => {
          handleChange('house', '');
          handleChange('apartment', '');
        }}
        onKeyDown={(e) => {
          fromEnter(handleSubmit)(e);
          keyDownEnterGuardedHandler(2)(e);
        }}
      />
      <StyledInput
        placeholder="Корпус"
        value={values.corpus}
        onChange={(e) => handleChange('corpus', e.target.value)}
        ref={corpusRef}
        onClick={() => {
          handleChange('house', '');
          handleChange('apartment', '');
        }}
        onKeyDown={(e) => {
          fromEnter(handleSubmit)(e);
          keyDownEnterGuardedHandler(2)(e);
        }}
      />
      <StyledInput
        placeholder="Квартира"
        value={values.apartment}
        onChange={(e) => handleChange('apartment', e.target.value)}
        ref={apartmentRef}
        onClick={() => {
          handleChange('apartment', '');
        }}
        onKeyDown={(e) => {
          fromEnter(handleSubmit)(e);
          keyDownEnterGuardedHandler(3)(e);
        }}
      />
    </Wrapper>
  );
};
