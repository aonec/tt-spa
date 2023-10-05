import { useUnit } from 'effector-react';
import { isEmpty, last } from 'lodash';
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
  isFocus = false,
}) => {
  const {
    cities,
    hasCorpuses,
    streets,
    handleSearchApartNumber,
    setWithApartment,
    existingApartmentNumbers,
    setInitialValues,
    verifiedInitialValues,
  } = useUnit({
    cities: outputs.$existingCities,
    streets: outputs.$existingStreets,
    hasCorpuses: currentUserService.outputs.$hasCorpuses,
    handleSearchApartNumber: inputs.handleSearchApartNumber,
    setWithApartment: inputs.setWithApartment,
    existingApartmentNumbers: outputs.$existingApartmentNumbers,
    setInitialValues: inputs.setInitialValues,
    verifiedInitialValues: outputs.$verifiedInitialValues,
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
    if (!verifiedInitialValues || isEmpty(verifiedInitialValues)) {
      setForm({
        apartment: '',
        corpus: '',
        house: '',
        question: '',
        street: '',
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
    const withApartment = preparedFields.some(
      (searchField) => searchField === SearchFieldType.Apartment,
    );
    setWithApartment(withApartment);
  }, [preparedFields, setWithApartment]);

  useEffect(() => {
    if (!cities?.length || verifiedInitialValues?.city) return;

    set({ city: last(cities) || '' });

    if (onChange) onChange('city', last(cities) || '');

    // submit();
  }, [cities, verifiedInitialValues, set, onChange, submit]);

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
        isFocus={isFocus}
        handleSearchApartNumber={handleSearchApartNumber}
        existingApartmentNumbers={existingApartmentNumbers}
      />
    </>
  );
};
