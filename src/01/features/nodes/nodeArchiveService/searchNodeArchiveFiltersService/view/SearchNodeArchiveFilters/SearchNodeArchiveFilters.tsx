import { ButtonTT } from '01/tt-components';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { FiltersForm } from './components/FiltersForm';
import {
  Bottom,
  FiltersWrap,
  Title,
  Wrap,
} from './SearchNodeArchiveFilters.styled';
import { SearchNodeArchiveFiltersProps } from './SearchNodeArchiveFilters.types';

export const SearchNodeArchiveFilters: FC<SearchNodeArchiveFiltersProps> = ({
  form,
}) => {
  const { submit, reset } = useForm(form);

  return (
    <Wrap>
      <FiltersWrap>
        <Title>Фильтры</Title>
        <FiltersForm form={form} />
      </FiltersWrap>
      <Bottom>
        <ButtonTT onClick={reset} color="white">
          Сбросить
        </ButtonTT>
        <ButtonTT onClick={submit} color="blue" style={{ marginLeft: '15px' }}>
          Применить фильтр
        </ButtonTT>
      </Bottom>
    </Wrap>
  );
};
