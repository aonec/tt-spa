import { useUnit } from 'effector-react';
import { last } from 'lodash';
import React, { FC, useEffect, useMemo } from 'react';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearchContainerProps } from './addressSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import { SearchFieldType } from './view/AddressSearch/AddressSearch.types';
import { currentOrganizationService } from 'services/currentOrganizationService';
import { useFormik } from 'formik';

const { gates, outputs, inputs } = addressSearchService;
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
  autoBurn = false,
  isCityPreselected = true,
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
    defaultOrganizationCity,
  } = useUnit({
    cities: outputs.$existingCities,
    streets: outputs.$existingStreets,
    hasCorpuses: currentOrganizationService.outputs.$hasCorpuses,
    handleSearchApartNumber: inputs.handleSearchApartNumber,
    setWithApartment: inputs.setWithApartment,
    existingApartmentNumbers: outputs.$existingApartmentNumbers,
    setInitialValues: inputs.setInitialValues,
    verifiedInitialValues: outputs.$verifiedInitialValues,
    defaultOrganizationCity: currentOrganizationService.outputs.$defaultCity,
  });

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      apartment: verifiedInitialValues?.apartment || '',
      corpus: verifiedInitialValues?.corpus || '',
      house: verifiedInitialValues?.house || '',
      question: verifiedInitialValues?.question || '',
      street: verifiedInitialValues?.street || '',
      city: verifiedInitialValues?.city || '',
    },
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
    },
  });

  useEffect(() => {
    initialValues && setInitialValues(initialValues);
  }, [initialValues, setInitialValues]);

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

    const defaultCity = defaultOrganizationCity || last(cities) || '';

    if (isCityPreselected) {
      setFieldValue('city', defaultCity);

      if (onChange) onChange('city', defaultCity);
    }

    if (autoBurn) {
      handleSubmit();
    }
  }, [
    cities,
    verifiedInitialValues,
    setFieldValue,
    onChange,
    handleSubmit,
    autoBurn,
    isCityPreselected,
    defaultOrganizationCity,
  ]);

  const handleChange = (key: SearchFieldType, value: string) => {
    setFieldValue(`${key}`, value);

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
        handleSubmit={handleSubmit}
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
