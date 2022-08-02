import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { StyledAutocomplete, InputSC, SelectSC } from '01/shared/ui/Fields';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import React, { FC, ReactElement } from 'react';
import { Wrapper } from './AddressSearch.styled';
import { AddressSearchProps, SearchFieldType } from './AddressSearch.types';

export const AddressSearch: FC<AddressSearchProps> = ({
  streets,
  cities,
  values,
  handleSubmit,
  handleChange,
  fields,
}) => {
  const { keyDownEnterGuardedHandler, refs } = useOnEnterSwitch(5);

  const { match: streetMatch, options } = useAutocomplete(
    values.street,
    streets
  );

  function clearFields(index: number) {
    const clearingFieldsTypes = fields.slice(index, fields.length);

    clearingFieldsTypes.forEach((fieldType) => handleChange(fieldType, ''));
  }

  const citySearch = (index: number) => (
    <SelectSC
      placeholder="Город"
      ref={refs[index]}
      onKeyDown={keyDownEnterGuardedHandler(index)}
      onChange={(value) => handleChange(SearchFieldType.City, value.toString())}
      value={values.city}
    >
      {cities?.map((elem, index) => (
        <SelectSC.Option key={index} value={elem}>
          {elem}
        </SelectSC.Option>
      ))}
    </SelectSC>
  );

  const streetSearch = (index: number) => (
    
    <StyledAutocomplete
      placeholder="Улица"
      ref={refs[index]}
      value={values.street}
      onChange={(value) =>
        handleChange(SearchFieldType.Street, value.toString())
      }
      onKeyDown={(e) => {
        fromEnter(() => {
          if (values.street) handleChange(SearchFieldType.Street, streetMatch);
          handleSubmit();
        })(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
      options={options}
      onClick={() => {
        clearFields(index);
      }}
    />
  );

  const homeNumberSearch = (index: number) => (
    <InputSC
      placeholder="Дом"
      value={values.house}
      onChange={(e) => handleChange(SearchFieldType.House, e.target.value)}
      ref={refs[index]}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
    />
  );

  const corpusSearch = (index: number) => (
    <InputSC
      placeholder="Корпус"
      value={values.corpus}
      onChange={(e) => handleChange(SearchFieldType.Corpus, e.target.value)}
      ref={refs[index]}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
    />
  );

  const apartmentSearch = (index: number) => (
    <InputSC
      placeholder="Квартира"
      value={values.apartment}
      onChange={(e) => handleChange(SearchFieldType.Apartment, e.target.value)}
      ref={refs[index]}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
    />
  );

  const fieldsLookup: { [key: string]: (index: number) => ReactElement } = {
    [SearchFieldType.City]: citySearch,
    [SearchFieldType.Street]: streetSearch,
    [SearchFieldType.House]: homeNumberSearch,
    [SearchFieldType.Corpus]: corpusSearch,
    [SearchFieldType.Apartment]: apartmentSearch,
  };

  const searchFields = fields.map((fieldType, index) =>
    fieldsLookup[fieldType](index)
  );

  return <Wrapper fields={fields}>{searchFields}</Wrapper>;
};
