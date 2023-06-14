import { useOnEnterSwitch } from '01/features/readings/accountingNodesReadings/components/Filter';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { useAutocomplete } from '01/hooks/useFilter';
import React, { FC, ReactElement } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { SearchFieldsLabels } from './AddressSearch.constants';
import { Wrapper } from './AddressSearch.styled';
import { AddressSearchProps, SearchFieldType } from './AddressSearch.types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { AutoComplete } from 'ui-kit/AutoComplete';

export const AddressSearch: FC<AddressSearchProps> = ({
  streets,
  cities,
  values,
  handleSubmit,
  handleChange,
  fields,
  customTemplate,
  showLabels,
  disabledFields,
}) => {
  const { keyDownEnterGuardedHandler, refs } = useOnEnterSwitch(5);

  const { match: streetMatch, options } = useAutocomplete(
    values.street,
    streets,
  );

  function clearFields(index: number) {
    const clearingFieldsTypes = fields.slice(index, fields.length);

    clearingFieldsTypes
      .filter((elem) => elem !== SearchFieldType.City)
      .forEach((fieldType) => handleChange(fieldType, ''));
  }

  const citySearch = (index: number, isDisabled?: boolean) => (
    <Select
      small
      placeholder="Город"
      ref={refs[index]}
      onKeyDown={keyDownEnterGuardedHandler(index)}
      onChange={(value) => {
        handleChange(SearchFieldType.City, value.toString());

        handleSubmit();
      }}
      value={values.city}
      disabled={isDisabled}
      style={{ minWidth: 180 }}
    >
      {cities?.map((elem, index) => (
        <Select.Option key={index} value={elem}>
          {elem}
        </Select.Option>
      ))}
    </Select>
  );

  const streetSearch = (index: number, isDisabled?: boolean) => (
    <AutoComplete
      small
      placeholder="Улица"
      ref={refs[index]}
      value={values.street || ''}
      onChange={(value) => {
        handleChange(SearchFieldType.Street, value.toString());
      }}
      onKeyDown={(e) => {
        fromEnter(() => {
          if (values.street) handleChange(SearchFieldType.Street, streetMatch);
          handleSubmit();
        })(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
      options={options}
      onSelect={() => {
        if (values.street) handleChange(SearchFieldType.Street, streetMatch);
        handleSubmit();
      }}
      onFocus={() => {
        clearFields(index);
      }}
      disabled={isDisabled}
    />
  );

  const homeNumberSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
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
      disabled={isDisabled}
    />
  );

  const corpusSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
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
      disabled={isDisabled}
    />
  );

  const apartmentSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
      placeholder="Квартирa"
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
      disabled={isDisabled}
    />
  );

  const questionSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
      placeholder="Л/С или ФИО"
      value={values.question}
      onChange={(e) => handleChange(SearchFieldType.Question, e.target.value)}
      ref={refs[index]}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={(e) => {
        fromEnter(handleSubmit)(e);
        keyDownEnterGuardedHandler(index)(e);
      }}
      disabled={isDisabled}
    />
  );

  const fieldsLookup: {
    [key: string]: (index: number, isDisabled?: boolean) => ReactElement;
  } = {
    [SearchFieldType.City]: citySearch,
    [SearchFieldType.Street]: streetSearch,
    [SearchFieldType.House]: homeNumberSearch,
    [SearchFieldType.Corpus]: corpusSearch,
    [SearchFieldType.Apartment]: apartmentSearch,
    [SearchFieldType.Question]: questionSearch,
  };

  const searchFields = fields.map((fieldType, index) => {
    const field = fieldsLookup[fieldType](
      index,
      disabledFields?.includes(fieldType),
    );

    return (
      <React.Fragment key={fieldType}>
        {showLabels && (
          <FormItem label={SearchFieldsLabels[fieldType]}>{field}</FormItem>
        )}
        {!showLabels && field}
      </React.Fragment>
    );
  });

  return (
    <Wrapper fields={fields} customTemplate={customTemplate}>
      {searchFields}
    </Wrapper>
  );
};
