import React, { FC } from 'react';
import { Wrapper } from './ChangeODPUPage.styled';
import { ChangeODPUPageProps } from './ChangeODPUPage.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { GoBack } from 'ui-kit/shared_components/GoBack';

export const ChangeODPUPage: FC<ChangeODPUPageProps> = ({}) => {
  return (
    <Wrapper>
      <GoBack />
      <PageHeader title="Замена ОДПУ" />
    </Wrapper>
  );
};
