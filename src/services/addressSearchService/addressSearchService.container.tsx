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
  lastField,
  handleSubmit: onSubmit
}) => {
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
    onSubmit: onSubmit,
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
        lastField={lastField}
      />
    </>
  );
};
