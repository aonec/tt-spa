import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { useEffect } from 'react';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearch } from './view/AddressSearch';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';

export const AddressSearchContainer = () => {
  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik<AddressSearchValues>({
    initialValues: {
      city: '',
      street: '',
      house: '',
      corpus: '',
      apartment: '',
    },
    onSubmit: () => {},
  });

  const cities = useStore(addressSearchService.outputs.cities);
  const streets = useStore(addressSearchService.outputs.streets);

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
      />
    </>
  );
};
