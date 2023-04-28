import React, { FC } from 'react';
import { Wrapper } from './AddPersonalNumberPage.styled';
import { AddPersonalNumberPageProps } from './AddPersonalNumberPage.types';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export const AddPersonalNumberPage: FC<AddPersonalNumberPageProps> = ({
  apartment,
  isLoading,
}) => {
  return (
    <Wrapper>
      <PersonalNumberPageContainer
        apartment={apartment}
        type={PersonalNumberActions.Add}
        titleText="Добавление лицевого счета"
        isLoading={isLoading}
      >
        <PersonalNumberForm type={PersonalNumberActions.Add} />
      </PersonalNumberPageContainer>
    </Wrapper>
  );
};
