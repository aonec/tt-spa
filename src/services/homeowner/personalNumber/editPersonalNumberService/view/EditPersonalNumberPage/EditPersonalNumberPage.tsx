import React, { FC } from 'react';
import { Wrapper } from './EditPersonalNumberPage.styled';
import { EditPersonalNumberPageProps } from './EditPersonalNumberPage.types';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';

const formId = 'edit-personal-number-page';

export const EditPersonalNumberPage: FC<EditPersonalNumberPageProps> = ({
  homeowner,
  handleEditHomeownerAccount,
  isLoading,
}) => {

  return (
    <Wrapper>
      <PersonalNumberPageContainer
        titleText="Добавление лицевого счета"
        type={PersonalNumberActions.Edit}
        isLoading={isLoading}
        formId={formId}
        homeowner={homeowner}
      >
        <PersonalNumberForm
          type={PersonalNumberActions.Add}
          formId={formId}
          handleEditHomeownerAccount={handleEditHomeownerAccount}
        />
      </PersonalNumberPageContainer>
    </Wrapper>
  );
};
