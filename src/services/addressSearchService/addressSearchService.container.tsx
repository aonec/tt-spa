import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { FC, useEffect, useMemo } from 'react';
import { currentUserService } from 'services/currentUserService';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearchContainerProps } from './addressSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import {
  AddressSearchValues,
  SearchFieldType,
} from './view/AddressSearch/AddressSearch.types';

export const AddressSearchContainer: FC<AddressSearchContainerProps> = ({
  fields,
  handleSubmit: onSubmit = () => {},
  initialValues,
  customTemplate,
  showLabels,
  disabledFields,
  onChange,
}) => {
  const { outputs } = addressSearchService;

  const { values, handleSubmit, setFieldValue } =
    useFormik<AddressSearchValues>({
      initialValues: initialValues || {
        city: '',
        street: '',
        house: '',
        corpus: '',
        apartment: '',
        question: '',
      },
      enableReinitialize: true,
      onSubmit,
    });

  const cities = useStore(outputs.cities);
  const streets = useStore(outputs.streets);
  const hasCorpuses = useStore(currentUserService.outputs.$hasCorpuses);

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
    if (!cities?.length || initialValues?.city) return;

    setFieldValue('city', last(cities));

    if (onChange) onChange('city', last(cities) || '');
  }, [cities, initialValues, setFieldValue, onChange]);

  const handleChange = (key: string, value: string) => {
    setFieldValue(key, value);
    if (onChange) {
      return onChange(key, value);
    }
  };

  return (
    <>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={values.city} />
      <AddressSearch
        cities={cities || []}
        streets={streets}
        handleChange={handleChange}
        values={values}
        handleSubmit={handleSubmit}
        fields={preparedFields}
        customTemplate={customTemplate}
        showLabels={showLabels}
        disabledFields={disabledFields}
      />
    </>
  );
};
