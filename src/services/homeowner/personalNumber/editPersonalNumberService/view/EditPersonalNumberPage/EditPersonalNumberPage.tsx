import React, { FC } from 'react';
import { EditPersonalNumberPageProps } from './EditPersonalNumberPage.types';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberPageContainer } from '../../../components/PersonalNumberPageContainer/PersonalNumberPageContainer';
import { useParams } from 'react-router-dom';

const formId = 'edit-personal-number-page';

export const EditPersonalNumberPage: FC<EditPersonalNumberPageProps> = ({
  handleEditHomeownerAccount,
  isLoading,
  apartment,
}) => {
  const { homeownerId } = useParams<{ homeownerId: string }>();

  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  return (
    <PersonalNumberPageContainer
      titleText="Редактирование лицевого счета"
      apartment={apartment}
      type={PersonalNumberActions.Edit}
      isLoading={isLoading}
      formId={formId}
    >
      <PersonalNumberForm
        type={PersonalNumberActions.Edit}
        formId={formId}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
        homeowner={homeowner}
      />
    </PersonalNumberPageContainer>
  );
};
