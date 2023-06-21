import React, { FC } from 'react';
import { PageHeaderWrapper, Wrapper } from './AppointmentsJournalPage.styled';
import { Props } from './AppointmentsJournalPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';

export const AppointmentsJournalPage: FC<Props> = () => {
  return (
    <Wrapper>
      <GoBack />
      <PageHeaderWrapper>
        <PageHeader title="Журнал распределенных записей" />
      </PageHeaderWrapper>
    </Wrapper>
  );
};
