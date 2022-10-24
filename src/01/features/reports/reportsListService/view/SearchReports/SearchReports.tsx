import React, { FC } from 'react';
import { SearchIcon } from 'ui-kit/icons';
import { InputSC } from '01/shared/ui/Fields';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { Wrapper } from './SearchReports.styled';
import { SearchReportsProps } from './SearchReports.types';

export const SearchReports: FC<SearchReportsProps> = ({}) => {
  return (
    <Wrapper>
      <ExtendedSearch disabled>
        <InputSC
          prefix={<SearchIcon />}
          placeholder="Введите название отчета"
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
