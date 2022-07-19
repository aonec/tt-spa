import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { FC, useEffect } from 'react';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearchContainerProps } from './addressSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';

export const AddressSearchContainer: FC<AddressSearchContainerProps> = ({
  fields,
  handleSubmit: onSubmit,
  initialValues,
}) => {
  const { outputs } = addressSearchService;

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik<AddressSearchValues>({
    initialValues: initialValues || {
      city: '',
      street: '',
      house: '',
      corpus: '',
      apartment: '',
    },
    onSubmit,
  });

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  const cities = useStore(outputs.cities);
  const streets = useStore(outputs.streets);

  useEffect(() => {
    if (!cities?.length || values.city) return;

    setFieldValue('city', last(cities));
  }, [cities]);

  return (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={values.city} />
      <AddressSearch
        cities={cities || []}
        streets={streets}
        handleChange={setFieldValue}
        values={values}
        handleSubmit={handleSubmit}
        fields={fields}
      />
    </>
  );
};
