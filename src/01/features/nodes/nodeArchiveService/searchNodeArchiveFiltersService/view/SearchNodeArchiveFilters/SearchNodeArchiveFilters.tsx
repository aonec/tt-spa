import { ButtonTT } from '01/tt-components';
import React, { FC } from 'react';
import { FiltersForm } from './components/FiltersForm';
import {
  Bottom,
  FiltersWrap,
  Title,
  Wrap,
} from './SearchNodeArchiveFilters.styled';
import { SearchNodeArchiveFiltersProps } from './SearchNodeArchiveFilters.types';

export const SearchNodeArchiveFilters: FC<SearchNodeArchiveFiltersProps> = ({ form }) => {
  return (
    <Wrap>
      <FiltersWrap>
        <Title>Фильтры</Title>
        <FiltersForm form={form} />
      </FiltersWrap>
      <Bottom>
        <ButtonTT color="white" size="small">
          Сбросить
        </ButtonTT>
        <ButtonTT color="blue" style={{ marginLeft: '15px' }} size="sm">
          Применить фильтр
        </ButtonTT>
      </Bottom>
    </Wrap>
  );
};
