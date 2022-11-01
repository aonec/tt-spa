import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { FC, useEffect } from 'react';
import { addressFormSearchService } from './addressFormSearchService.model';
import { AddressSearchContainerProps } from './addressFormSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';

const { outputs } = addressFormSearchService;

export const AddressFormSearchContainer: FC<AddressSearchContainerProps> = ({
  fields,
  handleSubmit: onSubmit,
  initialValues,
  customTemplate,
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik<AddressSearchValues>({
    initialValues: initialValues || {
      city: '',
      street: '',
      house: '',
      corpus: '',
      apartment: '',
    },
    enableReinitialize: true,
    onSubmit,
  });

  const cities = useStore(outputs.cities);
  const streets = useStore(outputs.streets);

  useEffect(() => {
    if (!cities?.length || initialValues?.city) return;

    setFieldValue('city', last(cities));
  }, [cities, initialValues]);

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
        customTemplate={customTemplate}
      />
    </>
  );
};
