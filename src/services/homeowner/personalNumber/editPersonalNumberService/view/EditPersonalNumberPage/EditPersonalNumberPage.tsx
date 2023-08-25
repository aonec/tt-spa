import React, { FC } from 'react';
import { EditPersonalNumberPageProps } from './EditPersonalNumberPage.types';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberPageContainer } from '../../../components/PersonalNumberPageContainer/PersonalNumberPageContainer';

const formId = 'edit-personal-number-page';

export const EditPersonalNumberPage: FC<EditPersonalNumberPageProps> = ({
  handleEditHomeownerAccount,
  isLoading,
  apartment,
  handleForced,
  homeowner,
  setVisibleCloseHomeownerAccountModal,
}) => {
  return (
    <PersonalNumberPageContainer
      titleText="Редактирование лицевого счета"
      apartment={apartment}
      isLoading={isLoading}
      formId={formId}
    >
      <PersonalNumberForm
        type={PersonalNumberActions.Edit}
        formId={formId}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
        homeowner={homeowner}
        handleForced={handleForced}
        setVisibleCloseHomeownerAccountModal={
          setVisibleCloseHomeownerAccountModal
        }
      />
    </PersonalNumberPageContainer>
  );
};
