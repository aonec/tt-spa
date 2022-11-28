import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import {
  LeftBlock,
  PageHeader,
  PageTitle,
  RightBlock,
  WorkingStatus,
  Wrapper,
} from './EmployeeProfile.styled';
import { EmployeeProfileProps } from './EmployeeProfile.types';

export const EmployeeProfile: FC<EmployeeProfileProps> = ({ userData }) => {
  return (
    <Wrapper>
      <GoBack />
      <PageHeader>
        <LeftBlock>
          <PageTitle> {userData?.firstName} </PageTitle>
          <WorkingStatus></WorkingStatus>
        </LeftBlock>
        <RightBlock>
          <ContextMenuButton />
        </RightBlock>
      </PageHeader>
    </Wrapper>
  );
};
