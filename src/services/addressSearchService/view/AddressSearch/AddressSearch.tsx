import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import React, { FC, ReactElement } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { SearchFieldsLabels } from './AddressSearch.constants';
import { Wrapper } from './AddressSearch.styled';
import { AddressSearchProps, SearchFieldType } from './AddressSearch.types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { useAutocomplete } from 'hooks/useAutocomplete';

const dataKey = 'search-address-inputs';

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
  const next = useSwitchInputOnEnter(dataKey, false, false);

  const autocomplete = useAutocomplete(values.street || null, streets);
  const streetMatch = autocomplete ? autocomplete.bestMatch : null;
  const options = autocomplete ? autocomplete.options : [];

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
      onKeyDown={fromEnter(() => next(index))}
      data-reading-input={dataKey}
      // showAction={['focus']}
      onChange={(value) => {
        handleChange(SearchFieldType.City, value.toString());

        handleSubmit();
      }}
      value={values.city}
      style={{ minWidth: 180 }}
      disabled={isDisabled || !cities.length}
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
      data-reading-input={dataKey}
      value={values.street || ''}
      onChange={(value) => {
        handleChange(SearchFieldType.Street, value.toString());
      }}
      onKeyDown={fromEnter(() => {
        if (values.street && streetMatch)
          handleChange(SearchFieldType.Street, streetMatch);
        handleSubmit();
        next(index);
      })}
      options={options}
      onSelect={() => {
        if (values.street && streetMatch)
          handleChange(SearchFieldType.Street, streetMatch);
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
      onClick={() => {
        clearFields(index);
      }}
      data-reading-input={dataKey}
      onKeyDown={fromEnter(() => {
        handleSubmit();
        next(index);
      })}
      disabled={isDisabled}
    />
  );

  const corpusSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
      placeholder="Корпус"
      value={values.corpus}
      onChange={(e) => handleChange(SearchFieldType.Corpus, e.target.value)}
      data-reading-input={dataKey}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={fromEnter(() => {
        handleSubmit();
        next(index);
      })}
      disabled={isDisabled}
    />
  );

  const apartmentSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
      placeholder="Квартирa"
      value={values.apartment}
      onChange={(e) => handleChange(SearchFieldType.Apartment, e.target.value)}
      data-reading-input={dataKey}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={fromEnter(() => {
        handleSubmit();
        next(index);
      })}
      disabled={isDisabled}
    />
  );

  const questionSearch = (index: number, isDisabled?: boolean) => (
    <Input
      small
      placeholder="Л/С или ФИО"
      value={values.question}
      onChange={(e) => handleChange(SearchFieldType.Question, e.target.value)}
      data-reading-input={dataKey}
      onClick={() => {
        clearFields(index);
      }}
      onKeyDown={fromEnter(() => {
        handleSubmit();
        next(index);
      })}
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
