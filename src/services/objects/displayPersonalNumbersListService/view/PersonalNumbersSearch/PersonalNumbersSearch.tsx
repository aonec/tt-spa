import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { FC, useEffect } from 'react';
import {
  OptionSC,
  PersonalNumberInput,
  SearchFieldsWrapper,
  SelectCitySC,
} from './PersonalNumbersSearch.styled';
import { PersonalNumbersSearchProps } from './PersonalNumbersSearch.types';

export const PersonalNumbersSearch: FC<PersonalNumbersSearchProps> = ({
  handleSearch,
  cities,
  defaultCity,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      Question: '',
      City: defaultCity || cities?.[0] || '',
    },
    onSubmit: handleSearch,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!cities?.length) return;

    setFieldValue('City', last(cities));
  }, [cities, setFieldValue]);

  return (
    <>
      <ExtendedSearch
        isOpen={false}
        handleApply={() => {}}
        handleClear={() => {}}
        handleClose={() => {}}
        handleOpen={() => {}}
        extendedSearchContent={<></>}
        disabled
      >
        <SearchFieldsWrapper>
          <SelectCitySC
            small
            value={values.City || undefined}
            placeholder="Выберите город"
            onChange={(value) => setFieldValue('City', value)}
          >
            {cities?.map((city) => (
              <OptionSC key={city} value={city}>
                {city}
              </OptionSC>
            )) || null}
          </SelectCitySC>

          <PersonalNumberInput
            small
            placeholder="Номер лицевого счёта или ФИО"
            value={values.Question}
            onChange={(e) => setFieldValue('Question', e.target.value)}
            onClick={() => setFieldValue('Question', '')}
            onKeyDown={fromEnter(() => handleSubmit())}
          />
        </SearchFieldsWrapper>
      </ExtendedSearch>
    </>
  );
};
