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
import { AddressSearchProps, SearchFieldType } from './AddressSearch.types';

export const AddressSearch: FC<AddressSearchProps> = ({
  streets,
  cities,
  values,
  handleSubmit,
  handleChange,
  lastField,
}) => {
  const {
    keyDownEnterGuardedHandler,
    refs: [cityRef, streetRef, homeNumberRef, corpusRef, apartmentRef],
  } = useOnEnterSwitch(5);

  const { match: streetMatch, options } = useAutocomplete(
    values.street,
    streets
  );

  const citySearch = (
    <StyledSelector
      placeholder="Город"
      ref={cityRef}
      onKeyDown={keyDownEnterGuardedHandler(0)}
      onChange={(value) => handleChange(SearchFieldType.City, value.toString())}
      value={values.city}
    >
      {cities?.map((elem, index) => (
        <StyledSelector.Option key={index} value={elem}>
          {elem}
        </StyledSelector.Option>
      ))}
    </StyledSelector>
  );

  const streetSearch = (
    <StyledAutocomplete
      placeholder="Улица"
      ref={streetRef}
      value={values.street}
      onChange={(value) =>
        handleChange(SearchFieldType.Street, value.toString())
      }
      onKeyDown={(e) => {
        fromEnter(() => {
          if (values.street) handleChange(SearchFieldType.Street, streetMatch);
          handleSubmit();
        })(e);
        keyDownEnterGuardedHandler(1)(e);
      }}
      options={options}
      onClick={() => {
        handleChange(SearchFieldType.Street, '');
        handleChange(SearchFieldType.House, '');
        handleChange(SearchFieldType.Corpus, '');
        handleChange(SearchFieldType.Apartment, '');
      }}
    />
  );

  const homeNumberSearch = (
    <StyledInput
      placeholder="Дом"
      value={values.house}
      onChange={(e) => handleChange(SearchFieldType.House, e.target.value)}
      ref={homeNumberRef}
      onClick={() => {
        handleChange(SearchFieldType.House, '');
        handleChange(SearchFieldType.Corpus, '');
        handleChange(SearchFieldType.Apartment, '');
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(2)(e);
      }}
    />
  );

  const corpusSearch = (
    <StyledInput
      placeholder="Корпус"
      value={values.corpus}
      onChange={(e) => handleChange(SearchFieldType.Corpus, e.target.value)}
      ref={corpusRef}
      onClick={() => {
        handleChange(SearchFieldType.Corpus, '');
        handleChange(SearchFieldType.Apartment, '');
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(3)(e);
      }}
    />
  );

  const apartmentSearch = (
    <StyledInput
      placeholder="Квартира"
      value={values.apartment}
      onChange={(e) => handleChange(SearchFieldType.Apartment, e.target.value)}
      ref={apartmentRef}
      onClick={() => {
        handleChange(SearchFieldType.Apartment, '');
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(4)(e);
      }}
    />
  );

  const fields = {
    [SearchFieldType.City]: citySearch,
    [SearchFieldType.Street]: streetSearch,
    [SearchFieldType.House]: homeNumberSearch,
    [SearchFieldType.Corpus]: corpusSearch,
    [SearchFieldType.Apartment]: apartmentSearch,
  };

  const lastFieldIndex = Object.keys(fields).lastIndexOf(lastField);

  const searchFields = Object.values(fields).slice(0, lastFieldIndex + 1);

  return <Wrapper lastField={lastField}>{searchFields}</Wrapper>;
};
