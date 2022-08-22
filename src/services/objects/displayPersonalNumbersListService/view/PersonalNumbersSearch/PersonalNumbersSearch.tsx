import { fromEnter } from '01/shared/ui/DatePickerNative';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { useFormik } from 'formik';
import { last } from 'lodash';
import React, { FC, useEffect } from 'react';
import {
  PersonalNumberInput,
  SearchFieldsWrapper,
  SelectCitySC,
} from './PersonalNumbersSearch.styled';
import { PersonalNumbersSearchProps } from './PersonalNumbersSearch.types';

export const PersonalNumbersSearch: FC<PersonalNumbersSearchProps> = ({
  handleSearch,
  cities,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      Question: '',
      City: cities?.[0] || '',
    },
    onSubmit: handleSearch,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!cities?.length) return;

    setFieldValue('City', last(cities));
  }, [cities]);

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
            value={values.City || undefined}
            placeholder="Выберите город"
            onChange={(value) => setFieldValue('City', value)}
          >
            {cities?.map((city) => (
              <SelectCitySC.Option key={city} value={city}>
                {city}
              </SelectCitySC.Option>
            )) || null}
          </SelectCitySC>

          <PersonalNumberInput
            placeholder="Лицевой счёт"
            value={values.Question}
            onChange={(e) => setFieldValue('Question', e.target.value)}
            onClick={() => setFieldValue('Question', '')}
            onKeyDown={fromEnter(handleSubmit)}
          />
        </SearchFieldsWrapper>
      </ExtendedSearch>
    </>
  );
};
