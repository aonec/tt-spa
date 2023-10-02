import { useUnit } from 'effector-react';
import { last } from 'lodash';
import React, { FC, useEffect, useMemo } from 'react';
import { currentUserService } from 'services/currentUserService';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearchContainerProps } from './addressSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import { SearchFieldType } from './view/AddressSearch/AddressSearch.types';
import { useForm } from 'effector-forms';

const { gates, outputs, forms, inputs } = addressSearchService;
const { ExistingCitiesGate, ExistingStreetsGate, AddressSearchGate } = gates;

export const AddressSearchContainer: FC<AddressSearchContainerProps> = ({
  fields,
  handleSubmit: onSubmit,
  initialValues,
  customTemplate,
  showLabels,
  disabledFields,
  onChange,
  className,
  isError = false,
}) => {
  const {
    cities,
    hasCorpuses,
    streets,
    setInitialValues,
    verifiedInitialValues,
    selectedCity,
  } = useUnit({
    cities: outputs.$existingCities,
    streets: outputs.$existingStreets,
    hasCorpuses: currentUserService.outputs.$hasCorpuses,
    setInitialValues: inputs.setInitialValues,
    verifiedInitialValues: outputs.$verifiedInitialValues,
    selectedCity: outputs.$selectedCity,
  });

  const {
    fields: fieldsOfForm,
    setForm,
    values,
    submit,
    set,
  } = useForm(forms.addressSearchForm);

  useEffect(
    () =>
      forms.addressSearchForm.formValidated.watch(
        (values) => onSubmit && onSubmit(values),
      ).unsubscribe,
    [onSubmit, values],
  );

  useEffect(() => {
    setInitialValues(initialValues || null);
  }, [initialValues, setInitialValues]);

  useEffect(() => {
    if (verifiedInitialValues) {
      setForm({
        apartment: verifiedInitialValues.apartment || '',
        corpus: verifiedInitialValues.corpus || '',
        house: verifiedInitialValues.house || '',
        question: verifiedInitialValues.question || '',
        street: verifiedInitialValues.street || '',
        city: verifiedInitialValues.city || '',
      });
    }
  }, [setForm, verifiedInitialValues]);

  const preparedFields = useMemo(
    () =>
      fields.filter((field) => {
        if (!hasCorpuses) {
          return field !== SearchFieldType.Corpus;
        }
        return true;
      }),
    [hasCorpuses, fields],
  );

  useEffect(() => {
    if (!cities?.length || selectedCity) return;

    set({ city: last(cities) || '' });

    if (onChange && !selectedCity) onChange('city', last(cities) || '');
    if (onChange && selectedCity) onChange('city', selectedCity);

    submit();
  }, [cities, selectedCity, set, onChange, submit, initialValues]);

  const handleChange = (key: SearchFieldType, value: string) => {
    fieldsOfForm[key]?.onChange(value);

    if (onChange) {
      return onChange(key, value);
    }
  };

  return (
    <>
      <ExistingCitiesGate />
      <AddressSearchGate />
      <ExistingStreetsGate City={values.city} />
      <AddressSearch
        cities={cities || []}
        streets={streets}
        values={values}
        handleSubmit={submit}
        fields={preparedFields}
        customTemplate={customTemplate}
        showLabels={showLabels}
        disabledFields={disabledFields}
        className={className}
        isError={isError}
        handleChange={handleChange}
      />
    </>
  );
};
