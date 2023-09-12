import { useUnit } from 'effector-react';
import { last } from 'lodash';
import React, { FC, useEffect, useMemo } from 'react';
import { currentUserService } from 'services/currentUserService';
import { addressSearchService } from './addressSearchService.models';
import { AddressSearchContainerProps } from './addressSearchService.types';
import { AddressSearch } from './view/AddressSearch';
import { SearchFieldType } from './view/AddressSearch/AddressSearch.types';
import { useForm } from 'effector-forms';

const { gates, outputs, forms } = addressSearchService;
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
  const { cities, hasCorpuses, streets } = useUnit({
    cities: outputs.$existingCities,
    streets: outputs.$existingStreets,
    hasCorpuses: currentUserService.outputs.$hasCorpuses,
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
    if (initialValues) {
      setForm({
        apartment: initialValues.apartment || '',
        corpus: initialValues.corpus || '',
        house: initialValues.house || '',
        question: initialValues.question || '',
        street: initialValues.street || '',
        city: initialValues.city || '',
      });
    }
  }, [initialValues, setForm]);

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

    set({ city: last(cities) || '' });

    if (onChange) onChange('city', last(cities) || '');

    submit();
  }, [cities, initialValues, set, onChange, submit]);

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
