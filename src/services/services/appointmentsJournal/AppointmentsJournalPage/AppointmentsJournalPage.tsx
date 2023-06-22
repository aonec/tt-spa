import React, { FC } from 'react';
import {
  PageHeaderWrapper,
  SearchWrapper,
} from './AppointmentsJournalPage.styled';
import { Props } from './AppointmentsJournalPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { DatePicker } from 'ui-kit/DatePicker';

export const AppointmentsJournalPage: FC<Props> = () => {
  return (
    <div>
      <GoBack />
      <PageHeaderWrapper>
        <PageHeader title="Журнал распределенных записей" />
      </PageHeaderWrapper>
      <SearchWrapper>
        <DatePicker small format="DD.MM.YYYY" placeholder="От" />
        <DatePicker small format="DD.MM.YYYY" placeholder="До" />
      </SearchWrapper>
    </div>
  );
};
