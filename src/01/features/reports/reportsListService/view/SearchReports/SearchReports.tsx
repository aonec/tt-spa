import React, { FC, useEffect, useState } from 'react';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { Wrapper } from './SearchReports.styled';
import { SearchReportsProps } from './SearchReports.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { SearchIcon } from 'ui-kit/icons';
import { Input } from 'ui-kit/Input';

export const SearchReports: FC<SearchReportsProps> = ({
  reportName,
  setReportName,
}) => {
  const [text, setText] = useState(reportName);

  useEffect(() => setText(reportName), [reportName]);

  return (
    <Wrapper>
      <ExtendedSearch disabled>
        <Input
          value={text}
          prefix={<SearchIcon />}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyDown={fromEnter((event) => {
            event.currentTarget.blur();
          })}
          onBlur={() => {
            setReportName(text);
          }}
          placeholder="Введите название отчета"
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
