import React, { FC } from 'react';
import { SwitchPersonalNumberPageProps } from './SwitchPersonalNumberPage.types';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';

const formId = 'switch-personal-number-page';

export const SwitchPersonalNumberPage: FC<SwitchPersonalNumberPageProps> = ({
  apartment,
  handleForced,
  handleSwitchHomeownerAccount,
  homeowner,
  isLoading,
}) => {
  return (
    <PersonalNumberPageContainer
      titleText="Замена лицевого счета"
      apartment={apartment}
      type={PersonalNumberActions.Edit}
      isLoading={isLoading}
      formId={formId}
    >
      <PersonalNumberForm
        type={PersonalNumberActions.Switch}
        formId={formId}
        handleSwitchHomeownerAccount={handleSwitchHomeownerAccount}
        homeowner={homeowner}
        handleForced={handleForced}
      />
    </PersonalNumberPageContainer>
  );
};
