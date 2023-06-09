import React, { FC } from 'react';
import { Wrapper } from './AddPersonalNumberPage.styled';
import { AddPersonalNumberPageProps } from './AddPersonalNumberPage.types';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';

const formId = 'add-personal-number-page-form';

export const AddPersonalNumberPage: FC<AddPersonalNumberPageProps> = ({
  apartment,
  isLoading,
  handleAddPersonalNumber,
  handleForced,
}) => {
  const apartmentId = apartment?.id;

  return (
    <Wrapper>
      <PersonalNumberPageContainer
        titleText="Добавление лицевого счета"
        apartment={apartment}
        type={PersonalNumberActions.Add}
        isLoading={isLoading}
        formId={formId}
      >
        <PersonalNumberForm
          type={PersonalNumberActions.Add}
          formId={formId}
          handleAddPersonalNumber={handleAddPersonalNumber}
          apartmentId={apartmentId}
          handleForced={handleForced}
        />
      </PersonalNumberPageContainer>
    </Wrapper>
  );
};
